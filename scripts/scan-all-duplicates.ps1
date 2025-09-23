Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\\[slug\\]" } |
  ForEach-Object {
    $lines = Get-Content $_.FullName
    foreach ($line in $lines) {
      if ($line -match 'className="([^"]+)"') {
        $classes = $matches[1] -split '\s+'
        if ($classes.Count -ne ($classes | Select-Object -Unique).Count) {
          Write-Host "Duplicado em $($_.FullName): $line"
        }
      }
    }
  }
