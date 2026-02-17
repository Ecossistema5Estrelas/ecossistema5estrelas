param(
  [Parameter(Mandatory=$true)]
  [string]$Titulo,

  [Parameter(Mandatory=$true)]
  [string]$Conteudo
)

$basePath = Get-Location
$logsPath = Join-Path $basePath "logs"

New-Item -ItemType Directory -Force $logsPath | Out-Null

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$slug = ($Titulo.ToLower() -replace '[^a-z0-9]+','-').Trim('-')

$filePath = Join-Path $logsPath "mnemosine-$timestamp-$slug.txt"

@"
MNEMOSINE — REGISTRO CANÔNICO
Timestamp: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

TÍTULO
$Titulo

CONTEÚDO
$Conteudo
"@ | Set-Content $filePath -Encoding UTF8

Write-Host "✔ Registro criado em $filePath"
