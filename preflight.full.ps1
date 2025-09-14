#Requires -Version 5
$ErrorActionPreference = "Stop"
if ($PSScriptRoot) { Set-Location $PSScriptRoot }

. .\scripts\Assert-PreReq.ps1
. .\scripts\Write-Log.ps1

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
function Test-Url([string]$u) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 12
    Write-Log -Message "$u => $($r.StatusCode)"
    return $true
  } catch {
    Write-Log -Message "$u falhou: $($_.Exception.Message)" -Level "WARN"
    return $false
  }
}

function Get-CanonicalBaseUrl {
  # 1) usa env (Vercel) se houver
  $envSite = $env:NEXT_PUBLIC_SITE_URL
  if ($envSite -and $envSite -match '^https?://') { return $envSite.TrimEnd('/') }

  # 2) fallback padrão do projeto
  return 'https://www.ecossistema5estrelas.org'
}

# -----------------------------------------------------------------------------
# Início
# -----------------------------------------------------------------------------
Write-Log -Message "Full preflight iniciado"

try {
  # Ferramentas básicas
  Assert-Tool node; Assert-Tool npm; Assert-Tool npx; Assert-Tool git
  Write-Log -Message "Ferramentas básicas OK"

  # Git (informativo)
  try {
    $branch = (git rev-parse --abbrev-ref HEAD)
    $dirty  = (git status --porcelain)
    Write-Log -Message "Branch: $branch; dirty: $(if($dirty){'sim'}else{'não'})"
  } catch { Write-Log -Message "Git indisponível: $($_.Exception.Message)" -Level "WARN" }

  # Dependências (somente se node_modules ausente)
  if (!(Test-Path "node_modules")) {
    Write-Log -Message "node_modules não existe; executando npm ci"
    npm ci
  }

  # Typecheck (se houver tsconfig)
  if (Test-Path "tsconfig.json") {
    Write-Log -Message "Rodando tsc --noEmit"
    npx tsc --noEmit
  } else {
    Write-Log -Message "tsconfig.json ausente — pulando tsc" -Level "WARN"
  }

  # Build Next
  Write-Log -Message "Rodando next build"
  $env:NODE_OPTIONS="--max_old_space_size=4096"
  npx next@15.5.2 telemetry disable *>$null
  npx next@15.5.2 build

  # Checagens HTTP em PRODUÇÃO
  $base = Get-CanonicalBaseUrl
  $urls = @(
    "$base/robots.txt",
    "$base/api/health",
    "$base/sitemap.xml",
    "$base/rss"
  )
  Write-Log -Message "Checando produção em $base"
  $allOk = $true
  foreach ($u in $urls) { if (-not (Test-Url $u)) { $allOk = $false } }

  if ($allOk) {
    Write-Log -Message "Full preflight OK"
    exit 0
  } else {
    Write-Log -Message "Full preflight OK com avisos (veja WARNs acima)"
    exit 0
  }

} catch {
  Write-Log -Message "Falha no full preflight: $($_.Exception.Message)" -Level "ERROR"
  exit 1
}
