Select-String -Path "app/**/*.tsx" -Pattern "text-" | ForEach-Object { $_.Line }
