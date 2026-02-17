Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][string]$Route,
  [string]$Title = "Page"
)

$ROOT = (Get-Location).Path

# route: "sobre" ou "blog/post" etc.
$routeNorm = ($Route.Trim() -replace "^[\/]+","" -replace "[\/]+$","")
if ([string]::IsNullOrWhiteSpace($routeNorm)) { throw "Route inválida: $Route" }

# Sanitiza segmentos
$segs = $routeNorm.Split("/") | ForEach-Object {
  ($_ -replace "[^a-zA-Z0-9\-_]+","-").Trim("-")
} | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

if ($segs.Count -lt 1) { throw "Route inválida após sanitização: $Route" }

$relDir = Join-Path "app" ( [string]::Join([System.IO.Path]::DirectorySeparatorChar, $segs) )
$relFile = Join-Path $relDir "page.tsx"

$code = @"
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>$Title</h1>
      <p style={{ marginTop: 12, opacity: 0.8 }}>
        route: /$routeNorm
      </p>
    </main>
  );
}
"@

& (Join-Path $ROOT "scripts/ops/write-safe.ps1") -Path $relFile -Content $code

Write-Host ("PAGE READY -> " + $relFile) -ForegroundColor Cyan