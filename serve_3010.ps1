param()
Set-Location "C:\Users\Cezar Braga\Desktop\ecossistema5estrelasBackup"
if (!(Test-Path ".\out\index.html")) {
  Write-Host "⚠ Não existe out\index.html. Faça o build estático primeiro." -ForegroundColor Yellow
  Read-Host "[Enter] para fechar"
  exit 1
}
Write-Host "Servindo http://127.0.0.1:3010 (Ctrl+C para parar)..." -ForegroundColor Green
npx serve -s out -l 3010 --no-clipboard