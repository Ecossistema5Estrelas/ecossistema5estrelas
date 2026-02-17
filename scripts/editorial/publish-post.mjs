import fs from 'fs'
import dotenv from 'dotenv'
import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

dotenv.config({ path: '.env.local' })

/**
 * SCRIPT CANÔNICO DE PUBLICAÇÃO EDITORIAL
 * Markdown (.md) → HTML → Portable Text (Sanity)
 */

// ⬇️ INJEÇÃO DE DOM PARA O BLOCK-TOOLS (OBRIGATÓRIO)
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
global.window = jsdom.window
global.document = jsdom.window.document
global.DOMParser = jsdom.window.DOMParser

const args = process.argv.slice(2)
const getArg = (f) => {
  const i = args.indexOf(f)
  return i !== -1 ? args[i + 1] : null
}

const title = getArg('--title')
const slug = getArg('--slug')
const bodyFile = getArg('--body-file')
const now = args.includes('--now')

if (!title || !slug || !bodyFile || !now) {
  console.error('ERRO: parâmetros obrigatórios ausentes')
  process.exit(1)
}

if (!fs.existsSync(bodyFile)) {
  console.error('ERRO: arquivo .md não encontrado:', bodyFile)
  process.exit(1)
}

/* Markdown → HTML */
const markdown = fs.readFileSync(bodyFile, 'utf8')

const html = String(
  await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown)
)

/* Schema mínimo */
const schema = Schema.compile({
  name: 'editorial',
  types: [
    {
      name: 'post',
      type: 'document',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    }
  ]
})

const blockContentType = schema
  .get('post')
  .fields.find((f) => f.name === 'body').type

/* HTML → Portable Text */
const body = htmlToBlocks(
  html,
  blockContentType
)

/* Sanity */
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-10-01',
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false
})

const res = await client.create({
  _type: 'post',
  title,
  slug: { current: slug },
  body,
  publishedAt: new Date().toISOString()
})

console.log('✅ POST PUBLICADO COM SUCESSO')
console.log('ID:', res._id)
console.log('SLUG:', res.slug.current)
