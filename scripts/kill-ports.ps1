$ports = @(3000,3001,9229)

foreach ($port in $ports) {
  $pids = netstat -ano | Select-String ":$port" | ForEach-Object {
    ($_ -split "\s+")[-1]
  }

  foreach ($pid in $pids) {
    if ($pid -ne "0") {
      try {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "Killed PID $pid on port $port"
      } catch {}
    }
  }
}
