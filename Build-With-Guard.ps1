$ErrorActionPreference = "Stop"

# Snapshot antes
if (Test-Path .\Save-Snapshot.ps1) { .\Save-Snapshot.ps1 }

# Limpa caches para não reaproveitar tipos antigos
foreach ($d in ".next", ".turbo", "cache") { if (Test-Path $d) { Remove-Item $d -Recurse -Force } }

# Garantir deps e binário local
$nextBin = Join-Path (Get-Location) "node_modules\.bin\next.exe"
if (!(Test-Path "node_modules") -or !(Test-Path $nextBin)) {
  Write-Host "Instalando dependências..." -ForegroundColor Yellow
  if (Test-Path package-lock.json) { npm ci --no-audit --no-fund } else { npm install --no-audit --no-fund }
}

# PATH local
$env:PATH = (Join-Path (Get-Location) "node_modules\.bin") + ";" + $env:PATH
$env:CI = "true"

# Build e validação do exit code
npx --yes next build
if ($LASTEXITCODE -ne 0) {
  Write-Warning "Build falhou! Voltando ao último snapshot..."
  if (Test-Path .\Restore-LastSnapshot.ps1) { .\Restore-LastSnapshot.ps1 }
  exit 1
}

Write-Host "Build OK ✅"
exit 0
