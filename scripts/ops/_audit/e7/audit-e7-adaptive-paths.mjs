/**
 * E7 — Gate: Validador formal + relatório
 * Entrada:
 *  - DSL E7: scripts/ops/_e7/fixture.e7.dsl.txt (ou futuro content/paths/e7.dsl.txt)
 *  - E6 State: public/_indices/e6-state.json (somente leitura)
 *
 * Saída:
 *  - _audit/E7/e7-gate.json
 *  - _audit/E7/e7-gate.txt
 *
 * Regras:
 *  - nada de UI
 *  - nada de mutação em E6
 *  - determinismo + hashes
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE7DSL } from "../../../core/e7/models.e7.mjs"

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

const dslFile = process.argv[2] || "scripts/ops/_e7/fixture.e7.dsl.txt"
const e6File  = process.argv[3] || "public/_indices/e6-state.json"
const outJson = process.argv[4] || "_audit/E7/e7-gate.json"
const outTxt  = process.argv[5] || "_audit/E7/e7-gate.txt"

const nowISO = new Date().toISOString()
/** @type {any[]} */ const issues = []

// read inputs
const dsl = fs.readFileSync(dslFile, "utf8")
let e6 = null
try {
  e6 = JSON.parse(fs.readFileSync(e6File, "utf8"))
} catch (e) {
  issues.push(issue("ERROR","E6_READ_FAIL","Falha ao ler/parsear o estado do E6", { e6File, error: String(e?.message || e) }))
}

// parse E7
const parsed = parseE7DSL(dsl, { nowISO })
if (!parsed.ok) {
  issues.push(issue("ERROR","E7_PARSE_FAIL","Falha no parse do DSL E7", parsed))
}

// se parse falhou, ainda gera relatório
let state = parsed.ok ? parsed.state : null

// -------------------------
// Invariantes formais (v1)
// -------------------------
if (state) {
  // I1: version
  if (state.version !== 1) issues.push(issue("ERROR","STATE_VERSION","state.version deve ser 1",{got:state.version}))

  // I2: arrays existem
  if (!Array.isArray(state.intents)) issues.push(issue("ERROR","STATE_INTENTS","state.intents deve ser array"))
  if (!Array.isArray(state.rules)) issues.push(issue("ERROR","STATE_RULES","state.rules deve ser array"))
  if (!Array.isArray(state.paths)) issues.push(issue("ERROR","STATE_PATHS","state.paths deve ser array"))

  // I3: intent IDs únicos
  const intentIds = state.intents.map(x => x.id)
  if (hasDuplicates(intentIds)) issues.push(issue("ERROR","INTENT_ID_DUP","IDs de intent duplicados",{dups:listDuplicates(intentIds)}))

  // I4: PATH.intent deve referenciar intent existente
  const intentSet = new Set(intentIds)
  for (const p of state.paths) {
    if (!intentSet.has(p.intent)) issues.push(issue("ERROR","PATH_INTENT_MISSING","PATH.intent não existe",{intent:p.intent}))
  }

  // I5: IDs de paths (por intent) únicos? (v1: no máximo 1 path por intent)
  const pathIntents = state.paths.map(p => p.intent)
  if (hasDuplicates(pathIntents)) issues.push(issue("ERROR","PATH_DUP_INTENT","Mais de um PATH para o mesmo intent (v1)",{dups:listDuplicates(pathIntents)}))

  // I6: RULE endpoints não podem ser vazios (já pelo parser) + auto-referência
  for (const r of state.rules) {
    if (r.from === r.to) issues.push(issue("WARN","RULE_SELF","RULE aponta para si mesma",{from:r.from,to:r.to,when:r.when}))
  }

  // I7: PATH.sequence mínimo e coerência: sequência deve ter >=2 (já parser) + sem passos vazios
  for (const p of state.paths) {
    if (!Array.isArray(p.sequence) || p.sequence.length < 2) issues.push(issue("ERROR","PATH_SEQ_MIN","PATH.sequence deve ter >=2",{intent:p.intent}))
    if (hasDuplicates(p.sequence)) issues.push(issue("WARN","PATH_SEQ_DUP","PATH.sequence contém elementos repetidos",{intent:p.intent, dups:listDuplicates(p.sequence)}))
  }

  // I8: Compatibilidade com E6 (somente leitura)
  // Regra v1: todo entryPoint e todo passo em PATH.sequence deve existir em universo E6:
  //  - node ids (E6 indices[].nodes) OU
  //  - index ids (E6 indices[].id)
  //  - map ids (E6 maps[].id) (permitido)
  if (e6) {
    const e6IndexIds = new Set((e6.indices || []).map(x => x.id))
    const e6MapIds = new Set((e6.maps || []).map(x => x.id))
    const e6Nodes = new Set()
    for (const idx of (e6.indices || [])) for (const n of (idx.nodes || [])) e6Nodes.add(n)

    function existsInE6(x) {
      return e6Nodes.has(x) || e6IndexIds.has(x) || e6MapIds.has(x)
    }

    for (const it of state.intents) {
      for (const ep of it.entryPoints) {
        if (!existsInE6(ep)) issues.push(issue("ERROR","ENTRYPOINT_NOT_IN_E6","ENTRYPOINT não existe no universo E6",{intent:it.id, entryPoint:ep}))
      }
    }

    for (const p of state.paths) {
      for (const step of p.sequence) {
        if (!existsInE6(step)) issues.push(issue("ERROR","PATH_STEP_NOT_IN_E6","Passo do PATH não existe no universo E6",{intent:p.intent, step}))
      }
    }
  }

  // I9: determinismo via hashes
  const stateHash = sha256(JSON.stringify(state))
  const dslHash = sha256(dsl)

  const errors = issues.filter(x => x.level === "ERROR").length
  const warns  = issues.filter(x => x.level === "WARN").length

  const report = {
    gate: "E7_ADAPTIVE_PATHS",
    version: 1,
    dslFile,
    e6File,
    generatedAtISO: nowISO,
    ok: errors === 0,
    counts: { errors, warns, total: issues.length },
    hashes: {
      dsl_sha256: dslHash,
      e7_state_sha256: stateHash,
      e6_state_sha256: e6 ? sha256(JSON.stringify(e6)) : null,
    },
    summary: errors === 0 ? "PASS" : "FAIL",
    issues,
  }

  fs.mkdirSync(path.dirname(outJson), { recursive: true })
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8")

  const lines = []
  lines.push(`E7 GATE — ${report.summary}`)
  lines.push(`Gate: ${report.gate} v${report.version}`)
  lines.push(`DSL: ${dslFile}`)
  lines.push(`E6 : ${e6File}`)
  lines.push(`GeneratedAt: ${nowISO}`)
  lines.push(`Errors: ${errors} | Warns: ${warns} | Total: ${issues.length}`)
  lines.push(`DSL sha256: ${report.hashes.dsl_sha256}`)
  lines.push(`E7  sha256: ${report.hashes.e7_state_sha256}`)
  lines.push(`E6  sha256: ${report.hashes.e6_state_sha256 ?? "null"}`)
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

  console.log("E7 GATE COMPLETE")
  console.log("Report:", outJson)
  console.log("Text:", outTxt)
  process.exit(report.ok ? 0 : 2)
}

// caso sem state (parse falhou)
const errors = issues.filter(x => x.level === "ERROR").length
const warns  = issues.filter(x => x.level === "WARN").length

const failReport = {
  gate: "E7_ADAPTIVE_PATHS",
  version: 1,
  dslFile,
  e6File,
  generatedAtISO: nowISO,
  ok: false,
  counts: { errors, warns, total: issues.length },
  hashes: { dsl_sha256: sha256(dsl) },
  summary: "FAIL",
  issues,
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(failReport, null, 2), "utf8")
fs.writeFileSync(outTxt, "E7 GATE — FAIL\nNo state.\nSee JSON.\n", "utf8")

console.log("E7 GATE COMPLETE")
console.log("Report:", outJson)
console.log("Text:", outTxt)
process.exit(2)