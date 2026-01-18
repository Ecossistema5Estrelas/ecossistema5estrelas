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

const query = `
*[_type == "post"]
| order(_createdAt desc)[0...5]
`

try {
  const posts = await client.fetch(query)

  console.log('\n🔍 AMOSTRA BRUTA DOS ÚLTIMOS POSTS:\n')

  for (const post of posts) {
    console.log(JSON.stringify(post, null, 2))
    console.log('----------------------------------')
  }
} catch (err) {
  console.error('ERRO:', err.message)
  process.exit(1)
}