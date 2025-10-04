param(
    [string]$room,
    [string]$sender,
    [string]$content,
    [switch]$history,
    [switch]$local
)

# Define URL base (local ou remoto)
if ($local) {
    $baseUrl = "http://127.0.0.1:8787"
} else {
    $baseUrl = "https://llm-chat-app-stardust.bragadasilvacezar.workers.dev"
}

# Monta os dados
$data = @{
    sender  = $sender
    content = $content
}

Write-Host "🌍 Enviando mensagem para ${room} ..." -ForegroundColor Cyan

# 1) Enviar a mensagem
$response = Invoke-RestMethod -Uri "$baseUrl/room/$room/send" `
    -Method POST -ContentType "application/json; charset=utf-8" `
    -Body ($data | ConvertTo-Json -Depth 3 -Compress)

Write-Host "✅ Mensagem enviada com sucesso!" -ForegroundColor Green
$response

# 2) Buscar histórico da sala (se solicitado)
if ($history) {
    Write-Host "`n📜 Histórico de ${room}:" -ForegroundColor Yellow
    Invoke-RestMethod -Uri "$baseUrl/room/$room/history" -Method GET
}

# 3) Consultar no D1 remoto (se não for local)
if ($history -and -not $local) {
    Write-Host "`n🗄️ Consultando D1 remoto (últimos registros da sala ${room})..." -ForegroundColor Magenta
    wrangler d1 execute DB --remote --command "SELECT * FROM messages WHERE room_id LIKE '%$room%' ORDER BY id DESC LIMIT 5;"
}
