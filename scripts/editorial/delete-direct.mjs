import { createClient } from '@sanity/client'
import 'dotenv/config'

const id = process.argv[2]

if (!id) {
  console.error('ERRO: ID não informado')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

try {
  await client.delete(id)
  console.log(`DELETADO COM SUCESSO: ${id}`)
} catch (err) {
  console.error('ERRO AO DELETAR:', err.message)
  process.exit(1)
}