param(
  [Parameter(Mandatory)][string]$name,
  [Parameter(Mandatory)][bool]$enabled
)
$body = @{ name = $name; enabled = $enabled } | ConvertTo-Json
irm http://localhost:3010/api/flags -Method POST -ContentType 'application/json' -Body $body | ConvertTo-Json -Depth 5
