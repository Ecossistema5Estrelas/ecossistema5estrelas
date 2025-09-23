Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Remove gradientes e fundos exagerados
    $newContent = $content `
      -replace 'bg-gradient-to-[^"'' ]+', 'bg-white dark:bg-black' `
      -replace 'from-[^"'' ]+ via-[^"'' ]+ to-[^"'' ]+', '' `
      -replace 'bg-\[url\(.*\)\]', 'bg-white dark:bg-black'

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Corrigido fundo em:" $_.FullName
    }
  }
