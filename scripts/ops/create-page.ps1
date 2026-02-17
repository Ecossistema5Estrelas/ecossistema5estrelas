param(
  [Parameter(Mandatory=$true)]
  [string]$Route,

  [string]$Title = "Page"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ROOT = (Get-Location).Path

$routeNorm = ($Route.Trim() -replace "^[\/]+","" -replace "[\/]+$","")
if ([string]::IsNullOrWhiteSpace($routeNorm)) {
  throw "Route inválida: $Route"
}

$segs = $routeNorm.Split("/") | ForEach-Object {
  ($_ -replace "[^a-zA-Z0-9\-_]+","-").Trim("-")
} | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

if ($segs.Count -lt 1) {
  throw "Route inválida após sanitização: $Route"
}

$relDir  = Join-Path "app" ([string]::Join([System.IO.Path]::DirectorySeparatorChar, $segs))
$relFile = Join-Path $relDir "page.tsx"
$abs     = Join-Path $ROOT $relFile
$dir     = Split-Path $abs -Parent

New-Item -ItemType Directory -Force $dir | Out-Null
if (-not (Test-Path $dir)) { throw "Diretório não criado: $dir" }

$codeTsx = "export default function Page() {`n  return (`n    <main style={{ padding: 24 }}>`n      <h1 style={{ fontSize: 28, fontWeight: 700 }}>$Title</h1>`n      <p style={{ marginTop: 12, opacity: 0.8 }}>route: /$routeNorm</p>`n    </main>`n  );`n}`n"

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($abs, $codeTsx, $enc)

if (-not (Test-Path $abs)) { throw "Arquivo não criado: $abs" }

Write-Host "PAGE READY -> $relFile" -ForegroundColor Green