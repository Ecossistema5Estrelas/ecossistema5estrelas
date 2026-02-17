param(
  [Parameter(Mandatory=$true)]
  [string]$Name
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ROOT = (Get-Location).Path

$slug = ($Name.ToLower() -replace "[^a-z0-9\-_]+","-").Trim("-")
if ([string]::IsNullOrWhiteSpace($slug)) {
  throw "Nome inválido: $Name"
}

$ts  = (Get-Date).ToString("yyyyMMdd-HHmmss")
$rel = Join-Path "reports" ("$ts-$slug.txt")
$abs = Join-Path $ROOT $rel
$dir = Split-Path $abs -Parent

New-Item -ItemType Directory -Force $dir | Out-Null
if (-not (Test-Path $dir)) { throw "Diretório não criado: $dir" }

$body = "REPORT CONTRACT`nname: $Name`nslug: $slug`ncreated_at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`nroot: $ROOT`n"

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($abs, $body, $enc)

if (-not (Test-Path $abs)) { throw "Arquivo não criado: $abs" }

Write-Host "REPORT READY -> $rel" -ForegroundColor Green