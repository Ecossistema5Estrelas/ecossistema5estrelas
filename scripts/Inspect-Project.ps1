# scripts\Inspect-Project.ps1 (v2)
# MODO LEITURA: NÃO MODIFICA NADA

param(
  [string]$Root = (Get-Location).Path,
  [int]$MaxFilesPerFolder = 200
)

$ErrorActionPreference = "SilentlyContinue"
Write-Host "== ECOSSISTEMA5ESTRELAS :: INSPECT ==" -ForegroundColor Cyan
Write-Host "Root: $Root`n"

function S($label, $value) { "{0,-28} {1}" -f $label, $value }

# 0) Ambiente
Write-Host "# Ambiente" -ForegroundColor Yellow
S "PSVersion" $PSVersionTable.PSVersion
S "Node"     (node -v)
S "npm"      (npm -v)
S "pnpm"     (pnpm -v)
S "npx"      (npx -v)
S "Vercel"   (vercel --version)
S "gh"       (gh --version | Select-String "gh version")
""

# 1) Git
Write-Host "# Git" -ForegroundColor Yellow
S "branch atual"   ((git rev-parse --abbrev-ref HEAD) 2>$null)
S "último commit"  ((git log -1 --pretty="%h %ad %s" --date=short) 2>$null)
S "remote origin"  ((git remote get-url origin) 2>$null)
S "tags (top 5)"   ((git tag --sort=-creatordate | Select-Object -First 5) -join ", ")
git status --short
""

# 2) package.json
Write-Host "# package.json" -ForegroundColor Yellow
$pkgPath = Join-Path $Root "package.json"
if (Test-Path $pkgPath) {
  $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
  S "name" $pkg.name
  S "version" $pkg.version
  $deps = @($pkg.dependencies.PSObject.Properties.Name) + @($pkg.devDependencies.PSObject.Properties.Name)
  S "next" ($deps | Where-Object { $_ -eq "next" } | ForEach-Object { "installed" })
  S "scripts" (($pkg.scripts.PSObject.Properties.Name | Sort-Object) -join ", ")
} else { Write-Host "package.json não encontrado" -ForegroundColor Red }
""

# 3) Arquivos críticos (existência)
Write-Host "# Arquivos críticos" -ForegroundColor Yellow
$must = @(
  "next.config.mjs","vercel.json",
  "app\layout.tsx","app\page.tsx",
  "app\rss.xml\route.ts","app\robots.txt","app\sitemap.xml\route.ts",
  "app\api\health\route.ts",
  "public\favicon.ico","public\site.webmanifest"
)
foreach ($m in $must) {
  $p = Join-Path $Root $m
  $ok = Test-Path $p
  S $m ($(if($ok){"OK"}else{"MISS"}))
}
""

# 4) Rotas conhecidas respondendo (se server local rodando)
Write-Host "# Rotas (opcional)" -ForegroundColor Yellow
$local = "http://localhost:3000"
$paths = @("/", "/api/health", "/robots.txt", "/sitemap.xml", "/rss.xml")
foreach ($r in $paths) {
  try {
    $res = Invoke-WebRequest "$local$r" -UseBasicParsing -TimeoutSec 3
    S "$r" $res.StatusCode
  } catch {
    S "$r" "n/d (sem server local)"
  }
}
""

# 5) Vercel envs (somente leitura)
Write-Host "# Vercel env ls" -ForegroundColor Yellow
vercel env ls

# 6) Estrutura do projeto (árvore resumida, sem ternário)
Write-Host "`n# Estrutura (resumo)" -ForegroundColor Yellow
$excludeRegex = "\\(\.git|node_modules|\.next|out|\.vercel)(\\|$)"
"ECOSSISTEMA5ESTRELAS :: TREE (excl. .git/node_modules/.next/out/.vercel)" | Set-Content inspect-tree.txt -Encoding UTF8

Get-ChildItem -Recurse -Directory -Force `
| Where-Object { $_.FullName -notmatch $excludeRegex } `
| ForEach-Object {
  $rel = $_.FullName.Substring($Root.Length)
  if ([string]::IsNullOrWhiteSpace($rel)) { return }
  Add-Content inspect-tree.txt $rel
  $files = Get-ChildItem $_.FullName -File -Force
  $take = [Math]::Min($files.Count, $MaxFilesPerFolder)
  for ($i=0; $i -lt $take; $i++) { Add-Content inspect-tree.txt ("  - " + $files[$i].Name) }
  if ($files.Count -gt $MaxFilesPerFolder) {
    Add-Content inspect-tree.txt ("  - ... (+" + ($files.Count - $MaxFilesPerFolder) + " arquivos)")
  }
}

# 7) Resumo JSON
$summary = [ordered]@{
  when       = (Get-Date).ToString("s")
  root       = $Root
  node       = (node -v)
  vercel     = (vercel --version)
  branch     = (git rev-parse --abbrev-ref HEAD)
  lastCommit = (git log -1 --pretty="%h %ad %s" --date=iso)
  critical   = @{}
}
foreach ($m in $must) { $summary.critical[$m] = (Test-Path (Join-Path $Root $m)) }
$summary | ConvertTo-Json -Depth 6 | Set-Content inspect-summary.json -Encoding UTF8

Write-Host "`nArquivos gerados:"
Write-Host " - inspect-tree.txt"
Write-Host " - inspect-summary.json"
Write-Host "`nFIM (somente leitura) ✅" -ForegroundColor Green
