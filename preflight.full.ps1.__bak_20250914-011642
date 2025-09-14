#Requires -Version 5
$ErrorActionPreference = "Stop"
if ($PSScriptRoot) { Set-Location $PSScriptRoot }

. .\scripts\Assert-PreReq.ps1
. .\scripts\Write-Log.ps1

Write-Log -Message "Full preflight iniciado"

try {
  Assert-Tool node; Assert-Tool npm; Assert-Tool npx; Assert-Tool git
  Write-Log -Message "Ferramentas básicas OK"

  # Git
  try{
    $branch = (git rev-parse --abbrev-ref HEAD)
    $dirty  = (git status --porcelain)
    Write-Log -Message "Branch: $branch; dirty: $(if($dirty){'sim'}else{'não'})"
  } catch { Write-Log -Message "Git indisponível: $($_.Exception.Message)" -Level "WARN" }

  # Dependências
  if(!(Test-Path "node_modules")){
    Write-Log -Message "node_modules não existe; executando npm ci"
    npm ci
  }

  # Lint / Typecheck (se houver)
  if ((Test-Path ".eslintrc.json") -or (Test-Path ".eslintrc.js") -or (Test-Path ".eslintrc.cjs")){
    Write-Log -Message "Rodando next lint"
    npx next@15.5.2 lint
  } else { Write-Log -Message "ESLint ausente — pulando" -Level "WARN" }

  if ((Test-Path "tsconfig.json")){
    Write-Log -Message "Rodando tsc --noEmit"
    npx tsc --noEmit
  } else { Write-Log -Message "tsconfig.json ausente — pulando tsc" -Level "WARN" }

  # Build
  Write-Log -Message "Rodando next build"
  $env:NODE_OPTIONS="--max_old_space_size=4096"
  npx next@15.5.2 telemetry disable *>$null
  npx next@15.5.2 build

  # Checagem única (produção)
  $url = "https://ecossistema5estrelas.org/robots.txt"
  try{
    $r = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 15
    Write-Log -Message "$url => $($r.StatusCode)"
  } catch {
    Write-Log -Message "$url falhou: $($_.Exception.Message)" -Level "WARN"
  }

  Write-Log -Message "Full preflight OK"
  exit 0
} catch {
  Write-Log -Message "Falha no full preflight: $($_.Exception.Message)" -Level "ERROR"
  exit 1
}


