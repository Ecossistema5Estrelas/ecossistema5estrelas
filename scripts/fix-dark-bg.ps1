Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "dark:bg-glass/\[[0-9\.]+\]", "dark:bg-glass"

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Normalizado:" $_.FullName
    }
  }
