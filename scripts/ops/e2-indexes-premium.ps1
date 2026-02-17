param()

$ErrorActionPreference = "Stop"

Write-Host "E2 — Indices Premium (TEMAS/SERIES/TRILHAS) [SAFE PATCH]" -ForegroundColor Cyan

# Arquivos-alvo (indices)
$targets = @(
  "app/blog/temas/page.tsx",
  "app/blog/series/page.tsx",
  "app/blog/trilhas/page.tsx"
)

# Snapshot
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
New-Item -ItemType Directory -Force "_audit/P5/snapshots" | Out-Null

function Snapshot-File([string]$p) {
  if (Test-Path -LiteralPath $p) {
    $safe = ($p -replace '[\\/:*\?"<>|]', '_').Replace('[','_').Replace(']','_')
    Copy-Item -LiteralPath $p -Destination "_audit/P5/snapshots/E2.$safe.$ts.bak" -Force
  }
}

function Ensure-LinkImport([string]$text) {
  if ($text -match 'from\s+"next/link"|from\s+''next/link''') { return $text }

  # Insere import Link após o primeiro bloco de imports (ou no topo)
  if ($text -match "^(import .+;?\s*\r?\n)+") {
    return ($text -replace "^(import .+;?\s*\r?\n)+", "`$0import Link from `"next/link`";`n")
  }

  return "import Link from `"next/link`";`n" + $text
}

function Inject-TopNav([string]$text, [string]$labelUpper, [string]$hint) {
  # Idempotência: se já tem breadcrumb/topnav, não duplica
  if ($text -match 'aria-label="Breadcrumb Premium"|aria-label=''Breadcrumb Premium''') { return $text }

  $nav = @"
      <nav aria-label="Breadcrumb Premium" className="mb-6 flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-white/60">
        <Link href="/blog" className="rounded-full border border-white/10 px-3 py-1 hover:border-white/20">
          BLOG ARQFUTURUM
        </Link>
        <span className="opacity-60">›</span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">$labelUpper</span>
        <span className="ml-2 text-white/40">$hint</span>
      </nav>

"@

  # Injeta logo após a primeira tag <main ...>
  if ($text -match "<main[^>]*>") {
    return ($text -replace "(<main[^>]*>\s*)", "`$1`n$nav")
  }

  return $text
}

function Patch-File([string]$p) {
  if (-not (Test-Path -LiteralPath $p)) {
    Write-Host "SKIP: $p (nao encontrado)" -ForegroundColor Yellow
    return
  }

  Snapshot-File $p
  $text = Get-Content -LiteralPath $p -Raw

  $text = Ensure-LinkImport $text

  switch -Regex ($p) {
    "temas\\page\.tsx$" {
      $text = Inject-TopNav $text "TEMAS" "ENTRAR POR SIGNIFICADO (A–Z)"
      # reforço leve de header (sem quebrar JSX existente)
      $text = $text.Replace(">TEMAS<", ">TEMAS (A–Z)<")
      $text = $text.Replace("Lista de categorias (fonte da verdade: Sanity).", "Lista de categorias (fonte da verdade: Sanity). Entre por conceito, não por data.")
    }
    "series\\page\.tsx$" {
      $text = Inject-TopNav $text "SÉRIES" "ENTRAR POR CONTINUIDADE"
    }
    "trilhas\\page\.tsx$" {
      $text = Inject-TopNav $text "TRILHAS" "ENTRAR POR APRENDIZAGEM"
    }
  }

  # UTF-8 sem BOM + LF + newline final (reaproveita a disciplina do E1.1)
  if ($text.Length -gt 0 -and $text[0] -eq [char]0xFEFF) { $text = $text.Substring(1) }
  $text = $text -replace "`r`n", "`n"
  $text = $text -replace "`r", "`n"
  if (-not $text.EndsWith("`n")) { $text += "`n" }

  Set-Content -LiteralPath $p -Value $text -Encoding utf8

  Write-Host "OK: $p" -ForegroundColor Green
}

foreach ($t in $targets) { Patch-File $t }

Write-Host "E2 FINALIZADO (patch seguro aplicado nos indices)" -ForegroundColor Green
