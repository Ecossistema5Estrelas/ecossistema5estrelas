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

const ids = [
  'P0ARo92oMMSuIIwmmm6Hhj'
]

for (const id of ids) {
  await client.delete(id)
  console.log(`🗑️ Post apagado: ${id}`)
}

console.log('✅ Exclusão concluída com sucesso')