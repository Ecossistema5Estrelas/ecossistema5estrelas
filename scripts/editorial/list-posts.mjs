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

const posts = await client.fetch(`
*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  publishedAt
} | order(publishedAt desc)
`)

console.log('📄 POSTS NO SANITY:\n')
posts.forEach(p => {
  console.log(`- ${p._id}`)
  console.log(`  title: ${p.title}`)
  console.log(`  slug:  ${p.slug}`)
  console.log(`  date:  ${p.publishedAt}`)
  console.log('')
})