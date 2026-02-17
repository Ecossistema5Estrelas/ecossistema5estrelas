param([switch]$Force)
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Ensure-Dir([string]$p){
  if (-not (Test-Path $p)) { New-Item -ItemType Directory -Force -Path $p | Out-Null }
}

function Write-File([string]$path, [string]$content){
  $dir = Split-Path $path -Parent
  if ($dir -and (-not (Test-Path $dir))) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if ((Test-Path $path) -and (-not $Force)) { return }
  $content | Out-File -FilePath $path -Encoding utf8 -Force
}

$dirs = @(
  "app",
  "components",
  "styles\tokens",
  "styles\base",
  "styles\layout",
  "styles\components",
  "styles\states",
  "styles\themes",
  "scripts\ops",
  "schemas",
  "lib",
  "public",
  "docs",
  ".sandbox",
  ".vscode",
  "docs\snapshots"
)

foreach ($d in $dirs) { Ensure-Dir $d }

$sandboxReadme = @("
# .sandbox/
Zona autorizada para experimentos que podem quebrar.

Regras:
- Pode quebrar: ✅
- Pode sujar: ✅
- Pode ser deletado sem dó: ✅
- NÃO pode vazar para /app, /components, /styles: ❌
") -join "`n"

Write-File ".sandbox\README.md" $sandboxReadme

Write-Host "Setup 5⭐ executado com sucesso." -ForegroundColor Green
