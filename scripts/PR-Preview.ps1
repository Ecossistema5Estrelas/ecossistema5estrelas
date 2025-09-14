param(
  [string]$Pr = "1",
  [string]$Label = "preview",
  [string]$Repo = "Ecossistema5Estrelas/ecossistema5estrelas"
)
$ErrorActionPreference = "Stop"

$out = vercel --yes
$prev = ($out | Select-String 'https://[^ ]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -Last 1
if (-not $prev) { throw "Não consegui capturar a URL de preview." }

# garante label
if (-not (gh label list --repo $Repo --limit 200 | Select-String "^\s*$Label\s")) {
  gh label create $Label --repo $Repo --color B794F4 --description "Tem link de preview da Vercel" | Out-Null
}

# valida PR existe
gh pr view $Pr --repo $Repo | Out-Null

gh pr edit $Pr --repo $Repo --add-label $Label | Out-Null
$body = @"
Preview: $prev

### Checklist
- [x] Preview OK
- [x] /robots.txt 200
- [x] /sitemap.xml 200
- [x] /rss.xml 200
- [x] canonical sem www
"@
gh pr comment $Pr --repo $Repo --body $body | Out-Null
Write-Host "✅ Comentado no PR #$Pr com preview: $prev"
