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

$rel = Join-Path "lib" ($slug + ".mjs")
$abs = Join-Path $ROOT $rel
$dir = Split-Path $abs -Parent

New-Item -ItemType Directory -Force $dir | Out-Null
if (-not (Test-Path $dir)) { throw "Diretório não criado: $dir" }

$codeJs = "export function " + ($slug.Replace('-','_')) + "() {`n  return { ok: true, name: '" + $slug + "' };`n}`n"

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($abs, $codeJs, $enc)

if (-not (Test-Path $abs)) { throw "Arquivo não criado: $abs" }

Write-Host "LIB READY -> $rel" -ForegroundColor Green