param()
Set-Location "C:\Users\Cezar Braga\Desktop\ecossistema5estrelasBackup"
$env:NODE_OPTIONS="--max_old_space_size=4096"
Write-Host "==> Build (next build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "`n❌ Build falhou." -ForegroundColor Red
  Write-Host "Dica: rode 'Get-Content build.err -Tail 80' se tiver log separado."
  Read-Host "`n[Enter] para fechar"
  exit 1
}
Write-Host "`n✅ Build OK." -ForegroundColor Green
Read-Host "`n[Enter] para fechar"