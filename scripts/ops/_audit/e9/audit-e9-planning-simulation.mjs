/**
 * E9 — Gate: Validador formal + relatório
 * Entrada:
 *  - DSL E9: scripts/ops/_e9/fixture.e9.dsl.txt (ou futuro content/plans/e9.dsl.txt)
 *  - E6 State: public/_indices/e6-state.json (somente leitura)
 *  - E7 State: public/_paths/e7-state.json (somente leitura)
 *  - E8 State: public/_memory/e8-state.json (somente leitura)
 *
 * Saída:
 *  - _audit/E9/e9-gate.json
 *  - _audit/E9/e9-gate.txt
 *
 * Regras:
 *  - nada de UI
 *  - nada de mutação em E6/E7/E8
 *  - determinismo + hashes
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE9DSL } from "../../../core/e9/models.e9.mjs"

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

const dslFile = process.argv[2] || "scripts/ops/_e9/fixture.e9.dsl.txt"
const e6File  = process.argv[3] || "public/_indices/e6-state.json"
const e7File  = process.argv[4] || "public/_paths/e7-state.json"
const e8File  = process.argv[5] || "public/_memory/e8-state.json"
const outJson = process.argv[6] || "_audit/E9/e9-gate.json"
const outTxt  = process.argv[7] || "_audit/E9/e9-gate.txt"

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

let e8 = null
try { e8 = JSON.parse(fs.readFileSync(e8File, "utf8")) }
catch (e) { issues.push(issue("ERROR","E8_READ_FAIL","Falha ao ler/parsear o estado do E8", { e8File, error: String(e?.message || e) })) }

// parse E9
const parsed = parseE9DSL(dsl, { nowISO })
if (!parsed.ok) issues.push(issue("ERROR","E9_PARSE_FAIL","Falha no parse do DSL E9", parsed))

const state = parsed.ok ? parsed.state : null

// -------------------------
// Invariantes formais (v1)
// -------------------------
if (state) {
  // I1: version
  if (state.version !== 1) issues.push(issue("ERROR","STATE_VERSION","state.version deve ser 1",{got:state.version}))

  // I2: arrays existem
  if (!Array.isArray(state.futures)) issues.push(issue("ERROR","STATE_FUTURES","state.futures deve ser array"))
  if (!Array.isArray(state.plans)) issues.push(issue("ERROR","STATE_PLANS","state.plans deve ser array"))
  if (!Array.isArray(state.simulations)) issues.push(issue("ERROR","STATE_SIMS","state.simulations deve ser array"))

  // I3: plan IDs únicos
  const planIds = state.plans.map(p => p.id)
  if (hasDuplicates(planIds)) issues.push(issue("ERROR","PLAN_ID_DUP","IDs de plan duplicados",{dups:listDuplicates(planIds)}))
  const planSet = new Set(planIds)

  // I4: sim.planId deve existir
  for (const s of state.simulations) {
    if (!planSet.has(s.planId)) issues.push(issue("ERROR","SIM_PLAN_MISSING","SIM referencia plan inexistente",{planId:s.planId}))
  }

  // I5: FUTURE.from deve existir no universo permitido
  // Universo permitido = E6 nodes/index/map + E7 intents + E7 path steps + E8 sessions + E8 checkpoints.node + E8 continuities.path steps
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

  if (e8) {
    for (const s of (e8.sessions || [])) allowed.add(s.id) // sessão como nó permitido (para "de onde")
    for (const c of (e8.checkpoints || [])) allowed.add(c.node)
    for (const l of (e8.continuities || [])) for (const step of (l.path || [])) allowed.add(step)
  }

  function existsAllowed(x) { return allowed.has(x) }

  for (const f of state.futures) {
    if (!existsAllowed(f.from)) issues.push(issue("ERROR","FUTURE_FROM_UNKNOWN","FUTURE.from não existe no universo permitido",{from:f.from}))
    if (hasDuplicates(f.options)) issues.push(issue("WARN","FUTURE_OPT_DUP","FUTURE.options contém duplicatas",{from:f.from, dups:listDuplicates(f.options)}))
    for (const opt of f.options) {
      if (!existsAllowed(opt)) issues.push(issue("ERROR","FUTURE_OPT_UNKNOWN","FUTURE.options contém item fora do universo permitido",{from:f.from, option:opt}))
    }
  }

  // I6: PLAN.steps devem existir no universo permitido (e sequência >=2 já pelo parser)
  for (const p of state.plans) {
    if (hasDuplicates(p.steps)) issues.push(issue("WARN","PLAN_STEPS_DUP","PLAN.steps contém passos repetidos",{id:p.id, dups:listDuplicates(p.steps)}))
    for (const step of p.steps) {
      if (!existsAllowed(step)) issues.push(issue("ERROR","PLAN_STEP_UNKNOWN","PLAN.step fora do universo permitido",{id:p.id, step}))
    }
  }

  // I7: SIM outcomes duplicados (WARN)
  for (const s of state.simulations) {
    if (hasDuplicates(s.outcomes)) issues.push(issue("WARN","SIM_OUT_DUP","SIM.outcomes contém duplicatas",{planId:s.planId, dups:listDuplicates(s.outcomes)}))
  }

  // I8: determinismo via hashes
  const stateHash = sha256(JSON.stringify(state))
  const dslHash = sha256(dsl)

  const errors = issues.filter(x => x.level === "ERROR").length
  const warns  = issues.filter(x => x.level === "WARN").length

  const report = {
    gate: "E9_PLANNING_SIMULATION",
    version: 1,
    dslFile,
    e6File,
    e7File,
    e8File,
    generatedAtISO: nowISO,
    ok: errors === 0,
    counts: { errors, warns, total: issues.length },
    hashes: {
      dsl_sha256: dslHash,
      e9_state_sha256: stateHash,
      e6_state_sha256: e6 ? sha256(JSON.stringify(e6)) : null,
      e7_state_sha256: e7 ? sha256(JSON.stringify(e7)) : null,
      e8_state_sha256: e8 ? sha256(JSON.stringify(e8)) : null,
    },
    summary: errors === 0 ? "PASS" : "FAIL",
    issues,
  }

  fs.mkdirSync(path.dirname(outJson), { recursive: true })
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8")

  const lines = []
  lines.push(`E9 GATE — ${report.summary}`)
  lines.push(`Gate: ${report.gate} v${report.version}`)
  lines.push(`DSL: ${dslFile}`)
  lines.push(`E6 : ${e6File}`)
  lines.push(`E7 : ${e7File}`)
  lines.push(`E8 : ${e8File}`)
  lines.push(`GeneratedAt: ${nowISO}`)
  lines.push(`Errors: ${errors} | Warns: ${warns} | Total: ${issues.length}`)
  lines.push(`DSL sha256: ${report.hashes.dsl_sha256}`)
  lines.push(`E9  sha256: ${report.hashes.e9_state_sha256}`)
  lines.push(`E6  sha256: ${report.hashes.e6_state_sha256 ?? "null"}`)
  lines.push(`E7  sha256: ${report.hashes.e7_state_sha256 ?? "null"}`)
  lines.push(`E8  sha256: ${report.hashes.e8_state_sha256 ?? "null"}`)
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

  console.log("E9 GATE COMPLETE")
  console.log("Report:", outJson)
  console.log("Text:", outTxt)
  process.exit(report.ok ? 0 : 2)
}

// caso sem state (parse falhou)
const errors = issues.filter(x => x.level === "ERROR").length
const warns  = issues.filter(x => x.level === "WARN").length

const failReport = {
  gate: "E9_PLANNING_SIMULATION",
  version: 1,
  dslFile,
  e6File,
  e7File,
  e8File,
  generatedAtISO: nowISO,
  ok: false,
  counts: { errors, warns, total: issues.length },
  hashes: { dsl_sha256: sha256(dsl) },
  summary: "FAIL",
  issues,
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(failReport, null, 2), "utf8")
fs.writeFileSync(outTxt, "E9 GATE — FAIL\nNo state.\nSee JSON.\n", "utf8")

console.log("E9 GATE COMPLETE")
console.log("Report:", outJson)
console.log("Text:", outTxt)
process.exit(2)