Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  ForEach-Object {
    $lines = Get-Content $_.FullName
    foreach ($line in $lines) {
      if ($line -match "(text-white\s+){2,}" -or
          $line -match "(hover:bg-[a-zA-Z0-9-]+\s+){2,}" -or
          $line -match "(bg-[a-zA-Z0-9-]+\s+){2,}") {
        Write-Host "Duplicado em $($_.FullName): $line"
      }
    }
  }
