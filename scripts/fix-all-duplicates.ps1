Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.FullName -notmatch "\[.*\]" } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Procura atributos className
    $newContent = $content -replace 'className="([^"]+)"', {
      $classes = $matches[1] -split '\s+'
      $unique = $classes | Select-Object -Unique
      'className="' + ($unique -join ' ') + '"'
    }

    if ($newContent -ne $content) {
      $newContent | Out-File -FilePath $_.FullName -Encoding utf8
      Write-Host "Deduplicado em:" $_.FullName
    }
  }
