Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.Name -match "layout.tsx" -or $_.Name -match "Header.tsx" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Troca gradiente por cor sólida no header
    $newContent = $content `
      -replace 'bg-gradient-to-[^"'' ]+', 'bg-emerald-800' `
      -replace 'from-[^"'' ]+ via-[^"'' ]+ to-[^"'' ]+', '' `
      -replace 'bg-\[url\(.*\)\]', ''

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Limpado header em:" $_.FullName
    }
  }
