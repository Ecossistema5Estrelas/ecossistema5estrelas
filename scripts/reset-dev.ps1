Write-Host "Resetting dev environment..."

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process pnpm -ErrorAction SilentlyContinue | Stop-Process -Force

Remove-Item -Recurse -Force .next, .turbo, .vercel -ErrorAction SilentlyContinue

pnpm store prune

Write-Host "Reset complete."
