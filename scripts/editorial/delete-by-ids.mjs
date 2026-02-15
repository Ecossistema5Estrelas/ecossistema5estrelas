import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-10-01',
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false
})

const ids = process.argv.slice(2).filter(Boolean)

if (ids.length === 0) {
  console.error('ERRO: informe ao menos 1 ID')
  process.exit(1)
}

for (const id of ids) {
  try {
    await client.delete(id)
    console.log(`🗑️ Post apagado: ${id}`)
  } catch (err) {
    console.error(`❌ Falha ao apagar ${id}:`, err.message)
  }
}

console.log('✅ Exclusão concluída')