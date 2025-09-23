Select-String -Path "app/**/*.tsx" -Pattern "bg-" | ForEach-Object { $_.Line }
