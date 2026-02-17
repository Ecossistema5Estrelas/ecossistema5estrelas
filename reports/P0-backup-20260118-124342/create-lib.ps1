Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][string]$Name
)

$ROOT = (Get-Location).Path

# Sanitização determinística do nome (somente a-z0-9-_)
$slug = ($Name.ToLower() -replace "[^a-z0-9\-_]+","-").Trim("-")
if ([string]::IsNullOrWhiteSpace($slug)) { throw "Nome inválido: $Name" }

$rel = Join-Path "lib" ($slug + ".mjs")
$abs = Join-Path $ROOT $rel

$code = @"
export function ${slug.Replace('-','_')}() {
  return {
    ok: true,
    name: "$slug"
  };
}
"@

& (Join-Path $ROOT "scripts/ops/write-safe.ps1") -Path $rel -Content $code

Write-Host ("LIB READY -> " + $rel) -ForegroundColor Cyan