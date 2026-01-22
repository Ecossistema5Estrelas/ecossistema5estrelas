/**
 * E6 — Índices Cognitivos
 * Núcleo puro: modelos + validações mínimas (sem IO)
 * Regra: determinístico, serializável, sem dependências externas.
 */

/**
 * @typedef {'trilha'|'árvore'|'mapa'|'linha'|'cluster'} CognitiveIndexType
 */

/**
 * @typedef {Object} CognitiveIndex
 * @property {string} id
 * @property {string} label
 * @property {CognitiveIndexType} type
 * @property {string[]} nodes
 * @property {string} description
 */

/**
 * @typedef {Object} CognitivePath
 * @property {string} from
 * @property {string} to
 * @property {string} rationale
 */

/**
 * @typedef {Object} CognitiveMap
 * @property {string} id
 * @property {string[]} indices
 * @property {CognitivePath[]} paths
 */

/**
 * @typedef {Object} CognitiveState
 * @property {number} version
 * @property {string} generatedAtISO
 * @property {CognitiveIndex[]} indices
 * @property {CognitiveMap[]} maps
 */

/** @param {any} v */
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

/** @param {any} v */
export function isStringArray(v) {
  return Array.isArray(v) && v.every(isNonEmptyString)
}

/**
 * Validação mínima: garante forma canônica.
 * @param {any} idx
 * @returns {{ok:true,value:CognitiveIndex} | {ok:false,error:string}}
 */
export function validateIndex(idx) {
  if (!idx || typeof idx !== 'object') return { ok: false, error: 'index:not_object' }
  if (!isNonEmptyString(idx.id)) return { ok: false, error: 'index:id' }
  if (!isNonEmptyString(idx.label)) return { ok: false, error: 'index:label' }
  if (!isNonEmptyString(idx.type)) return { ok: false, error: 'index:type' }

  const allowed = new Set(['trilha','árvore','mapa','linha','cluster'])
  if (!allowed.has(idx.type)) return { ok: false, error: 'index:type_invalid' }

  if (!isStringArray(idx.nodes)) return { ok: false, error: 'index:nodes' }
  if (!isNonEmptyString(idx.description)) return { ok: false, error: 'index:description' }

  return { ok: true, value: /** @type {CognitiveIndex} */(idx) }
}

/**
 * @param {any} p
 * @returns {{ok:true,value:CognitivePath} | {ok:false,error:string}}
 */
export function validatePath(p) {
  if (!p || typeof p !== 'object') return { ok: false, error: 'path:not_object' }
  if (!isNonEmptyString(p.from)) return { ok: false, error: 'path:from' }
  if (!isNonEmptyString(p.to)) return { ok: false, error: 'path:to' }
  if (!isNonEmptyString(p.rationale)) return { ok: false, error: 'path:rationale' }
  return { ok: true, value: /** @type {CognitivePath} */(p) }
}

/**
 * @param {any} m
 * @returns {{ok:true,value:CognitiveMap} | {ok:false,error:string}}
 */
export function validateMap(m) {
  if (!m || typeof m !== 'object') return { ok: false, error: 'map:not_object' }
  if (!isNonEmptyString(m.id)) return { ok: false, error: 'map:id' }
  if (!isStringArray(m.indices)) return { ok: false, error: 'map:indices' }
  if (!Array.isArray(m.paths)) return { ok: false, error: 'map:paths_not_array' }

  for (const p of m.paths) {
    const r = validatePath(p)
    if (!r.ok) return { ok: false, error: `map:path_invalid:${r.error}` }
  }

  return { ok: true, value: /** @type {CognitiveMap} */(m) }
}

/**
 * Determinismo: ordena IDs para estabilidade.
 * @param {CognitiveState} state
 * @returns {CognitiveState}
 */
export function normalizeState(state) {
  const indices = [...state.indices].sort((a,b) => a.id.localeCompare(b.id))
  const maps = [...state.maps].sort((a,b) => a.id.localeCompare(b.id))

  // também normaliza arrays internas para estabilidade
  for (const i of indices) i.nodes = [...i.nodes].sort((a,b) => a.localeCompare(b))
  for (const m of maps) m.indices = [...m.indices].sort((a,b) => a.localeCompare(b))

  return {
    version: state.version,
    generatedAtISO: state.generatedAtISO,
    indices,
    maps
  }
}

/**
 * Parser puro: recebe string DSL e retorna state serializável.
 * Sem IO. Sem dependência.
 *
 * DSL v1:
 *   INDEX <id> | <type> | <label>
 *     DESC: <texto>
 *     NODES: a,b,c
 *   MAP <id>
 *     INDICES: i1,i2
 *     PATH: from -> to | rationale
 *
 * @param {string} dsl
 * @param {{nowISO?:string}} [opt]
 * @returns {{ok:true,state:CognitiveState} | {ok:false,error:string,line?:number}}
 */
export function parseE6DSL(dsl, opt = {}) {
  if (!isNonEmptyString(dsl)) return { ok:false, error:'dsl:empty' }

  const lines = dsl.split(/\r?\n/)
  /** @type {any[]} */
  const indices = []
  /** @type {any[]} */
  const maps = []

  let i = 0
  let currentIndex = null
  let currentMap = null

  const nowISO = opt.nowISO && isNonEmptyString(opt.nowISO) ? opt.nowISO : new Date(0).toISOString()

  function fail(msg) {
    return { ok:false, error: msg, line: i+1 }
  }

  function commitIndex() {
    if (!currentIndex) return
    const r = validateIndex(currentIndex)
    if (!r.ok) throw new Error(`INVALID_INDEX:${r.error}`)
    indices.push(r.value)
    currentIndex = null
  }

  function commitMap() {
    if (!currentMap) return
    const r = validateMap(currentMap)
    if (!r.ok) throw new Error(`INVALID_MAP:${r.error}`)
    maps.push(r.value)
    currentMap = null
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    // ignora vazio e comentários
    if (!line || line.startsWith('#') || line.startsWith('//')) { i++; continue }

    // cabeçalho INDEX
    if (line.startsWith('INDEX ')) {
      commitIndex()
      commitMap()

      const rest = line.slice('INDEX '.length)
      const parts = rest.split('|').map(s => s.trim())
      if (parts.length !== 3) return fail('index:header_format')

      const [id, type, label] = parts
      currentIndex = { id, type, label, nodes: [], description: '' }
      i++; continue
    }

    // cabeçalho MAP
    if (line.startsWith('MAP ')) {
      commitIndex()
      commitMap()

      const id = line.slice('MAP '.length).trim()
      if (!isNonEmptyString(id)) return fail('map:header_id')
      currentMap = { id, indices: [], paths: [] }
      i++; continue
    }

    // blocos (precisam de contexto)
    if (line.startsWith('DESC:')) {
      if (!currentIndex) return fail('desc:outside_index')
      const desc = line.slice('DESC:'.length).trim()
      if (!isNonEmptyString(desc)) return fail('desc:empty')
      currentIndex.description = desc
      i++; continue
    }

    if (line.startsWith('NODES:')) {
      if (!currentIndex) return fail('nodes:outside_index')
      const csv = line.slice('NODES:'.length).trim()
      const nodes = csv.split(',').map(s => s.trim()).filter(Boolean)
      if (!nodes.length) return fail('nodes:empty')
      currentIndex.nodes = nodes
      i++; continue
    }

    if (line.startsWith('INDICES:')) {
      if (!currentMap) return fail('indices:outside_map')
      const csv = line.slice('INDICES:'.length).trim()
      const ids = csv.split(',').map(s => s.trim()).filter(Boolean)
      if (!ids.length) return fail('indices:empty')
      currentMap.indices = ids
      i++; continue
    }

    if (line.startsWith('PATH:')) {
      if (!currentMap) return fail('path:outside_map')
      const body = line.slice('PATH:'.length).trim()
      // formato: from -> to | rationale
      const [edge, rationale] = body.split('|').map(s => s.trim())
      if (!edge || !rationale) return fail('path:format')
      const [from, to] = edge.split('->').map(s => s.trim())
      if (!from || !to) return fail('path:edge')
      currentMap.paths.push({ from, to, rationale })
      i++; continue
    }

    return fail('dsl:unknown_line')
  }

  // commit final
  try {
    commitIndex()
    commitMap()
  } catch (e) {
    const msg = String(e && e.message ? e.message : e)
    return { ok:false, error:`commit:${msg}` }
  }

  /** @type {CognitiveState} */
  const state = normalizeState({
    version: 1,
    generatedAtISO: nowISO,
    indices,
    maps
  })

  return { ok:true, state }
}