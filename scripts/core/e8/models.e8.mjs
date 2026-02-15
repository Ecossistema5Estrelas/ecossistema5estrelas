/**
 * E8 — Memória Cognitiva + Continuidade
 * Núcleo puro: modelos + validações mínimas + parser DSL v1 + normalização (sem IO).
 * Regra: determinístico, serializável, sem dependências externas.
 *
 * O E8 NÃO lê E6/E7 aqui. Quem lê é runner/gate/build.
 */

/**
 * @typedef {Object} CognitiveSession
 * @property {string} id
 * @property {string} startedAtISO
 * @property {string} lastSeenAtISO
 * @property {string} intent
 */

/**
 * @typedef {Object} CognitiveCheckpoint
 * @property {string} sessionId
 * @property {string} node
 * @property {string} timestampISO
 * @property {string | undefined} note
 */

/**
 * @typedef {Object} ContinuityLine
 * @property {string} sessionId
 * @property {string[]} path
 * @property {string} rationale
 */

/**
 * @typedef {Object} E8State
 * @property {number} version
 * @property {string} generatedAtISO
 * @property {CognitiveSession[]} sessions
 * @property {CognitiveCheckpoint[]} checkpoints
 * @property {ContinuityLine[]} continuities
 */

/** @param {any} v */
export function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0
}

/** @param {any} v */
export function isISO(v) {
  // validação mínima ISO 8601 (não perfeita, mas determinística)
  return isNonEmptyString(v) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(v.trim())
}

/** @param {any} v */
export function isOptionalString(v) {
  return v === undefined || (typeof v === "string")
}

/** @param {any} v */
export function isStringArray(v) {
  return Array.isArray(v) && v.every(isNonEmptyString)
}

/**
 * @param {any} x
 * @returns {{ok:true,value:CognitiveSession} | {ok:false,error:string}}
 */
export function validateSession(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"session:not_object" }
  if (!isNonEmptyString(x.id)) return { ok:false, error:"session:id" }
  if (!isISO(x.startedAtISO)) return { ok:false, error:"session:startedAtISO" }
  if (!isISO(x.lastSeenAtISO)) return { ok:false, error:"session:lastSeenAtISO" }
  if (!isNonEmptyString(x.intent)) return { ok:false, error:"session:intent" }
  return { ok:true, value: /** @type {CognitiveSession} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:CognitiveCheckpoint} | {ok:false,error:string}}
 */
export function validateCheckpoint(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"checkpoint:not_object" }
  if (!isNonEmptyString(x.sessionId)) return { ok:false, error:"checkpoint:sessionId" }
  if (!isNonEmptyString(x.node)) return { ok:false, error:"checkpoint:node" }
  if (!isISO(x.timestampISO)) return { ok:false, error:"checkpoint:timestampISO" }
  if (!isOptionalString(x.note)) return { ok:false, error:"checkpoint:note" }
  return { ok:true, value: /** @type {CognitiveCheckpoint} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:ContinuityLine} | {ok:false,error:string}}
 */
export function validateContinuity(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"continuity:not_object" }
  if (!isNonEmptyString(x.sessionId)) return { ok:false, error:"continuity:sessionId" }
  if (!isStringArray(x.path) || x.path.length < 2) return { ok:false, error:"continuity:path_min2" }
  if (!isNonEmptyString(x.rationale)) return { ok:false, error:"continuity:rationale" }
  return { ok:true, value: /** @type {ContinuityLine} */(x) }
}

/**
 * Normalização determinística:
 * - sessions por id
 * - checkpoints por (sessionId, timestampISO, node)
 * - continuities por (sessionId)
 * - NÃO reordena continuidade.path (é sequência)
 *
 * @param {E8State} state
 * @returns {E8State}
 */
export function normalizeState(state) {
  const sessions = [...state.sessions].sort((a,b)=>a.id.localeCompare(b.id))
  const checkpoints = [...state.checkpoints].sort((a,b)=>
    (a.sessionId + "|" + a.timestampISO + "|" + a.node).localeCompare(b.sessionId + "|" + b.timestampISO + "|" + b.node)
  )
  const continuities = [...state.continuities].sort((a,b)=>(a.sessionId).localeCompare(b.sessionId))

  return {
    version: state.version,
    generatedAtISO: state.generatedAtISO,
    sessions,
    checkpoints,
    continuities,
  }
}

/**
 * Parser puro: DSL E8 -> state.
 * Sem IO. Sem dependência.
 *
 * DSL v1:
 *   SESSION <id> | <intent> | <startedAtISO> | <lastSeenAtISO>
 *
 *   CHECKPOINT <sessionId> | <node> | <timestampISO> | <note?>
 *
 *   CONTINUITY <sessionId>
 *     PATH: a -> b -> c
 *     WHY: <texto>
 *
 * Observação: note é opcional (pode ser vazio após o último "|")
 *
 * @param {string} dsl
 * @param {{nowISO?:string}} [opt]
 * @returns {{ok:true,state:E8State} | {ok:false,error:string,line?:number}}
 */
export function parseE8DSL(dsl, opt = {}) {
  if (!isNonEmptyString(dsl)) return { ok:false, error:"dsl:empty" }

  const lines = dsl.split(/\r?\n/)
  /** @type {any[]} */ const sessions = []
  /** @type {any[]} */ const checkpoints = []
  /** @type {any[]} */ const continuities = []

  let i = 0
  let currentContinuity = null

  const nowISO = opt.nowISO && isISO(opt.nowISO) ? opt.nowISO : new Date(0).toISOString()

  function fail(msg) { return { ok:false, error:msg, line:i+1 } }

  function commitContinuity() {
    if (!currentContinuity) return
    const r = validateContinuity(currentContinuity)
    if (!r.ok) throw new Error(`INVALID_CONTINUITY:${r.error}`)
    continuities.push(r.value)
    currentContinuity = null
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line || line.startsWith("#") || line.startsWith("//")) { i++; continue }

    if (line.startsWith("SESSION ")) {
      commitContinuity()
      const rest = line.slice("SESSION ".length)
      const parts = rest.split("|").map(s=>s.trim())
      if (parts.length !== 4) return fail("session:format")
      const [id, intent, startedAtISO, lastSeenAtISO] = parts
      const obj = { id, intent, startedAtISO, lastSeenAtISO }
      const v = validateSession(obj)
      if (!v.ok) return fail(`session:invalid:${v.error}`)
      sessions.push(v.value)
      i++; continue
    }

    if (line.startsWith("CHECKPOINT ")) {
      commitContinuity()
      const rest = line.slice("CHECKPOINT ".length)
      const parts = rest.split("|").map(s=>s.trim())
      if (parts.length < 3 || parts.length > 4) return fail("checkpoint:format")
      const [sessionId, node, timestampISO, noteRaw] = parts
      const obj = { sessionId, node, timestampISO, note: noteRaw === undefined || noteRaw === "" ? undefined : noteRaw }
      const v = validateCheckpoint(obj)
      if (!v.ok) return fail(`checkpoint:invalid:${v.error}`)
      checkpoints.push(v.value)
      i++; continue
    }

    if (line.startsWith("CONTINUITY ")) {
      commitContinuity()
      const sessionId = line.slice("CONTINUITY ".length).trim()
      if (!isNonEmptyString(sessionId)) return fail("continuity:header_sessionId")
      currentContinuity = { sessionId, path: [], rationale: "" }
      i++; continue
    }

    if (line.startsWith("PATH:")) {
      if (!currentContinuity) return fail("path:outside_continuity")
      const seqLine = line.slice("PATH:".length).trim()
      const nodes = seqLine.split("->").map(s=>s.trim()).filter(Boolean)
      if (nodes.length < 2) return fail("path:min2")
      currentContinuity.path = nodes
      i++; continue
    }

    if (line.startsWith("WHY:")) {
      if (!currentContinuity) return fail("why:outside_continuity")
      const why = line.slice("WHY:".length).trim()
      if (!isNonEmptyString(why)) return fail("why:empty")
      currentContinuity.rationale = why
      i++; continue
    }

    return fail("dsl:unknown_line")
  }

  try { commitContinuity() }
  catch (e) { return { ok:false, error:`commit:${String(e && e.message ? e.message : e)}` } }

  /** @type {E8State} */
  const state = normalizeState({
    version: 1,
    generatedAtISO: nowISO,
    sessions,
    checkpoints,
    continuities,
  })

  return { ok:true, state }
}