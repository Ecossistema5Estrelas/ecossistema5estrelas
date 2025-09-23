Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    $newContent = $content `
      -replace 'bg-glass', 'bg-emerald-600 hover:bg-emerald-700 text-white' `
      -replace 'bg-gradient-to-[^"'' ]+', 'bg-emerald-600 hover:bg-emerald-700 text-white' `
      -replace 'from-[^"'' ]+ via-[^"'' ]+ to-[^"'' ]+', ''

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Corrigido botão em:" $_.FullName
    }
  }
