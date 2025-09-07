function Write-Log {
  param(
    [string]$Message,
    [string]$Level = "INFO",
    [string]$LogDir = "logs"
  )
  if(!(Test-Path $LogDir)){ New-Item -ItemType Directory -Path $LogDir | Out-Null }
  $stamp = Get-Date -Format "yyyy-MM-dd"
  $log = Join-Path $LogDir "preflight-$stamp.log"
  $line = "[{0}] [{1}] {2}" -f (Get-Date -Format "HH:mm:ss"), $Level, $Message
  $line | Tee-Object -FilePath $log -Append | Out-Null
  # rotação: mantém os últimos 14 dias
  Get-ChildItem $LogDir -Filter "preflight-*.log" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -Skip 14 |
    Remove-Item -ErrorAction SilentlyContinue
}
