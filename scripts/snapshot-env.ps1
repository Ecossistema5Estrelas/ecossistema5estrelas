Write-Host "=== ENV SNAPSHOT ==="
node -v
pnpm -v
Write-Host "NODE_ENV=$env:NODE_ENV"
Get-Date
