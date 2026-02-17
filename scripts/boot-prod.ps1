$env:NODE_ENV = "production"
.\scripts\kill-ports.ps1
.\scripts\reset-dev.ps1
pnpm build
pnpm start
