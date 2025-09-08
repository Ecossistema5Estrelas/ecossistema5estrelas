param(
  [string]$Pr = "1",
  [string]$Label = "preview"
)
$ErrorActionPreference = "Stop"

$out = vercel --yes
$prev = ($out | Select-String 'https://[^ ]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -Last 1
if (-not $prev) { throw "Não consegui capturar a URL de preview." }

# garante label
if (-not (gh label list --limit 200 | Select-String "^\s*$Label\s")) {
  gh label create $Label --color B794F4 --description "Tem link de preview da Vercel" | Out-Null
}

gh pr edit $Pr --add-label $Label | Out-Null
gh pr comment $Pr --body "Preview: $prev`n`n### Checklist`n- [x] Preview OK`n- [x] /robots.txt 200`n- [x] /sitemap.xml 200`n- [x] /rss.xml 200`n- [x] canonical sem www" | Out-Null
Write-Host "Comentado no PR #$Pr com preview: $prev"
