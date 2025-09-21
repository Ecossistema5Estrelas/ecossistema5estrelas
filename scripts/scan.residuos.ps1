#Requires -Version 7
$ErrorActionPreference = "Stop"
$ext = @('*.tsx','*.ts','*.css','*.scss','*.md','*.json')
$files = Get-ChildItem -Recurse -File -Include $ext |
  Where-Object { $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)(\\|$)' }

Write-Host "--- BUSCA: 'disco voador' ---"
$files | Select-String -Pattern 'disco\s*voador' -SimpleMatch |
  Select-Object Path,LineNumber,Line

Write-Host "--- BUSCA: dourados/gold ---"
$files | Select-String -Pattern '#d4af37|#daa520|#ffd700|#c9b037|#b8860b|goldenrod(?!-)|\bgold\b' |
  Select-Object Path,LineNumber,Line
