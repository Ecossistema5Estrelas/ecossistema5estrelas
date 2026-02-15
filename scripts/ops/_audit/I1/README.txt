I1 Audit Package (read-only)

Run:
  node scripts/ops/_audit/I1/run-i1-audit.mjs

Optional scan (PowerShell):
  powershell -ExecutionPolicy Bypass -File scripts/ops/_audit/I1/scan-proibidos.ps1

Outputs:
  _audit/I1/<timestamp>/
    - routes.map.json|txt
    - contracts.consumption.json|txt
    - states.detect.json|txt
    - paths.detect.json|txt
    - gate-i1.json|txt