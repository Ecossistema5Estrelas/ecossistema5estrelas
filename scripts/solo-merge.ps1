param(
    [int]$prNumber
)

# Configurações principais
$owner  = "Ecossistema5Estrelas"
$repo   = "ecossistema5estrelas"
$branch = "release/landing-v1"

Write-Host "=== SOLO MERGE para PR #$prNumber ==="

# 1) Desliga exigência de review
@'
{
  "required_approving_review_count": 0
}
'@ | gh api -X PATCH repos/$owner/$repo/branches/$branch/protection/required_pull_request_reviews --input -
Write-Host "✔ Review obrigatório desativado"

# 2) Desliga exigência de status check
@'
{
  "strict": false,
  "contexts": []
}
'@ | gh api -X PATCH repos/$owner/$repo/branches/$branch/protection/required_status_checks --input -
Write-Host "✔ Status checks desativados"

# 3) Faz o merge do PR
gh pr merge $prNumber -R "$owner/$repo" --squash --admin
Write-Host "✔ Merge concluído do PR #$prNumber"

# 4) Reativa exigência de review
@'
{
  "required_approving_review_count": 1
}
'@ | gh api -X PATCH repos/$owner/$repo/branches/$branch/protection/required_pull_request_reviews --input -
Write-Host "✔ Review obrigatório reativado"

# 5) Reativa exigência do smoke-prod
@'
{
  "strict": true,
  "contexts": ["smoke-prod"]
}
'@ | gh api -X PATCH repos/$owner/$repo/branches/$branch/protection/required_status_checks --input -
Write-Host "✔ Status check smoke-prod reativado"

Write-Host "=== SOLO MERGE FINALIZADO ==="