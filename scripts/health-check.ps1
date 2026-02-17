Start-Sleep -Seconds 4

$urls = @(
  "http://localhost:3000",
  "http://localhost:3000/sitemap.xml",
  "http://localhost:3000/robots.txt"
)

foreach ($url in $urls) {
  try {
    $res = Invoke-WebRequest $url -UseBasicParsing
    Write-Host "OK: $url -> $($res.StatusCode)"
  } catch {
    Write-Host "FAIL: $url"
  }
}
