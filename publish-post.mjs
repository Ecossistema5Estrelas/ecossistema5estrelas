import fs from 'fs'
import dotenv from 'dotenv'
import { createClient } from '@sanity/client'

/**
 * SCRIPT CANÔNICO DE PUBLICAÇÃO EDITORIAL — HARDENED
 * Fonte da verdade: NDJSON FINAL
 * Segurança: FAIL-FAST + GUARD-RAIL DATASET
 */

dotenv.config({ path: '.env.local' })

/* ======================================================
   VALIDAR ARGUMENTO
====================================================== */

const file = process.argv[2]

if (!file) {
  console.error('ERRO: informe o arquivo NDJSON')
  process.exit(1)
}

if (!fs.existsSync(file)) {
  console.error('ERRO: arquivo não encontrado:', file)
  process.exit(1)
}

/* ======================================================
   CARREGAR DOC
====================================================== */

const raw = fs.readFileSync(file, 'utf-8').trim()
const doc = JSON.parse(raw)

/* ======================================================
   VALIDAR DOCUMENTO
====================================================== */

if (doc._type !== 'post') {
  console.error('ERRO: _type inválido (esperado "post")')
  process.exit(1)
}

if (!doc.slug?.current) {
  console.error('ERRO: slug.current ausente')
  process.exit(1)
}

if (!doc.publishedAt) {
  console.error('ERRO: publishedAt ausente')
  process.exit(1)
}

/* ======================================================
   VALIDAR DATASET (ANTI-ACIDENTE GLOBAL)
====================================================== */

const datasetRaw = process.env.SANITY_DATASET
const dataset = (datasetRaw || '').trim()

if (!dataset) {
  console.error('ERRO: SANITY_DATASET ausente')
  process.exit(1)
}

if (dataset === 'production') {
  console.error('🚫 BLOQUEADO: tentativa de publicar em dataset PRODUCTION')
  process.exit(1)
}

if (!/^[a-z0-9_-]+$/.test(dataset)) {
  console.error('ERRO: dataset inválido:', JSON.stringify(dataset))
  process.exit(1)
}

/* ======================================================
   VALIDAR TOKENS
====================================================== */

if (!process.env.SANITY_PROJECT_ID) {
  console.error('ERRO: SANITY_PROJECT_ID ausente')
  process.exit(1)
}

if (!process.env.SANITY_EDITORIAL_TOKEN) {
  console.error('ERRO: SANITY_EDITORIAL_TOKEN ausente')
  process.exit(1)
}

/* ======================================================
   LOG DIAGNÓSTICO CONTROLADO
====================================================== */

console.log('──── SANITY TARGET ────')
console.log('Project:', process.env.SANITY_PROJECT_ID)
console.log('Dataset:', dataset)
console.log('Slug:', doc.slug.current)
console.log('────────────────────────')

/* ======================================================
   CLIENT
====================================================== */

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset,
  apiVersion: '2023-10-01',
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false
})

/* ======================================================
   EXECUÇÃO
====================================================== */

try {
  const res = await client.create(doc)

  console.log('\n✅ POST PUBLICADO COM SUCESSO')
  console.log('ID:', res._id)
  console.log('SLUG:', res.slug?.current)

} catch (err) {

  console.error('\n❌ FALHA AO PUBLICAR')

  if (err?.response?.body)
    console.error(JSON.stringify(err.response.body, null, 2))
  else
    console.error(err.message)

  process.exit(1)
}
