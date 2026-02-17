param(
  [Parameter(Mandatory=$true)][string]$Operation,
  [Parameter(Mandatory=$true)][string]$Command,
  [string]$Slug = ""
)

$sw = [System.Diagnostics.Stopwatch]::StartNew()

try {
  iex $Command
  $exit = $LASTEXITCODE
  if ($null -eq $exit) { $exit = 0 }
} catch {
  $exit = 1
}

$sw.Stop()

$status = if ($exit -eq 0) { "success" } else { "error" }

$payload = @{
  operation   = $Operation
  status      = $status
  duration_ms = [int]$sw.ElapsedMilliseconds
  exit_code   = [int]$exit
}

if ($Slug -ne "") { $payload.slug = $Slug }

$json = ($payload | ConvertTo-Json -Compress)

node scripts-canônicos/observability/emit-log.mjs $json | Out-Null

if ($exit -ne 0) { exit $exit }
