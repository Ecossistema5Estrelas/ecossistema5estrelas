Get-ChildItem -Recurse -Path app -Filter *.tsx -File |
  Where-Object { $_.DirectoryName -notmatch "\[.*\]" } |
  ForEach-Object {
    try {
      $content = Get-Content $_.FullName -Raw

      $newContent = $content `
        -replace 'bg-glass', 'bg-white dark:bg-neutral-900' `
        -replace 'bg-gradient-to-[^"'' ]+', 'bg-white dark:bg-neutral-900' `
        -replace 'from-[^"'' ]+ via-[^"'' ]+ to-[^"'' ]+', ''

      if ($newContent -ne $content) {
        $newContent | Out-File -FilePath $_.FullName -Encoding utf8
        Write-Host "Corrigido card em:" $_.FullName
      }
    }
    catch {
      Write-Warning "Ignorado: $($_.FullName)"
    }
  }
