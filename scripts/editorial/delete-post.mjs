#!/usr/bin/env node
import 'dotenv/config'
import process from 'process'
import { createClient } from '@sanity/client'

const [, , postId] = process.argv

if (!postId) {
  console.error('❌ Uso: node delete-post.mjs <post._id>')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-10-01',
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false
})

try {
  const res = await client.delete(postId)
  console.log('✅ Documento deletado:', postId)
} catch (err) {
  console.error('❌ Falha ao deletar:', err.message)
  process.exit(1)
}