Write-Host "🔒 Guardião 5⭐ — Verificando integridade..."

if (Test-Path "package-lock.json") {
  Write-Error "❌ package-lock.json detectado. Proibido."
  exit 1
}

pnpm store status

Write-Host "✅ Governança OK"