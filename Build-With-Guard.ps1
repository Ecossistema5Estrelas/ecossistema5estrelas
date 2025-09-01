$ErrorActionPreference = "SilentlyContinue"
# 1) Salva snapshot ANTES de mexer
.\Save-Snapshot.ps1
# 2) Tenta build
$env:CI = "true"
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Warning "Build falhou! Voltando ao último snapshot..."
  .\Restore-LastSnapshot.ps1
  exit 1
}
Write-Host "Build OK ✅"
exit 0
