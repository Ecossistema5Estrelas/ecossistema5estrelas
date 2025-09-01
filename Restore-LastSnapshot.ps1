param(
  [string]$FromDir = "C:\Users\Cezar Braga\OneDrive\ecossistema5estrelas\BACKUPS"
)
$ErrorActionPreference = "Stop"
if (!(Test-Path $FromDir)) { throw "Diretório de backups não existe: $FromDir" }
$last = Get-ChildItem $FromDir -Filter "ecossistema5estrelas_*.zip" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $last) { throw "Nenhum snapshot encontrado em $FromDir" }
Write-Host "Restaurando de:" $last.FullName
# Limpa tudo menos .git e scripts de segurança
Get-ChildItem -Force | Where-Object { $_.Name -notin @(".git", ".gitignore", "Save-Snapshot.ps1", "Restore-LastSnapshot.ps1", "Build-With-Guard.ps1") } |
  Remove-Item -Recurse -Force
Expand-Archive -Path $last.FullName -DestinationPath . -Force
Write-Host "OK: Restaurado do snapshot."
