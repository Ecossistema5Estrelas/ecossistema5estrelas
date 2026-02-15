/**
 * E7 — Sistema de Percursos Adaptativos
 * Núcleo puro: modelos + validações mínimas + parser DSL v1 + normalização (sem IO).
 * Regra: determinístico, serializável, sem dependências externas.
 *
 * O E7 NÃO lê E6 aqui. Quem lê E6 é o runner/gate/build.
 */

/**
 * @typedef {Object} CognitiveIntent
 * @property {string} id
 * @property {string} description
 * @property {string[]} entryPoints
 */

/**
 * @typedef {Object} ProgressionRule
 * @property {string} from
 * @property {string} to
 * @property {string} when
 * @property {string} rationale
 */

/**
 * @typedef {Object} AdaptivePath
 * @property {string} intent
 * @property {string[]} sequence
 * @property {string} explanation
 */

/**
 * @typedef {Object} E7State
 * @property {number} version
 * @property {string} generatedAtISO
 * @property {CognitiveIntent[]} intents
 * @property {ProgressionRule[]} rules
 * @property {AdaptivePath[]} paths
 */

/** @param {any} v */
export function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0
}

/** @param {any} v */
export function isStringArray(v) {
  return Array.isArray(v) && v.every(isNonEmptyString)
}

/**
 * @param {any} x
 * @returns {{ok:true,value:CognitiveIntent} | {ok:false,error:string}}
 */
export function validateIntent(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"intent:not_object" }
  if (!isNonEmptyString(x.id)) return { ok:false, error:"intent:id" }
  if (!isNonEmptyString(x.description)) return { ok:false, error:"intent:description" }
  if (!isStringArray(x.entryPoints)) return { ok:false, error:"intent:entryPoints" }
  return { ok:true, value: /** @type {CognitiveIntent} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:ProgressionRule} | {ok:false,error:string}}
 */
export function validateRule(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"rule:not_object" }
  if (!isNonEmptyString(x.from)) return { ok:false, error:"rule:from" }
  if (!isNonEmptyString(x.to)) return { ok:false, error:"rule:to" }
  if (!isNonEmptyString(x.when)) return { ok:false, error:"rule:when" }
  if (!isNonEmptyString(x.rationale)) return { ok:false, error:"rule:rationale" }
  return { ok:true, value: /** @type {ProgressionRule} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:AdaptivePath} | {ok:false,error:string}}
 */
export function validatePath(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"path:not_object" }
  if (!isNonEmptyString(x.intent)) return { ok:false, error:"path:intent" }
  if (!isStringArray(x.sequence)) return { ok:false, error:"path:sequence" }
  if (!isNonEmptyString(x.explanation)) return { ok:false, error:"path:explanation" }
  return { ok:true, value: /** @type {AdaptivePath} */(x) }
}

/**
 * Normalização determinística:
 * - ordena intents por id
 * - ordena rules por from,to,when
 * - ordena paths por intent
 * - ordena arrays internas (entryPoints e sequence) para estabilidade
 *
 * @param {E7State} state
 * @returns {E7State}
 */
export function normalizeState(state) {
  const intents = [...state.intents].sort((a,b) => a.id.localeCompare(b.id))
  const rules = [...state.rules].sort((a,b) =>
    (a.from + "|" + a.to + "|" + a.when).localeCompare(b.from + "|" + b.to + "|" + b.when)
  )
  const paths = [...state.paths].sort((a,b) => a.intent.localeCompare(b.intent))

  for (const it of intents) it.entryPoints = [...it.entryPoints].sort((a,b)=>a.localeCompare(b))
  for (const p of paths) p.sequence = [...p.sequence].slice() // preserva ordem declarada (não ordenar)
  // Observação: sequence é percurso; não ordena para não destruir sentido.

  return {
    version: state.version,
    generatedAtISO: state.generatedAtISO,
    intents,
    rules,
    paths,
  }
}

/**
 * Parser puro: recebe DSL E7 e retorna state serializável.
 * Sem IO. Sem dependência.
 *
 * DSL v1:
 *   INTENT <id>
 *     DESC: <texto>
 *     ENTRY: a,b,c
 *
 *   RULE <from> -> <to>
 *     WHEN: <condição textual>
 *     WHY: <racional>
 *
 *   PATH <intentId>
 *     SEQ: a -> b -> c
 *     EXPLAIN: <texto>
 *
 * @param {string} dsl
 * @param {{nowISO?:string}} [opt]
 * @returns {{ok:true,state:E7State} | {ok:false,error:string,line?:number}}
 */
export function parseE7DSL(dsl, opt = {}) {
  if (!isNonEmptyString(dsl)) return { ok:false, error:"dsl:empty" }

  const lines = dsl.split(/\r?\n/)
  /** @type {any[]} */ const intents = []
  /** @type {any[]} */ const rules = []
  /** @type {any[]} */ const paths = []

  let i = 0
  let currentIntent = null
  let currentRule = null
  let currentPath = null

  const nowISO = opt.nowISO && isNonEmptyString(opt.nowISO) ? opt.nowISO : new Date(0).toISOString()

  function fail(msg) { return { ok:false, error:msg, line:i+1 } }

  function commitIntent() {
    if (!currentIntent) return
    const r = validateIntent(currentIntent)
    if (!r.ok) throw new Error(`INVALID_INTENT:${r.error}`)
    intents.push(r.value)
    currentIntent = null
  }

  function commitRule() {
    if (!currentRule) return
    const r = validateRule(currentRule)
    if (!r.ok) throw new Error(`INVALID_RULE:${r.error}`)
    rules.push(r.value)
    currentRule = null
  }

  function commitPath() {
    if (!currentPath) return
    const r = validatePath(currentPath)
    if (!r.ok) throw new Error(`INVALID_PATH:${r.error}`)
    paths.push(r.value)
    currentPath = null
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line || line.startsWith("#") || line.startsWith("//")) { i++; continue }

    if (line.startsWith("INTENT ")) {
      commitIntent(); commitRule(); commitPath()
      const id = line.slice("INTENT ".length).trim()
      if (!isNonEmptyString(id)) return fail("intent:header_id")
      currentIntent = { id, description: "", entryPoints: [] }
      i++; continue
    }

    if (line.startsWith("RULE ")) {
      commitIntent(); commitRule(); commitPath()
      const rest = line.slice("RULE ".length).trim()
      const parts = rest.split("->").map(s=>s.trim())
      if (parts.length !== 2) return fail("rule:header_format")
      const [from, to] = parts
      if (!isNonEmptyString(from) || !isNonEmptyString(to)) return fail("rule:header_endpoints")
      currentRule = { from, to, when: "", rationale: "" }
      i++; continue
    }

    if (line.startsWith("PATH ")) {
      commitIntent(); commitRule(); commitPath()
      const intent = line.slice("PATH ".length).trim()
      if (!isNonEmptyString(intent)) return fail("path:header_intent")
      currentPath = { intent, sequence: [], explanation: "" }
      i++; continue
    }

    // INTENT fields
    if (line.startsWith("DESC:")) {
      if (!currentIntent) return fail("desc:outside_intent")
      const desc = line.slice("DESC:".length).trim()
      if (!isNonEmptyString(desc)) return fail("desc:empty")
      currentIntent.description = desc
      i++; continue
    }

    if (line.startsWith("ENTRY:")) {
      if (!currentIntent) return fail("entry:outside_intent")
      const csv = line.slice("ENTRY:".length).trim()
      const ep = csv.split(",").map(s=>s.trim()).filter(Boolean)
      if (!ep.length) return fail("entry:empty")
      currentIntent.entryPoints = ep
      i++; continue
    }

    // RULE fields
    if (line.startsWith("WHEN:")) {
      if (!currentRule) return fail("when:outside_rule")
      const w = line.slice("WHEN:".length).trim()
      if (!isNonEmptyString(w)) return fail("when:empty")
      currentRule.when = w
      i++; continue
    }

    if (line.startsWith("WHY:")) {
      if (!currentRule) return fail("why:outside_rule")
      const r = line.slice("WHY:".length).trim()
      if (!isNonEmptyString(r)) return fail("why:empty")
      currentRule.rationale = r
      i++; continue
    }

    // PATH fields
    if (line.startsWith("SEQ:")) {
      if (!currentPath) return fail("seq:outside_path")
      const seqLine = line.slice("SEQ:".length).trim()
      const nodes = seqLine.split("->").map(s=>s.trim()).filter(Boolean)
      if (nodes.length < 2) return fail("seq:min2")
      currentPath.sequence = nodes
      i++; continue
    }

    if (line.startsWith("EXPLAIN:")) {
      if (!currentPath) return fail("explain:outside_path")
      const ex = line.slice("EXPLAIN:".length).trim()
      if (!isNonEmptyString(ex)) return fail("explain:empty")
      currentPath.explanation = ex
      i++; continue
    }

    return fail("dsl:unknown_line")
  }

  try { commitIntent(); commitRule(); commitPath() }
  catch (e) { return { ok:false, error:`commit:${String(e && e.message ? e.message : e)}` } }

  /** @type {E7State} */
  const state = normalizeState({
    version: 1,
    generatedAtISO: nowISO,
    intents,
    rules,
    paths,
  })

  return { ok:true, state }
}