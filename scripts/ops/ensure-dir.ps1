Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][string]$Path
)

# Aceita path absoluto ou relativo; sempre resolve para absoluto
$ROOT = (Get-Location).Path
$abs = if ([System.IO.Path]::IsPathRooted($Path)) { $Path } else { Join-Path $ROOT $Path }

New-Item -ItemType Directory -Force $abs | Out-Null

if (-not (Test-Path $abs)) {
  throw "FALHA: diretório não existe -> $abs"
}

Write-Host ("OK DIR -> " + $abs) -ForegroundColor Green