Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][string]$Name
)

$ROOT = (Get-Location).Path

$slug = ($Name.ToLower() -replace "[^a-z0-9\-_]+","-").Trim("-")
if ([string]::IsNullOrWhiteSpace($slug)) { throw "Nome inválido: $Name" }

$ts = (Get-Date).ToString("yyyyMMdd-HHmmss")
$rel = Join-Path "reports" ("$ts-$slug.txt")
$abs = Join-Path $ROOT $rel

$body = @"
REPORT CONTRACT
name: $Name
slug: $slug
created_at: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
root: $ROOT
"@

& (Join-Path $ROOT "scripts/ops/write-safe.ps1") -Path $rel -Content $body

Write-Host ("REPORT READY -> " + $rel) -ForegroundColor Cyan