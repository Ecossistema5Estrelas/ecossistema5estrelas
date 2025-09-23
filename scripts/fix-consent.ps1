(Get-Content components/Consent.tsx -Raw) `
  -replace '<div([^>]+)onClick={(.*?)}([^>]*)>(\s*)Aceitar(\s*)</div>', '<button$1onClick={$2}$3>Aceitar</button>' `
  | Set-Content components/Consent.tsx -Encoding utf8

Write-Host "✅ Consent.tsx corrigido (div → button)"
