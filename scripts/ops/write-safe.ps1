Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][string]$Path,
  [Parameter(Mandatory=$true)][string]$Content,
  [switch]$NoNewline
)

$ROOT = (Get-Location).Path
$abs = if ([System.IO.Path]::IsPathRooted($Path)) { $Path } else { Join-Path $ROOT $Path }
$dir = Split-Path $abs -Parent

New-Item -ItemType Directory -Force $dir | Out-Null
if (-not (Test-Path $dir)) { throw "FALHA: diretório não existe -> $dir" }

# Normaliza newline (evita Windows/PS engolindo conteúdo)
$final = if ($NoNewline) { $Content } else { $Content + "`n" }

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($abs, $final, $enc)

if (-not (Test-Path $abs)) { throw "FALHA: arquivo não foi criado -> $abs" }

$len = (Get-Item $abs).Length
if ($len -lt 1) { throw "FALHA: arquivo vazio -> $abs" }

Write-Host ("OK FILE -> " + $abs) -ForegroundColor Green