# Estabilização 5⭐ (Runbook)

## Alertas
- 5xx > 1% (5 min) → SEV1
- p95 > 1200ms (5 min) → investigar
- aumento 30% erros/min → canário OFF

## Rollback
- vercel rollback

## Revalidate
- POST /api/revalidate { "tag": "posts" }

## Saúde
- GET /api/health → { ok:true, buildId, at }

## Flags
- GET /api/flags?bucket=control|canary

## Fluxo
1) Freeze (tag) → Deploy preview → QA
2) Deploy prod → Canário 10% (via cookie)
3) Monitor p95/erros → Escalar 25%→50%→100%
4) Deu ruim? rollback e desligar flag
