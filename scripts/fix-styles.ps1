Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\[.*\]" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "bg-gray-\d{2,3}", "bg-glass"
    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Corrigido:" $_.FullName
    }
  }
