Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\[.*\]" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    $newContent = $content `
      -replace "(text-white\s+){2,}", "text-white " `
      -replace "(hover:bg-emerald-700\s+){2,}", "hover:bg-emerald-700 " `
      -replace "bg-white\s+dark:bg-black\s+text-white", "bg-emerald-800 text-white" `
      -replace "bg-white\s+dark:bg-black\s+text-black", "bg-emerald-800 text-black"

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Normalizado:" $_.FullName
    }
  }
