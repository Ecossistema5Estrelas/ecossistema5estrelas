/**
 * E8 — Gate: Validador formal + relatório
 * Entrada:
 *  - DSL E8: scripts/ops/_e8/fixture.e8.dsl.txt (ou futuro content/memory/e8.dsl.txt)
 *  - E6 State: public/_indices/e6-state.json (somente leitura)
 *  - E7 State: public/_paths/e7-state.json (somente leitura)
 *
 * Saída:
 *  - _audit/E8/e8-gate.json
 *  - _audit/E8/e8-gate.txt
 *
 * Regras:
 *  - nada de UI
 *  - nada de mutação em E6/E7
 *  - determinismo + hashes
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE8DSL } from "../../../core/e8/models.e8.mjs"

function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex")
}

function hasDuplicates(a) {
  const set = new Set()
  for (const x of a) { if (set.has(x)) return true; set.add(x) }
  return false
}

function listDuplicates(a) {
  const seen = new Set()
  const d = new Set()
  for (const x of a) { if (seen.has(x)) d.add(x); seen.add(x) }
  return [...d].sort()
}

function issue(level, code, msg, meta) {
  return { level, code, msg, meta: meta ?? null }
}

function toMs(iso) {
  const t = Date.parse(iso)
  return Number.isFinite(t) ? t : NaN
}

const dslFile = process.argv[2] || "scripts/ops/_e8/fixture.e8.dsl.txt"
const e6File  = process.argv[3] || "public/_indices/e6-state.json"
const e7File  = process.argv[4] || "public/_paths/e7-state.json"
const outJson = process.argv[5] || "_audit/E8/e8-gate.json"
const outTxt  = process.argv[6] || "_audit/E8/e8-gate.txt"

const nowISO = new Date().toISOString()
/** @type {any[]} */ const issues = []

// read inputs
const dsl = fs.readFileSync(dslFile, "utf8")

let e6 = null
try { e6 = JSON.parse(fs.readFileSync(e6File, "utf8")) }
catch (e) { issues.push(issue("ERROR","E6_READ_FAIL","Falha ao ler/parsear o estado do E6", { e6File, error: String(e?.message || e) })) }

let e7 = null
try { e7 = JSON.parse(fs.readFileSync(e7File, "utf8")) }
catch (e) { issues.push(issue("ERROR","E7_READ_FAIL","Falha ao ler/parsear o estado do E7", { e7File, error: String(e?.message || e) })) }

// parse E8
const parsed = parseE8DSL(dsl, { nowISO })
if (!parsed.ok) issues.push(issue("ERROR","E8_PARSE_FAIL","Falha no parse do DSL E8", parsed))

const state = parsed.ok ? parsed.state : null

// -------------------------
// Invariantes formais (v1)
// -------------------------
if (state) {
  // I1: version
  if (state.version !== 1) issues.push(issue("ERROR","STATE_VERSION","state.version deve ser 1",{got:state.version}))

  // I2: arrays existem
  if (!Array.isArray(state.sessions)) issues.push(issue("ERROR","STATE_SESSIONS","state.sessions deve ser array"))
  if (!Array.isArray(state.checkpoints)) issues.push(issue("ERROR","STATE_CHECKPOINTS","state.checkpoints deve ser array"))
  if (!Array.isArray(state.continuities)) issues.push(issue("ERROR","STATE_CONTINUITIES","state.continuities deve ser array"))

  // I3: session IDs únicos
  const sessionIds = state.sessions.map(s => s.id)
  if (hasDuplicates(sessionIds)) issues.push(issue("ERROR","SESSION_ID_DUP","IDs de session duplicados",{dups:listDuplicates(sessionIds)}))
  const sessionSet = new Set(sessionIds)

  // I4: sessionId referencial (checkpoints/continuities)
  for (const c of state.checkpoints) {
    if (!sessionSet.has(c.sessionId)) issues.push(issue("ERROR","CHECKPOINT_SESSION_MISSING","Checkpoint referencia session inexistente",{sessionId:c.sessionId, node:c.node}))
  }
  for (const l of state.continuities) {
    if (!sessionSet.has(l.sessionId)) issues.push(issue("ERROR","CONTINUITY_SESSION_MISSING","Continuity referencia session inexistente",{sessionId:l.sessionId}))
  }

  // I5: 1 continuity por session (v1)
  const contIds = state.continuities.map(x => x.sessionId)
  if (hasDuplicates(contIds)) issues.push(issue("ERROR","CONTINUITY_DUP_SESSION","Mais de uma continuity por session (v1)",{dups:listDuplicates(contIds)}))

  // I6: coerência temporal session (started <= lastSeen)
  for (const s of state.sessions) {
    const a = toMs(s.startedAtISO)
    const b = toMs(s.lastSeenAtISO)
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      issues.push(issue("ERROR","SESSION_TIME_PARSE","Falha parse tempo ISO em session",{id:s.id, startedAtISO:s.startedAtISO, lastSeenAtISO:s.lastSeenAtISO}))
    } else if (a > b) {
      issues.push(issue("ERROR","SESSION_TIME_ORDER","startedAtISO > lastSeenAtISO",{id:s.id, startedAtISO:s.startedAtISO, lastSeenAtISO:s.lastSeenAtISO}))
    }
  }

  // I7: checkpoints devem estar dentro do intervalo [started, lastSeen] (WARN se fora)
  const sessById = new Map(state.sessions.map(s => [s.id, s]))
  for (const c of state.checkpoints) {
    const s = sessById.get(c.sessionId)
    if (!s) continue
    const t = toMs(c.timestampISO)
    const a = toMs(s.startedAtISO)
    const b = toMs(s.lastSeenAtISO)
    if (Number.isFinite(t) && Number.isFinite(a) && Number.isFinite(b)) {
      if (t < a || t > b) issues.push(issue("WARN","CHECKPOINT_OUTSIDE_SESSION","Checkpoint fora da janela da sessão",{sessionId:c.sessionId, node:c.node, timestampISO:c.timestampISO}))
    }
  }

  // I8: compatibilidade com E7 (intent deve existir)
  if (e7) {
    const intentSet = new Set((e7.intents || []).map(x => x.id))
    for (const s of state.sessions) {
      if (!intentSet.has(s.intent)) issues.push(issue("ERROR","SESSION_INTENT_NOT_IN_E7","Session.intent não existe no E7",{sessionId:s.id, intent:s.intent}))
    }
  }

  // I9: universo de nós permitidos (E6 + E7)
  // Regra v1: node (checkpoints.node) e continuity.path steps devem existir em:
  //  - E6 nodes OR E6 indexIds OR E6 mapIds
  //  - E7 intentIds OR E7 path steps
  // Para E7 path steps: como E7 já valida contra E6, é redundante, mas aceitamos para coerência.
  const allowed = new Set()

  if (e6) {
    for (const idx of (e6.indices || [])) {
      allowed.add(idx.id)
      for (const n of (idx.nodes || [])) allowed.add(n)
    }
    for (const m of (e6.maps || [])) allowed.add(m.id)
  }

  if (e7) {
    for (const it of (e7.intents || [])) allowed.add(it.id)
    for (const p of (e7.paths || [])) for (const step of (p.sequence || [])) allowed.add(step)
  }

  function existsAllowed(x) { return allowed.has(x) }

  for (const c of state.checkpoints) {
    if (!existsAllowed(c.node)) issues.push(issue("ERROR","CHECKPOINT_NODE_UNKNOWN","Checkpoint.node não existe no universo permitido",{sessionId:c.sessionId, node:c.node}))
  }

  for (const l of state.continuities) {
    for (const step of (l.path || [])) {
      if (!existsAllowed(step)) issues.push(issue("ERROR","CONTINUITY_STEP_UNKNOWN","Continuity.path step não existe no universo permitido",{sessionId:l.sessionId, step}))
    }
    // repetição (WARN)
    if (hasDuplicates(l.path)) issues.push(issue("WARN","CONTINUITY_DUP_STEP","Continuity.path contém passos repetidos",{sessionId:l.sessionId, dups:listDuplicates(l.path)}))
  }

  // I10: determinismo via hashes
  const stateHash = sha256(JSON.stringify(state))
  const dslHash = sha256(dsl)

  const errors = issues.filter(x => x.level === "ERROR").length
  const warns  = issues.filter(x => x.level === "WARN").length

  const report = {
    gate: "E8_CONTINUITY_MEMORY",
    version: 1,
    dslFile,
    e6File,
    e7File,
    generatedAtISO: nowISO,
    ok: errors === 0,
    counts: { errors, warns, total: issues.length },
    hashes: {
      dsl_sha256: dslHash,
      e8_state_sha256: stateHash,
      e6_state_sha256: e6 ? sha256(JSON.stringify(e6)) : null,
      e7_state_sha256: e7 ? sha256(JSON.stringify(e7)) : null,
    },
    summary: errors === 0 ? "PASS" : "FAIL",
    issues,
  }

  fs.mkdirSync(path.dirname(outJson), { recursive: true })
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8")

  const lines = []
  lines.push(`E8 GATE — ${report.summary}`)
  lines.push(`Gate: ${report.gate} v${report.version}`)
  lines.push(`DSL: ${dslFile}`)
  lines.push(`E6 : ${e6File}`)
  lines.push(`E7 : ${e7File}`)
  lines.push(`GeneratedAt: ${nowISO}`)
  lines.push(`Errors: ${errors} | Warns: ${warns} | Total: ${issues.length}`)
  lines.push(`DSL sha256: ${report.hashes.dsl_sha256}`)
  lines.push(`E8  sha256: ${report.hashes.e8_state_sha256}`)
  lines.push(`E6  sha256: ${report.hashes.e6_state_sha256 ?? "null"}`)
  lines.push(`E7  sha256: ${report.hashes.e7_state_sha256 ?? "null"}`)
  lines.push("")
  if (!issues.length) {
    lines.push("No issues. ✅")
  } else {
    for (const it of issues) {
      lines.push(`[${it.level}] ${it.code} — ${it.msg}`)
      if (it.meta) lines.push(`  meta: ${JSON.stringify(it.meta)}`)
    }
  }
  fs.writeFileSync(outTxt, lines.join("\n"), "utf8")

  console.log("E8 GATE COMPLETE")
  console.log("Report:", outJson)
  console.log("Text:", outTxt)
  process.exit(report.ok ? 0 : 2)
}

// caso sem state (parse falhou)
const errors = issues.filter(x => x.level === "ERROR").length
const warns  = issues.filter(x => x.level === "WARN").length

const failReport = {
  gate: "E8_CONTINUITY_MEMORY",
  version: 1,
  dslFile,
  e6File,
  e7File,
  generatedAtISO: nowISO,
  ok: false,
  counts: { errors, warns, total: issues.length },
  hashes: { dsl_sha256: sha256(dsl) },
  summary: "FAIL",
  issues,
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(failReport, null, 2), "utf8")
fs.writeFileSync(outTxt, "E8 GATE — FAIL\nNo state.\nSee JSON.\n", "utf8")

console.log("E8 GATE COMPLETE")
console.log("Report:", outJson)
console.log("Text:", outTxt)
process.exit(2)