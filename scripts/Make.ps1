param([string]$Base="https://ecossistema5estrelas.org")

function Invoke-Checks([string]$Url){
  iwr "$Url/api/health"  -UseBasicParsing | Select-Object StatusCode,Content
  iwr "$Url/robots.txt"  -UseBasicParsing | Select-Object StatusCode
  iwr "$Url/sitemap.xml" -UseBasicParsing | Select-Object StatusCode
  iwr "$Url/rss.xml"     -UseBasicParsing | Select-Object StatusCode
  (iwr "$Url" -UseBasicParsing -Headers @{ "Accept-Encoding"="identity" }).RawContent `
    | Select-String 'rel="canonical"'
  (iwr "$Url" -UseBasicParsing -Headers @{ "Accept-Encoding"="identity" }).RawContent `
    | Select-String 'www\.ecossistema5estrelas\.org' | Out-Null
  Write-Host "✅ canonical ok e sem www"
}

switch ($args[0]) {
  "preview" {
    vercel --yes | Out-Null
    $last = (Get-Clipboard) # ou copie da saída; ajuste se preferir
    Write-Host "Preview: $last"
    Invoke-Checks $last
  }
  "check"   { Invoke-Checks $Base }
  "promote" {
    $deploy = (vercel deploy --prod --yes | Select-String 'https://.*\.vercel\.app').Matches.Value | Select-Object -Last 1
    if (-not $deploy) { throw "Não consegui extrair a URL do deploy." }
    vercel alias set $deploy ecossistema5estrelas.org --scope cezar-braga-da-silvas-projects
    vercel alias set $deploy www.ecossistema5estrelas.org --scope cezar-braga-da-silvas-projects
    Invoke-Checks $Base
  }
  default {
    Write-Host "Uso: pwsh scripts/Make.ps1 <preview|check|promote>"
  }
}
