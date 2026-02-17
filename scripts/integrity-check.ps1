Write-Host "=== INTEGRITY CHECK ==="

Get-FileHash next.config.ts -Algorithm SHA256
Get-FileHash instrumentation.ts -Algorithm SHA256

.\scripts\check-locks.ps1
.\scripts\health-check.ps1
.\scripts\validate-pipeline.ps1
