param(
  [Parameter(Mandatory=$true)]
  [string]$DatasetDir,  # pasta com os .zip e dataset-metadata.json

  [Parameter(Mandatory=$true)]
  [string]$DatasetId,   # ex.: cezarbragadasilva/ecossistema5estrelas-concurso-final-v2

  [string]$KaggleExe = "$env:USERPROFILE\AppData\Roaming\Python\Python312\Scripts\kaggle.exe",
  [string]$VersionMessage = "Auto batch: publish shards + manifests",
  [string]$TestFile = "",      # ex.: findings_stress_test_1M_p01/findings_stress_test_1M_p01.json (opcional)
  [int]$ReadyTimeoutSec = 900, # 15 min
  [int]$ReadyPollSec = 10      # polling
)

$ErrorActionPreference = "Stop"

function Assert-File([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { throw "Arquivo/pasta não encontrado: $Path" }
}

function Get-SHA256Hex([string]$Path) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  $fs = [System.IO.File]::OpenRead($Path)
  try {
    $hash = $sha.ComputeHash($fs)
    -join ($hash | ForEach-Object { $_.ToString("x2") })
  } finally { $fs.Dispose(); $sha.Dispose() }
}

function Count-Prompts-InZip([string]$ZipPath) {
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $total = 0; $jsonFiles = 0
  $zip = [System.IO.Compression.ZipFile]::OpenRead($ZipPath)
  try {
    foreach ($entry in $zip.Entries) {
      if ($entry.FullName -match '\.jsonl$') {
        $jsonFiles++
        $sr = New-Object System.IO.StreamReader($entry.Open(), [System.Text.Encoding]::UTF8)
        try { while (($line = $sr.ReadLine()) -ne $null) { if ($line.Trim().Length -gt 0) { $total++ } } }
        finally { $sr.Dispose() }
      } elseif ($entry.FullName -match '\.json$') {
        $jsonFiles++
        $sr = New-Object System.IO.StreamReader($entry.Open(), [System.Text.Encoding]::UTF8)
        try {
          $buf = New-Object char[] 8192; $window = ""; $read = 0
          while (($read = $sr.Read($buf, 0, $buf.Length)) -gt 0) {
            $chunk = -join $buf[0..($read-1)]
            $window += $chunk
            $matches = [System.Text.RegularExpressions.Regex]::Matches($window, '\"prompt\"', 'IgnoreCase')
            if ($matches.Count -gt 0) { $total += $matches.Count }
            if ($window.Length -gt 20) { $window = $window.Substring($window.Length - 20) }
          }
        } finally { $sr.Dispose() }
      }
    }
  } finally { $zip.Dispose() }
  return @{ Prompts=$total; JsonFiles=$jsonFiles }
}

function Write-ManifestFiles([string]$OutDir, [array]$Rows) {
  $summaryPath = Join-Path $OutDir "summary.csv"
  $Rows | Export-Csv -Path $summaryPath -NoTypeInformation -Encoding UTF8

  $ndjsonPath = Join-Path $OutDir "manifest.ndjson"
  if (Test-Path $ndjsonPath) { Remove-Item $ndjsonPath -Force }
  foreach ($r in $Rows) {
    ($r | ConvertTo-Json -Depth 5 -Compress) | Out-File -FilePath $ndjsonPath -Append -Encoding UTF8
  }

  $shaPath = Join-Path $OutDir "manifest_sha256.txt"
  if (Test-Path $shaPath) { Remove-Item $shaPath -Force }
  foreach ($r in $Rows) { "$($r.file),$($r.sha256)" | Out-File -FilePath $shaPath -Append -Encoding ASCII }
  foreach ($extra in @("summary.csv","manifest.ndjson")) {
    $p = Join-Path $OutDir $extra
    $sha = Get-SHA256Hex $p
    "$extra,$sha" | Out-File -FilePath $shaPath -Append -Encoding ASCII
  }
  return @{ Summary = $summaryPath; Ndjson = $ndjsonPath; ShaList = $shaPath }
}

function Require-KaggleCLI {
  if (-not (Test-Path $KaggleExe)) {
    try { $found = (where.exe kaggle)[0] } catch { $found = $null }
    if ($found) { $script:KaggleExe = $found } else { throw "kaggle.exe não encontrado. Ajuste -KaggleExe." }
  }
  $ver = & $KaggleExe --version 2>$null
  if ($LASTEXITCODE -ne 0) { throw "Falha ao executar kaggle.exe. Verifique instalação/permissões." }
  Write-Host "Kaggle CLI: $ver"
}

function Kaggle-Version([string]$Dir, [string]$Msg) {
  & $KaggleExe datasets version -p $Dir --dir-mode zip -m $Msg
  if ($LASTEXITCODE -ne 0) { throw "Falha no 'kaggle datasets version'." }
}

function Kaggle-WaitReady([string]$DatasetId, [int]$TimeoutSec, [int]$PollSec) {
  $stopAt = (Get-Date).AddSeconds($TimeoutSec)
  do {
    Start-Sleep -Seconds $PollSec
    $status = & $KaggleExe datasets status -d $DatasetId 2>$null
    if ($LASTEXITCODE -eq 0 -and $status -match 'ready') { Write-Host "Status: READY"; return $true }
    elseif ($status) { Write-Host "Status atual: $status" } else { Write-Host "Status indisponível, tentando..." }
  } while ((Get-Date) -lt $stopAt)
  return $false
}

function Kaggle-Files([string]$DatasetId) {
  & $KaggleExe datasets files -d $DatasetId --page-size 2000 2>$null
}

function Pick-RepresentativeFile([string]$DatasetId, [string]$Preferred) {
  if ($Preferred) { return $Preferred }
  $files = Kaggle-Files $DatasetId
  if (-not $files) { return "" }
  $lines = $files -split "`r?`n"
  $cand = $lines | Where-Object { $_ -match 'findings_stress_test_1M_p01/.+\.json' } | Select-Object -First 1
  if ($cand) { return ($cand -split '\s{2,}')[0].Trim() }
  $cand = $lines | Where-Object { $_ -match '\.json($|[^l])' } | Select-Object -First 1
  if ($cand) { return ($cand -split '\s{2,}')[0].Trim() }
  $cand = $lines | Where-Object { $_ -match 'manifest\.ndjson' } | Select-Object -First 1
  if ($cand) { return 'manifest.ndjson' }
  return ""
}

function Get-KaggleFileHttp {
  param(
    [Parameter(Mandatory)] [string] $DatasetId,
    [Parameter(Mandatory)] [string] $FilePath,
    [Parameter(Mandatory)] [string] $OutDir
  )
  $cfgPath = if ($env:KAGGLE_CONFIG_DIR) { Join-Path $env:KAGGLE_CONFIG_DIR "kaggle.json" } else { "$env:USERPROFILE\.kaggle\kaggle.json" }
  Assert-File $cfgPath
  $cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
  $pair  = "$($cfg.username):$($cfg.key)"
  $basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
  $hdr   = @{ Authorization = "Basic $basic" }

  $owner,$slug = $DatasetId.Split('/',2)
  Add-Type -AssemblyName System.Web
  $enc = [System.Web.HttpUtility]::UrlEncode($FilePath)
  $url = "https://www.kaggle.com/api/v1/datasets/download/$owner/$slug?fileName=$enc&raw=false"

  $outName = [IO.Path]::GetFileName($FilePath)
  $outFile = Join-Path $OutDir $outName
  Invoke-WebRequest -UseBasicParsing -Headers $hdr -Uri $url -OutFile $outFile
  return $outFile
}

# ============================
# Execução
# ============================
Write-Host "== publish_1M.ps1 =="
Assert-File $DatasetDir
Assert-File (Join-Path $DatasetDir "dataset-metadata.json")
Require-KaggleCLI

# 1) Inventário dos .zip
$zips = Get-ChildItem -LiteralPath $DatasetDir -Filter *.zip -File
if (-not $zips -or $zips.Count -eq 0) { Write-Warning "Nenhum .zip encontrado em $DatasetDir" }

$rows = @()
Write-Host "Contando prompts em cada .zip..."
foreach ($z in $zips) {
  $counts = Count-Prompts-InZip $z.FullName
  $sha = Get-SHA256Hex $z.FullName
  $rows += [PSCustomObject]@{
    file        = $z.Name
    size_bytes  = $z.Length
    prompts     = $counts.Prompts
    json_files  = $counts.JsonFiles
    sha256      = $sha
    mtime_utc   = $z.LastWriteTimeUtc.ToString("s") + "Z"
  }
}

# 2) Geração de manifests
$manifests = Write-ManifestFiles -OutDir $DatasetDir -Rows $rows
Write-Host "summary.csv         => $($manifests.Summary)"
Write-Host "manifest.ndjson     => $($manifests.Ndjson)"
Write-Host "manifest_sha256.txt => $($manifests.ShaList)"

# 3) Marcador de versão
$ts = Get-Date -Format "yyyyMMdd_HHmmss"
$markerName = "_version_marker_$ts.txt"
$markerPath = Join-Path $DatasetDir $markerName
"dataset=$DatasetId`ntimestamp=$ts" | Out-File -FilePath $markerPath -Encoding UTF8
Write-Host "Marcador: $markerName"

# 4) Publicar
Write-Host "Publicando nova versão no Kaggle..."
Kaggle-Version -Dir $DatasetDir -Msg $VersionMessage

# 5) Aguardar READY
Write-Host "Aguardando READY (timeout ${ReadyTimeoutSec}s)..."
$ok = Kaggle-WaitReady -DatasetId $DatasetId -TimeoutSec $ReadyTimeoutSec -PollSec $ReadyPollSec
if (-not $ok) { throw "Timeout aguardando READY. Verifique no Kaggle." }

# 6) Validação por download (CLI -> fallback HTTP)
$tmp = Join-Path $env:TEMP ("kaggle_dl_" + [Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmp | Out-Null
$want = Pick-RepresentativeFile -DatasetId $DatasetId -Preferred $TestFile
if (-not $want) { $want = "manifest.ndjson" }
Write-Host "Validando download: $want"

& $KaggleExe datasets download -d $DatasetId -f $want -p $tmp -w
$dlOk = ($LASTEXITCODE -eq 0)
if (-not $dlOk -and $want -match "/") {
  Write-Warning "CLI retornou erro (possível 404 em subpasta). Tentando fallback HTTP..."
  try {
    $out = Get-KaggleFileHttp -DatasetId $DatasetId -FilePath $want -OutDir $tmp
    if (Test-Path $out) { Write-Host "✅ Fallback HTTP OK: $([IO.Path]::GetFileName($out))"; $dlOk = $true }
  } catch { Write-Warning "Fallback HTTP falhou: $($_.Exception.Message)" }
}
if ($dlOk) { Write-Host "✅ Validação por download concluída." }
else { Write-Warning "Não foi possível validar via download ($want). Status está READY; tente novamente em instantes." }

# 7) Resumo
$sumPrompts = ($rows | Where-Object { $_.prompts -ne $null } | Measure-Object -Property prompts -Sum).Sum
Write-Host ""
Write-Host "==== RESUMO ===="
Write-Host ("Zips: {0}" -f ($zips?.Count | ForEach-Object {$_} ))
Write-Host ("Prompts (somatório): {0}" -f $sumPrompts)
Write-Host ("summary.csv: {0}" -f $manifests.Summary)
Write-Host ("manifest.ndjson: {0}" -f $manifests.Ndjson)
Write-Host ("manifest_sha256.txt: {0}" -f $manifests.ShaList)
Write-Host ("Version marker: {0}" -f $markerName)
Write-Host "Status final: READY (verificado via CLI)."