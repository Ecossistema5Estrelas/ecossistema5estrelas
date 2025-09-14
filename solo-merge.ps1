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
