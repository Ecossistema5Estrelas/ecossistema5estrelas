param(
  [Parameter(Position=0)][ValidateSet("preview","check","promote")] [string]$Mode = "check",
  [Parameter(Position=1)] [string]$Base = "https://ecossistema5estrelas.org"
)

$ErrorActionPreference = "Stop"

function Invoke-Checks([string]$Url){
  iwr "$Url/api/health"  -UseBasicParsing | Select-Object StatusCode,Content
  iwr "$Url/robots.txt"  -UseBasicParsing | Select-Object StatusCode
  iwr "$Url/sitemap.xml" -UseBasicParsing | Select-Object StatusCode
  iwr "$Url/rss.xml"     -UseBasicParsing | Select-Object StatusCode

  $raw = (iwr "$Url" -UseBasicParsing -Headers @{ "Accept-Encoding"="identity" }).RawContent
  $raw | Select-String 'rel="canonical"' | Out-Null
  if ($raw -match 'www\.ecossistema5estrelas\.org') {
    throw "❌ canonical contém www — ajuste NEXT_PUBLIC_SITE_URL/Metadata"
  }
  Write-Host "✅ canonical ok e sem www"
}

switch ($Mode) {
  "preview" {
    $out = vercel --yes
    $prev = ($out | Select-String 'https://[^ ]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -Last 1
    if (-not $prev) { throw "Não consegui capturar a URL de preview da saída do Vercel." }
    Write-Host "Preview: $prev"
    Invoke-Checks $prev
  }
  "check"   { Invoke-Checks $Base }
  "promote" {
    $out = vercel deploy --prod --yes
    $deploy = ($out | Select-String 'https://[^ ]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -Last 1
    if (-not $deploy) { throw "Não consegui capturar a URL do deploy da saída do Vercel." }

    vercel alias set $deploy ecossistema5estrelas.org --scope cezar-braga-da-silvas-projects
    vercel alias set $deploy www.ecossistema5estrelas.org --scope cezar-braga-da-silvas-projects
    Invoke-Checks $Base
  }
}
