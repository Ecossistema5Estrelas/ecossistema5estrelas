param()

Write-Host "E1 — Normalizacao UTF-8 + Microcopy Semantico" -ForegroundColor Cyan

$targets = @(
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/blog/temas/page.tsx"
)

$mapPath = "scripts/ops/e1-map.txt"

if (-not (Test-Path $mapPath)) {
  Write-Host "Mapa nao encontrado: $mapPath" -ForegroundColor Red
  exit 1
}

$lines = Get-Content -LiteralPath $mapPath

foreach ($path in $targets) {
  if (-not (Test-Path $path)) {
    Write-Host "SKIP: $path (nao encontrado)" -ForegroundColor Yellow
    continue
  }

  Write-Host "Normalizando: $path" -ForegroundColor Gray

  $text = Get-Content -LiteralPath $path -Raw

  foreach ($line in $lines) {
    if ($line -notmatch "\|\|\|") { continue }
    $parts = $line -split "\|\|\|", 2
    $from = $parts[0]
    $to   = $parts[1]
    $text = $text.Replace($from, $to)
  }

  Set-Content -LiteralPath $path -Value $text -Encoding utf8
}

Write-Host "E1 FINALIZADO COM SUCESSO" -ForegroundColor Green
