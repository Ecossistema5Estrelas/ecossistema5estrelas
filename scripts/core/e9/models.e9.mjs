/**
 * E9 — Predição + Planejamento Cognitivo
 * Núcleo puro: modelos + validações mínimas + parser DSL v1 + normalização (sem IO).
 * Regra: determinístico, serializável, sem dependências externas.
 *
 * O E9 NÃO lê E6/E7/E8 aqui. Quem lê é runner/gate/build.
 */

/**
 * @typedef {Object} FutureState
 * @property {string} from
 * @property {string[]} options
 * @property {string} rationale
 */

/**
 * @typedef {Object} CognitivePlan
 * @property {string} id
 * @property {string} intent
 * @property {string[]} steps
 * @property {string} explanation
 */

/**
 * @typedef {Object} CognitiveSimulation
 * @property {string} planId
 * @property {string[]} outcomes
 * @property {string | undefined} risk
 */

/**
 * @typedef {Object} E9State
 * @property {number} version
 * @property {string} generatedAtISO
 * @property {FutureState[]} futures
 * @property {CognitivePlan[]} plans
 * @property {CognitiveSimulation[]} simulations
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
 * @returns {{ok:true,value:FutureState} | {ok:false,error:string}}
 */
export function validateFuture(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"future:not_object" }
  if (!isNonEmptyString(x.from)) return { ok:false, error:"future:from" }
  if (!isStringArray(x.options) || x.options.length < 1) return { ok:false, error:"future:options_min1" }
  if (!isNonEmptyString(x.rationale)) return { ok:false, error:"future:rationale" }
  return { ok:true, value: /** @type {FutureState} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:CognitivePlan} | {ok:false,error:string}}
 */
export function validatePlan(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"plan:not_object" }
  if (!isNonEmptyString(x.id)) return { ok:false, error:"plan:id" }
  if (!isNonEmptyString(x.intent)) return { ok:false, error:"plan:intent" }
  if (!isStringArray(x.steps) || x.steps.length < 2) return { ok:false, error:"plan:steps_min2" }
  if (!isNonEmptyString(x.explanation)) return { ok:false, error:"plan:explanation" }
  return { ok:true, value: /** @type {CognitivePlan} */(x) }
}

/**
 * @param {any} x
 * @returns {{ok:true,value:CognitiveSimulation} | {ok:false,error:string}}
 */
export function validateSimulation(x) {
  if (!x || typeof x !== "object") return { ok:false, error:"sim:not_object" }
  if (!isNonEmptyString(x.planId)) return { ok:false, error:"sim:planId" }
  if (!isStringArray(x.outcomes) || x.outcomes.length < 1) return { ok:false, error:"sim:outcomes_min1" }
  if (!(x.risk === undefined || isNonEmptyString(x.risk))) return { ok:false, error:"sim:risk" }
  return { ok:true, value: /** @type {CognitiveSimulation} */(x) }
}

/**
 * Normalização determinística:
 * - futures por from
 * - plans por id
 * - simulations por planId
 * - options/outcomes ordenados (listas de possibilidades)
 * - NÃO reordena plan.steps (é sequência)
 *
 * @param {E9State} state
 * @returns {E9State}
 */
export function normalizeState(state) {
  const futures = [...state.futures].sort((a,b)=>a.from.localeCompare(b.from))
  const plans = [...state.plans].sort((a,b)=>a.id.localeCompare(b.id))
  const simulations = [...state.simulations].sort((a,b)=>a.planId.localeCompare(b.planId))

  for (const f of futures) f.options = [...f.options].sort((a,b)=>a.localeCompare(b))
  for (const s of simulations) s.outcomes = [...s.outcomes].sort((a,b)=>a.localeCompare(b))

  return {
    version: state.version,
    generatedAtISO: state.generatedAtISO,
    futures,
    plans,
    simulations,
  }
}

/**
 * Parser puro: DSL E9 -> state (sem IO).
 *
 * DSL v1:
 *   FUTURE <from>
 *     OPTIONS: a, b, c
 *     WHY: <texto>
 *
 *   PLAN <id> | <intent>
 *     STEPS: a -> b -> c
 *     EXPLAIN: <texto>
 *
 *   SIM <planId>
 *     OUTCOMES: a, b
 *     RISK: <texto opcional>
 *
 * @param {string} dsl
 * @param {{nowISO?:string}} [opt]
 * @returns {{ok:true,state:E9State} | {ok:false,error:string,line?:number}}
 */
export function parseE9DSL(dsl, opt = {}) {
  if (!isNonEmptyString(dsl)) return { ok:false, error:"dsl:empty" }

  const lines = dsl.split(/\r?\n/)
  /** @type {any[]} */ const futures = []
  /** @type {any[]} */ const plans = []
  /** @type {any[]} */ const simulations = []

  let i = 0
  let currentFuture = null
  let currentPlan = null
  let currentSim = null

  const nowISO = opt.nowISO && isNonEmptyString(opt.nowISO) ? opt.nowISO : new Date(0).toISOString()

  function fail(msg) { return { ok:false, error:msg, line:i+1 } }

  function commitFuture() {
    if (!currentFuture) return
    const r = validateFuture(currentFuture)
    if (!r.ok) throw new Error(`INVALID_FUTURE:${r.error}`)
    futures.push(r.value)
    currentFuture = null
  }
  function commitPlan() {
    if (!currentPlan) return
    const r = validatePlan(currentPlan)
    if (!r.ok) throw new Error(`INVALID_PLAN:${r.error}`)
    plans.push(r.value)
    currentPlan = null
  }
  function commitSim() {
    if (!currentSim) return
    const r = validateSimulation(currentSim)
    if (!r.ok) throw new Error(`INVALID_SIM:${r.error}`)
    simulations.push(r.value)
    currentSim = null
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line || line.startsWith("#") || line.startsWith("//")) { i++; continue }

    if (line.startsWith("FUTURE ")) {
      commitFuture(); commitPlan(); commitSim()
      const from = line.slice("FUTURE ".length).trim()
      if (!isNonEmptyString(from)) return fail("future:header_from")
      currentFuture = { from, options: [], rationale: "" }
      i++; continue
    }

    if (line.startsWith("PLAN ")) {
      commitFuture(); commitPlan(); commitSim()
      const rest = line.slice("PLAN ".length)
      const parts = rest.split("|").map(s=>s.trim())
      if (parts.length !== 2) return fail("plan:header_format")
      const [id, intent] = parts
      if (!isNonEmptyString(id) || !isNonEmptyString(intent)) return fail("plan:header_fields")
      currentPlan = { id, intent, steps: [], explanation: "" }
      i++; continue
    }

    if (line.startsWith("SIM ")) {
      commitFuture(); commitPlan(); commitSim()
      const planId = line.slice("SIM ".length).trim()
      if (!isNonEmptyString(planId)) return fail("sim:header_planId")
      currentSim = { planId, outcomes: [], risk: undefined }
      i++; continue
    }

    // FUTURE fields
    if (line.startsWith("OPTIONS:")) {
      if (!currentFuture) return fail("options:outside_future")
      const csv = line.slice("OPTIONS:".length).trim()
      const opts = csv.split(",").map(s=>s.trim()).filter(Boolean)
      if (!opts.length) return fail("options:empty")
      currentFuture.options = opts
      i++; continue
    }
    if (line.startsWith("WHY:")) {
      if (!currentFuture) return fail("why:outside_future")
      const why = line.slice("WHY:".length).trim()
      if (!isNonEmptyString(why)) return fail("why:empty")
      currentFuture.rationale = why
      i++; continue
    }

    // PLAN fields
    if (line.startsWith("STEPS:")) {
      if (!currentPlan) return fail("steps:outside_plan")
      const seqLine = line.slice("STEPS:".length).trim()
      const steps = seqLine.split("->").map(s=>s.trim()).filter(Boolean)
      if (steps.length < 2) return fail("steps:min2")
      currentPlan.steps = steps
      i++; continue
    }
    if (line.startsWith("EXPLAIN:")) {
      if (!currentPlan) return fail("explain:outside_plan")
      const ex = line.slice("EXPLAIN:".length).trim()
      if (!isNonEmptyString(ex)) return fail("explain:empty")
      currentPlan.explanation = ex
      i++; continue
    }

    // SIM fields
    if (line.startsWith("OUTCOMES:")) {
      if (!currentSim) return fail("outcomes:outside_sim")
      const csv = line.slice("OUTCOMES:".length).trim()
      const outs = csv.split(",").map(s=>s.trim()).filter(Boolean)
      if (!outs.length) return fail("outcomes:empty")
      currentSim.outcomes = outs
      i++; continue
    }
    if (line.startsWith("RISK:")) {
      if (!currentSim) return fail("risk:outside_sim")
      const risk = line.slice("RISK:".length).trim()
      currentSim.risk = risk === "" ? undefined : risk
      i++; continue
    }

    return fail("dsl:unknown_line")
  }

  try { commitFuture(); commitPlan(); commitSim() }
  catch (e) { return { ok:false, error:`commit:${String(e && e.message ? e.message : e)}` } }

  /** @type {E9State} */
  const state = normalizeState({
    version: 1,
    generatedAtISO: nowISO,
    futures,
    plans,
    simulations,
  })

  return { ok:true, state }
}