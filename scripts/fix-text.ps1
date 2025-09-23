Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\[.*\]" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    $newContent = $content `
      -replace "text-(gray|zinc|neutral)-\d{2,3}", "text-white" `
      -replace "dark:text-(gray|zinc|neutral)-\d{2,3}", "dark:text-white/70"

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Corrigido:" $_.FullName
    }
  }
