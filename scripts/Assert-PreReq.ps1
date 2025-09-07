param()

function Assert-Tool($name){
  $cmd = Get-Command $name -ErrorAction SilentlyContinue
  if(-not $cmd){ throw "$name não encontrado no PATH" }
}

function Test-PortFree($port){
  try {
    $inUse = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop
    return $false
  } catch { return $true }
}

function Get-EnvRefs(){
  $patterns = @("*.ts","*.tsx","*.js")
  $refs = Select-String -Path $patterns -Pattern 'process\.env\.[A-Z0-9_]+' -AllMatches -ErrorAction SilentlyContinue
  $out = @()
  foreach($r in $refs){ $r.Matches | % { $out += $_.Value.Split('.')[-1] } }
  return $out | Sort-Object -Unique
}