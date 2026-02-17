Write-Host "E1.1 — Fix de paths especiais + blindagem [slug]" -ForegroundColor Cyan

$files = @(
  "app/blog/page.tsx",
  "app/blog/temas/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/blog/page/[page]/page.tsx",
  "app/blog/series/page.tsx",
  "app/blog/trilhas/page.tsx",
  "app/blog/timeline/page.tsx"
)

foreach ($file in $files) {
  if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "SKIP: $file (nao encontrado)" -ForegroundColor DarkYellow
    continue
  }

  Write-Host "Processando: $file" -ForegroundColor Gray

  $raw = Get-Content -LiteralPath $file -Raw

  # Remove BOM se existir
  if ($raw.Length -gt 0 -and $raw[0] -eq [char]0xFEFF) {
    $raw = $raw.Substring(1)
  }

  # Normaliza EOL para LF
  $raw = $raw -replace "`r`n", "`n"
  $raw = $raw -replace "`r", "`n"

  # Garante newline final
  if (-not $raw.EndsWith("`n")) {
    $raw += "`n"
  }

  Set-Content -LiteralPath $file -Value $raw -Encoding utf8

  Write-Host "OK: $file" -ForegroundColor Green
}

Write-Host "E1.1 FINALIZADO" -ForegroundColor Green