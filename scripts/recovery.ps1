Write-Host "=== FULL RECOVERY MODE ==="
.\scripts\kill-ports.ps1
.\scripts\reset-dev.ps1
pnpm install --force
pnpm dev
