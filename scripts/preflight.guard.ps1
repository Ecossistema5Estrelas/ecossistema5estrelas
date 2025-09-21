[CmdletBinding(SupportsShouldProcess=$true, ConfirmImpact="Medium")]
param(
  [ValidateSet("check","build","deploy","full")]
  [string]$Mode = "full",
  [switch]$FixVercelProject,
  [string]$Org = "cezar-braga-da-silvas-projects",
  [string]$SiteURL = "https://ecossistema5estrelas.org",
  [string]$VercelCli = "vercel@47.0.5"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true

function Step($t){ Write-Host ">> $t" -ForegroundColor Cyan }
function Warn($t){ Write-Host "!! $t" -ForegroundColor Yellow }
function Ok($t){ Write-Host "✅ $t" -ForegroundColor Green }
function Fail($t){ Write-Host "✖ $t" -ForegroundColor Red }

function Require-Path([string]$p){ if(-not (Test-Path $p)){ throw "Arquivo/pasta não encontrado: $p" } }

function Normalize-VercelJson {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  if(Test-Path vercel.json){
    Step "Normalizando vercel.json (framework nextjs, sem buildCommand/outputDirectory)"
    $raw = Get-Content vercel.json -Raw
    $obj = $raw | ConvertFrom-Json
    $obj.PSObject.Properties.Remove("buildCommand") | Out-Null
    $obj.PSObject.Properties.Remove("outputDirectory") | Out-Null
    $obj.framework = "nextjs"
    if($PSCmdlet.ShouldProcess("vercel.json","Escrever")){
      ($obj | ConvertTo-Json -Depth 10) | Set-Content -Path vercel.json -Encoding utf8
      Ok "vercel.json ajustado"
    }
  }
}

function Ensure-Cmd {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  Step "Sanidade do cmd.exe/Path (sessão atual)"
  $cmd = Join-Path $env:WINDIR 'System32\cmd.exe'
  if(-not (Test-Path $cmd)){ throw "cmd.exe não encontrado em $cmd" }
  $sys32 = Join-Path $env:WINDIR 'System32'
  if($PSCmdlet.ShouldProcess("Sessão atual","Set ComSpec/Path")){
    $env:ComSpec = $cmd
    if($env:Path -notmatch [regex]::Escape($sys32)){ $env:Path = "$sys32;$env:Path" }
  }
  Ok "ComSpec = $env:ComSpec"
}

function Check-NodeNpm { [CmdletBinding()] param()
  Step "Checando Node/NPM"
  $nodeV = (& node -v) 2>$null; $npmV = (& npm -v) 2>$null
  if(-not $nodeV){ throw "Node não encontrado no PATH" }
  if(-not $npmV){ throw "npm não encontrado no PATH" }
  Write-Host "Node: $nodeV | npm: $npmV"
}

function Check-NextProject { [CmdletBinding()] param()
  Step "Validando projeto Next (App Router)"
  Require-Path "package.json"; Require-Path "app"
}

function Ensure-PerfilStatic {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  Step "Garantindo /dashboard/perfil estático (evita lambda)"
  $target = "app/dashboard/perfil/page.tsx"
  if(-not (Test-Path $target)){
@"
export const dynamic = 'force-static';
export const revalidate = false;
export const runtime = 'edge';

export default function Perfil() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>
      <p>Rota estática provisória para destravar o empacotamento do Vercel.</p>
    </main>
  );
}
"@ | ForEach-Object {
      if($PSCmdlet.ShouldProcess($target,"Criar")){ $_ | Set-Content -Path $target -Encoding utf8 }
    }
    Ok "Criado: $target"
  } else {
    $txt = Get-Content -Raw $target
    $changed = $false
    if($txt -notmatch "force-static"){ $txt = "export const dynamic = 'force-static';`r`n$txt"; $changed=$true }
    if($txt -notmatch "revalidate = false"){ $txt = "export const revalidate = false;`r`n$txt"; $changed=$true }
    if($txt -notmatch "runtime = 'edge'"){ $txt = "export const runtime = 'edge';`r`n$txt"; $changed=$true }
    if($changed -and $PSCmdlet.ShouldProcess($target,"Atualizar")){ $txt | Set-Content -Path $target -Encoding utf8; Ok "Diretivas aplicadas" }
    else { Ok "Rota já estática" }
  }
}

function Scan-Residuos { [CmdletBinding()] param()
  Step "Scanner de resquícios (pwsh7)"
  $ext = @('*.tsx','*.ts','*.css','*.scss','*.md','*.json')
  $files = Get-ChildItem -Recurse -File -Include $ext | Where-Object {
    $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)(\\|$)'
  }
  Write-Host '--- BUSCA: "disco voador" ---'
  $files | Select-String -Pattern 'disco\s*voador' -SimpleMatch | Select-Object Path,LineNumber,Line
  Write-Host '--- BUSCA: dourados/gold ---'
  $files | Select-String -Pattern '#d4af37|#daa520|#ffd700|#c9b037|#b8860b|goldenrod(?!-)|\bgold\b' | Select-Object Path,LineNumber,Line
}

function Pull-Vercel { [CmdletBinding()] param()
  Step "Vercel pull (production)"
  npm exec -y $VercelCli -- pull --yes --environment=production | Out-Host
  Require-Path ".vercel\project.json"
}

function Fix-VercelProjectRemote {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  if(-not $FixVercelProject){ return }
  Step "PATCH Project Settings remotas (framework=nextjs; limpar outputDirectory/buildCommand)"
  $pj = Get-Content ".vercel\project.json" -Raw | ConvertFrom-Json
  $projId = $pj.projectId; $teamId = $pj.orgId
  if(-not $env:VERCEL_TOKEN){ throw "Defina $env:VERCEL_TOKEN para PATCH remoto." }
  $qsTeam = $(if($teamId){"?teamId=$teamId"}else{""})
  $hdrs = @{ Authorization = "Bearer $env:VERCEL_TOKEN"; "Content-Type"="application/json" }
  $body = @{ framework="nextjs"; outputDirectory=$null; buildCommand=$null } | ConvertTo-Json
  if($PSCmdlet.ShouldProcess("Vercel API","PATCH settings")){
    Invoke-RestMethod -Method PATCH -Uri ("https://api.vercel.com/v9/projects/{0}{1}" -f $projId,$qsTeam) -Headers $hdrs -Body $body | Out-Null
    Ok "Project Settings atualizadas no Vercel"
  }
}

function Build-Next {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  Step "Build Next.js"
  if($PSCmdlet.ShouldProcess("workspace","Limpeza .next/.vercel/output/cache")) {
    Remove-Item -Recurse -Force ".next",".vercel\output","node_modules\.cache" -ErrorAction SilentlyContinue
  }
  $env:NEXT_PUBLIC_SITE_URL = $SiteURL
  npm run build | Out-Host
}

function Build-Vercel { [CmdletBinding()] param()
  Step "Build Vercel (.vercel/output)"
  npm exec -y $VercelCli -- build | Out-Host
  if(-not (Test-Path ".vercel\output")){ throw "Build Vercel não gerou .vercel\output (se viu 'dist', Project Settings ainda estão erradas)." }
}

function Deploy-Prebuilt { [CmdletBinding()] param()
  Step "Deploy prebuilt"
  $out = npm exec -y $VercelCli -- deploy --prebuilt --yes --scope $Org 2>&1
  $out | Write-Host
  $url = ($out | Select-String -Pattern 'https://[a-z0-9\-]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -First 1
  if($url){ Ok "Deploy URL: $url" } else { Warn "Deploy feito mas não capturei a URL" }
}

function Verify-Prod { [CmdletBinding()] param()
  Step "Smoke test de produção + cabeçalhos (CF/Vercel)"
  $urls = @("$SiteURL/","$SiteURL/robots.txt","$SiteURL/sitemap.xml","$SiteURL/rss")
  foreach($u in $urls){
    try{
      $r = Invoke-WebRequest -Uri "$u?cb=$(Get-Random)" -Method Head -TimeoutSec 15
      "{0,-45} -> {1}  CF={2}  XVercel={3}" -f $u, $r.StatusCode, $r.Headers['CF-Cache-Status'], $r.Headers['X-Vercel-Id']
    } catch { "{0,-45} -> ERRO {1}" -f $u, $_.Exception.Message }
  }
}

function Purge-Cloudflare {
  [CmdletBinding(SupportsShouldProcess=$true)] param()
  if(-not $env:CLOUDFLARE_API_TOKEN -or -not $env:CLOUDFLARE_ZONE_ID){ return }
  Step "Purgando cache Cloudflare (opcional)"
  $hdrs = @{ "Authorization"="Bearer $env:CLOUDFLARE_API_TOKEN"; "Content-Type"="application/json" }
  $body = @{ purge_everything = $true } | ConvertTo-Json
  if($PSCmdlet.ShouldProcess("Cloudflare","Purge Everything")){
    Invoke-RestMethod -Method POST -Uri ("https://api.cloudflare.com/client/v4/zones/{0}/purge_cache" -f $env:CLOUDFLARE_ZONE_ID) -Headers $hdrs -Body $body | Out-Null
    Ok "Cloudflare purge solicitado"
  }
}

# Runner
Ensure-Cmd
Check-NodeNpm
Check-NextProject
Normalize-VercelJson
Ensure-PerfilStatic
Scan-Residuos
Pull-Vercel
Fix-VercelProjectRemote

switch ($Mode) {
  "check"  { }
  "build"  { Build-Next; Build-Vercel }
  "deploy" { Deploy-Prebuilt; Verify-Prod }
  "full"   { Build-Next; Build-Vercel; Deploy-Prebuilt; Verify-Prod; Purge-Cloudflare }
}

Ok "Preflight ($Mode) concluído."
