param(
  [string]$OutDir = "C:\Users\Cezar Braga\OneDrive\ecossistema5estrelas\BACKUPS"
)
$ErrorActionPreference = "Stop"
if (!(Test-Path $OutDir)) { New-Item -ItemType Directory -Force -Path $OutDir | Out-Null }
$stamp = (Get-Date).ToString("yyyy-MM-dd_HH-mm-ss")
$zip = Join-Path $OutDir ("ecossistema5estrelas_" + $stamp + ".zip")
$exclude = @("node_modules", ".next", ".git")
$items = Get-ChildItem -Force | Where-Object { $_.Name -notin $exclude }
Compress-Archive -Path $items.FullName -DestinationPath $zip -Force
Write-Host "OK: snapshot salvo em $zip"
