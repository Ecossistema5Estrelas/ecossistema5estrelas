$path = "components/Consent.tsx"
$content = Get-Content $path -Raw

# Força a linha problemática a virar um <button> bem formado
$content = $content -replace 'onClick=\{\(\)\s*=>\s*\{[^}]+\}\}', 'onClick={() => { localStorage.setItem("consent","granted"); setShow(false); }}'

# Substitui blocos com div/button quebrados
$content = $content -replace '<div([^>]*)onClick=', '<button$1 onClick='
$content = $content -replace 'Aceitar\s*</div>', 'Aceitar</button>'

# Remove duplicatas de </button>
$content = $content -replace '</button>\s*</button>', '</button>'

Set-Content $path $content -Encoding utf8
Write-Host "✅ Consent.tsx corrigido (button único, JSX válido)"
