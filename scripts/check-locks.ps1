$path = ".next"

try {
  $testFile = Join-Path $path "lock-test.tmp"
  New-Item -ItemType File -Path $testFile -Force | Out-Null
  Remove-Item $testFile -Force
  Write-Host "OK: No lock detected in .next"
} catch {
  Write-Host "LOCK DETECTED in .next"
}
