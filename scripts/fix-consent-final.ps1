$path = "components/Consent.tsx"
$content = Get-Content $path -Raw

# Troca div com onClick → button com fechamento correto
$content = $content -replace '<div([^>]*)onClick={(.*?)}([^>]*)>\s*Aceitar\s*</div>',
'<button$1 onClick={$2}$3 className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">Aceitar</button>'

# Garante que não sobrou </div> extra
$content = $content -replace '</div>\s*</div>', '</div>'

Set-Content $path $content -Encoding utf8
Write-Host "✅ Consent.tsx finalmente corrigido (div → button com onClick válido)"
