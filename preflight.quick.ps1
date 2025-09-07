#Requires -Version 5
$ErrorActionPreference = "Stop"
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Path)

. .\scripts\Assert-PreReq.ps1
. .\scripts\Write-Log.ps1

Write-Log -Message "Quick preflight iniciado"

try {
  Assert-Tool node
  Assert-Tool npm
  Assert-Tool npx
  Write-Log -Message "Node/npm/npx OK"

  if(Test-Path package.json){
    $pkg = Get-Content package.json -Raw | ConvertFrom-Json
    $deps = @($pkg.dependencies.PSObject.Properties.Name) + @($pkg.devDependencies.PSObject.Properties.Name)
    if(-not ($deps -contains "next")){ throw "Next não está nas dependências" }
    Write-Log -Message "Next detectado"
  } else { throw "package.json ausente" }

  # Mojibake básico
  $moji = Select-String -Path *.ts,*.tsx -Pattern 'Ã|ðŸ|�' -SimpleMatch -AllMatches -ErrorAction SilentlyContinue
  if($moji){ Write-Log -Message "Possível mojibake encontrado (ver log)" -Level "WARN" }

  # Referências a env + presença de .env.local
  $refs = Get-EnvRefs
  if($refs.Count -gt 0){
    Write-Log -Message ("ENV refs: " + ($refs -join ", "))
    if(!(Test-Path ".env.local")){ Write-Log -Message ".env.local não encontrado" -Level "WARN" }
  }

  # Health + RSS/robots/sitemap (produção)
  $urls = @(
    "https://ecossistema5estrelas.org/api/health",
    "https://ecossistema5estrelas.org/rss",
    "https://ecossistema5estrelas.org/robots.txt",
    "https://ecossistema5estrelas.org/sitemap.xml"
  )
  foreach($url in $urls){
    try{
      $r = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 10
      Write-Log -Message "$url => $($r.StatusCode)"
    } catch {
      Write-Log -Message "$url falhou: $($_.Exception.Message)" -Level "WARN"
    }
  }

  Write-Log -Message "Quick preflight OK"
  exit 0
} catch {
  Write-Log -Message "Falha: $($_.Exception.Message)" -Level "ERROR"
  exit 1
}