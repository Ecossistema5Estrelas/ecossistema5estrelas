#Requires -Version 5
$ErrorActionPreference = "Stop"
if ($PSScriptRoot) { Set-Location $PSScriptRoot }

. .\scripts\Assert-PreReq.ps1
. .\scripts\Write-Log.ps1

Write-Log -Message "Quick preflight iniciado"

try {
  Assert-Tool node
  Assert-Tool npm
  Assert-Tool npx
  Write-Log -Message "Node/npm/npx OK"

  if (Test-Path package.json) {
    $pkg  = Get-Content package.json -Raw | ConvertFrom-Json
    $deps = @($pkg.dependencies.PSObject.Properties.Name) + @($pkg.devDependencies.PSObject.Properties.Name)
    if (-not ($deps -contains "next")) { throw "Next não está nas dependências" }
    Write-Log -Message "Next detectado"
  } else { throw "package.json ausente" }

  # Checagem única (produção)
  $url = "https://ecossistema5estrelas.org/robots.txt"
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 10
    Write-Log -Message "$url => $($r.StatusCode)"
  } catch {
    Write-Log -Message "$url falhou: $($_.Exception.Message)" -Level "WARN"
  }

  Write-Log -Message "Quick preflight OK"
  exit 0
} catch {
  Write-Log -Message "Falha: $($_.Exception.Message)" -Level "ERROR"
  exit 1
}
