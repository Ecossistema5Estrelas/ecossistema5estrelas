Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [Parameter(Mandatory=$true)][bool]$Condition,
  [Parameter(Mandatory=$true)][string]$Message
)

if (-not $Condition) {
  throw $Message
}