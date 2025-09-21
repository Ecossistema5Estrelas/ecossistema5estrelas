param(
    [string]$url = "https://ecossistema5estrelas.org"
)

Write-Host "🌐 Abrindo site em: $url"
Start-Process $url
