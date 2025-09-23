$path = "components/Consent.tsx"
$content = Get-Content $path -Raw

# Garante que a estrutura principal termina corretamente
if ($content -notmatch "</div>\s*$") {
  $content += "`r`n</div>`r`n"
}

# Troca blocos problemáticos: garante que Aceitar está dentro de <button>
$content = $content -replace 'onClick={(.*?)}\s*>\s*Aceitar\s*</div>', 'onClick={$1}>Aceitar</button>'

# Corrige se tiver <div ... onClick> ainda
$content = $content -replace '<div([^>]*)onClick=', '<button$1 onClick='
$content = $content -replace '</div>', '</button>'

Set-Content $path $content -Encoding utf8
Write-Host "✅ Consent.tsx corrigido (tags fechadas e button aplicado)"
