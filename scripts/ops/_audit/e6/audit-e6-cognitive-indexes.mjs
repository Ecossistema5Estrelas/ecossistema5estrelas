/**
 * E6 — Gate: Validador formal + relatório
 * Regra: lê fixture/DSL, usa o parser puro, valida invariantes e emite:
 *  - JSON: _audit/E6/e6-gate.json
 *  - TXT : _audit/E6/e6-gate.txt
 *
 * Nada de UI, nada de side effects fora do _audit.
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE6DSL } from "../../../core/e6/models.e6.mjs"

/** @param {string} s */
function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex")
}

/** @param {string[]} a */
function hasDuplicates(a) {
  const set = new Set()
  for (const x of a) {
    if (set.has(x)) return true
    set.add(x)
  }
  return false
}

/** @param {string[]} a */
function listDuplicates(a) {
  const seen = new Set()
  const d = new Set()
  for (const x of a) {
    if (seen.has(x)) d.add(x)
    seen.add(x)
  }
  return [...d].sort()
}

/**
 * Detecta ciclos no grafo de paths (direcionado).
 * @param {{from:string,to:string}[]} edges
 */
function findCycles(edges) {
  const adj = new Map()
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, [])
    adj.get(e.from).push(e.to)
  }

  const visiting = new Set()
  const visited = new Set()
  /** @type {string[][]} */
  const cycles = []

  function dfs(node, stack) {
    if (visiting.has(node)) {
      const idx = stack.indexOf(node)
      if (idx >= 0) cycles.push(stack.slice(idx).concat(node))
      return
    }
    if (visited.has(node)) return

    visiting.add(node)
    stack.push(node)

    const nexts = adj.get(node) || []
    for (const n of nexts) dfs(n, stack)

    stack.pop()
    visiting.delete(node)
    visited.add(node)
  }

  for (const k of adj.keys()) dfs(k, [])

  // normaliza ciclos para estabilidade (string join)
  const normalized = cycles
    .map(c => c.join("->"))
    .sort()

  return normalized
}

/**
 * @param {string} level
 * @param {string} code
 * @param {string} msg
 * @param {any} [meta]
 */
function issue(level, code, msg, meta) {
  return { level, code, msg, meta: meta ?? null }
}

const fixture = process.argv[2] || "scripts/ops/_e6/fixture.e6.dsl.txt"
const outJson = process.argv[3] || "_audit/E6/e6-gate.json"
const outTxt  = process.argv[4] || "_audit/E6/e6-gate.txt"

const dsl = fs.readFileSync(fixture, "utf8")
const nowISO = new Date().toISOString()

const parse = parseE6DSL(dsl, { nowISO })
/** @type {any[]} */
const issues = []

if (!parse.ok) {
  issues.push(issue("ERROR", "E6_PARSE_FAIL", "Falha no parse do DSL", parse))
} else {
  const state = parse.state

  // -------------------------
  // Invariantes formais (v1)
  // -------------------------

  // I1: version
  if (state.version !== 1) issues.push(issue("ERROR","STATE_VERSION","state.version deve ser 1",{got:state.version}))

  // I2: arrays existem
  if (!Array.isArray(state.indices)) issues.push(issue("ERROR","STATE_INDICES","state.indices deve ser array"))
  if (!Array.isArray(state.maps)) issues.push(issue("ERROR","STATE_MAPS","state.maps deve ser array"))

  // I3: IDs únicos de índices
  const indexIds = state.indices.map(x => x.id)
  if (hasDuplicates(indexIds)) issues.push(issue("ERROR","INDEX_ID_DUP","IDs de índice duplicados",{dups:listDuplicates(indexIds)}))

  // I4: IDs únicos de mapas
  const mapIds = state.maps.map(x => x.id)
  if (hasDuplicates(mapIds)) issues.push(issue("ERROR","MAP_ID_DUP","IDs de mapa duplicados",{dups:listDuplicates(mapIds)}))

  // I5: nodes não vazios já garantido pelo parser; aqui reforça cardinalidade mínima
  for (const idx of state.indices) {
    if (!idx.nodes || idx.nodes.length < 1) issues.push(issue("ERROR","INDEX_NODES_MIN","Índice precisa ter >=1 node",{id:idx.id}))
  }

  // I6: Map.indices referenciam índices existentes
  const indexSet = new Set(indexIds)
  for (const m of state.maps) {
    const missing = (m.indices || []).filter(id => !indexSet.has(id))
    if (missing.length) issues.push(issue("ERROR","MAP_INDEX_REF_MISSING","Mapa referencia índice inexistente",{mapId:m.id, missing}))
  }

  // I7: Paths referenciam nós existentes (node ids) OU índices existentes?
  // Regra v1 (determinística): from/to devem existir em union(nodes de todos índices) OU em indexIds.
  const nodeUniverse = new Set()
  for (const idx of state.indices) for (const n of idx.nodes) nodeUniverse.add(n)

  function existsEndpoint(x) {
    return nodeUniverse.has(x) || indexSet.has(x)
  }

  for (const m of state.maps) {
    for (const p of (m.paths || [])) {
      if (!existsEndpoint(p.from)) issues.push(issue("ERROR","PATH_FROM_MISSING","PATH.from não existe em nodes nem em indices",{mapId:m.id, from:p.from}))
      if (!existsEndpoint(p.to)) issues.push(issue("ERROR","PATH_TO_MISSING","PATH.to não existe em nodes nem em indices",{mapId:m.id, to:p.to}))
      if (p.from === p.to) issues.push(issue("WARN","PATH_SELF","PATH aponta para si mesmo",{mapId:m.id, id:m.id, from:p.from}))
    }
  }

  // I8: ciclos (v1) — permitido? por padrão: WARN (não bloqueia) para evitar travar trilhas.
  // Se quiser tornar ERROR depois, muda aqui.
  for (const m of state.maps) {
    const edges = (m.paths || []).map(p => ({ from: p.from, to: p.to }))
    const cycles = findCycles(edges)
    if (cycles.length) issues.push(issue("WARN","PATH_CYCLES","Ciclos detectados no grafo de paths",{mapId:m.id, cycles}))
  }

  // I9: determinismo do output (hash do state json)
  const stateJson = JSON.stringify(state)
  const hash = sha256(stateJson)

  // Score
  const errors = issues.filter(x => x.level === "ERROR").length
  const warns  = issues.filter(x => x.level === "WARN").length

  // Report
  const report = {
    gate: "E6_COGNITIVE_INDEXES",
    version: 1,
    fixture,
    generatedAtISO: nowISO,
    ok: errors === 0,
    counts: { errors, warns, total: issues.length },
    hashes: { dsl_sha256: sha256(dsl), state_sha256: hash },
    summary: errors === 0 ? "PASS" : "FAIL",
    issues,
  }

  fs.mkdirSync(path.dirname(outJson), { recursive: true })
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8")

  // TXT
  const lines = []
  lines.push(`E6 GATE — ${report.summary}`)
  lines.push(`Gate: ${report.gate} v${report.version}`)
  lines.push(`Fixture: ${fixture}`)
  lines.push(`GeneratedAt: ${nowISO}`)
  lines.push(`Errors: ${errors} | Warns: ${warns} | Total: ${issues.length}`)
  lines.push(`DSL sha256: ${report.hashes.dsl_sha256}`)
  lines.push(`State sha256: ${report.hashes.state_sha256}`)
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

  console.log("E6 GATE COMPLETE")
  console.log("Report:", outJson)
  console.log("Text:", outTxt)
  process.exit(report.ok ? 0 : 2)
}

const failReport = {
  gate: "E6_COGNITIVE_INDEXES",
  version: 1,
  fixture,
  generatedAtISO: nowISO,
  ok: false,
  counts: { errors: 1, warns: 0, total: 1 },
  hashes: { dsl_sha256: sha256(dsl) },
  summary: "FAIL",
  issues,
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(failReport, null, 2), "utf8")
fs.writeFileSync(outTxt, "E6 GATE — FAIL\nParse failed. See JSON.\n", "utf8")

console.log("E6 GATE COMPLETE")
console.log("Report:", outJson)
console.log("Text:", outTxt)
process.exit(2)