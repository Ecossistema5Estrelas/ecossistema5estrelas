param([string]$LayoutPath = "app/layout.tsx")

$ErrorActionPreference = "Stop"
if (!(Test-Path $LayoutPath)) { throw "Arquivo não encontrado: $LayoutPath" }

$SITE = '{process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org"}'
$canonical = "<link rel=`"canonical`" href=$SITE />"
$manifest  = '<link rel="manifest" href="/site.webmanifest" />'
$icon      = '<link rel="icon" href="/favicon.svg" />'

$txt = Get-Content $LayoutPath -Raw
$changed = $false

function Ensure-InHead([string]$marker, [string]$snippet) {
  if ($txt -match [regex]::Escape($marker)) { return }
  if ($txt -notmatch '</head>') { throw "Não encontrei </head> no layout. Abra o arquivo e garanta <head>...</head>." }
  $script:txt = $txt -replace '</head>', ("  " + $snippet + "`r`n</head>")
  $script:changed = $true
}

Ensure-InHead 'rel="canonical"' $canonical
Ensure-InHead 'rel="manifest"'  $manifest
Ensure-InHead 'rel="icon"'      $icon

if ($changed) {
  Set-Content $LayoutPath -Value $txt -Encoding UTF8
  Write-Host "Atualizado: $LayoutPath" -ForegroundColor Green
} else {
  Write-Host "Nada a fazer: já existem canonical/manifest/icon no <head>." -ForegroundColor Yellow
}
