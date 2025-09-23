Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\[.*\]" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    $newContent = $content `
      -replace "(hover:bg-emerald-600\s+hover:bg-emerald-700\s+text-white\s+){2,}", "hover:bg-emerald-600 hover:bg-emerald-700 text-white " `
      -replace "(hover:bg-emerald-700\s+){2,}", "hover:bg-emerald-700 " `
      -replace "(text-white\s+){2,}", "text-white " `
      -replace "(bg-emerald-600\s+hover:bg-emerald-700\s+text-white\s+){2,}", "bg-emerald-600 hover:bg-emerald-700 text-white "

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Duplicatas corrigidas em:" $_.FullName
    }
  }
