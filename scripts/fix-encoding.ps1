Get-ChildItem -Recurse -Path app -Filter *.tsx -File | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw -Encoding byte
  $utf8 = [System.Text.Encoding]::UTF8.GetString($raw)
  $utf8 | Out-File -FilePath $_.FullName -Encoding utf8
  Write-Host "Normalizado encoding em:" $_.FullName
}
