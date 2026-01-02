#!/usr/bin/env node
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import process from 'process'
import { createClient } from '@sanity/client'

const CONTRACT_PATH = path.resolve(
  'governance/editorial/contracts/editorial-minimo-listagem.v1.json'
)

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-10-01',
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false
})

const exit = (code) => process.exit(code)
const nowISO = () => new Date().toISOString()
const isNonEmptyString = (v) =>
  typeof v === 'string' && v.trim().length > 0

if (!fs.existsSync(CONTRACT_PATH)) {
  console.error('❌ Contrato editorial não encontrado:', CONTRACT_PATH)
  exit(2)
}

const [, , postId] = process.argv
if (!postId) {
  console.error('❌ Uso: node validate-post-before-publish.mjs <post._id>')
  exit(2)
}

const query = `
*[_type=="post" && _id==$id][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}
`

const post = await sanity.fetch(query, { id: postId })

if (!post) {
  console.error('❌ Post não encontrado:', postId)
  exit(2)
}

const errors = []
const warnings = []

if (!isNonEmptyString(post._id)) errors.push('_id ausente ou inválido')
if (!isNonEmptyString(post.title)) errors.push('title ausente')
if (!isNonEmptyString(post.slug)) errors.push('slug ausente ou inválido')
if (!isNonEmptyString(post.publishedAt)) errors.push('publishedAt ausente')

if (isNonEmptyString(post.publishedAt)) {
  const pub = new Date(post.publishedAt).toISOString()
  if (pub > nowISO()) {
    warnings.push('publishedAt no futuro (post não listável ainda)')
  }
}

if (!isNonEmptyString(post.excerpt)) {
  warnings.push('excerpt ausente → NÃO LISTÁVEL (mas publicável)')
}

let status = 'LISTÁVEL'
let exitCode = 0

if (errors.length > 0) {
  status = 'BLOQUEADO'
  exitCode = 1
} else if (warnings.length > 0) {
  status = 'PUBLICÁVEL'
}

console.log('—'.repeat(60))
console.log('📄 Post:', post._id)
console.log('📌 Status:', status)
console.log('—'.repeat(60))

if (errors.length) {
  console.log('❌ Erros:')
  errors.forEach((e) => console.log('  -', e))
}

if (warnings.length) {
  console.log('⚠️ Avisos:')
  warnings.forEach((w) => console.log('  -', w))
}

console.log('—'.repeat(60))
exit(exitCode)