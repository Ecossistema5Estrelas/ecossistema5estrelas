Get-ChildItem -Recurse -Path app -Include *.tsx -File | ForEach-Object {
    # Pular arquivos de rotas dinâmicas que não existem
    if ($_.FullName -match "\\[slug\\]") { return }

    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace '(\bhover:bg-emerald-600\b.*hover:bg-emerald-700\b.*text-white).*?\1', '$1'

    if ($newContent -ne $content) {
        $newContent | Out-File -FilePath $_.FullName -Encoding utf8
        Write-Host "Deduplicado:" $_.FullName
    }
}
