import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_EDITORIAL_TOKEN,
  apiVersion: '2023-10-01',
  useCdn: false,
})

const query = `
*[
  _type == "post" &&
  (!defined(body) || length(body) == 0)
]{
  _id,
  title,
  "slug": slug.current
}
`

const posts = await client.fetch(query)

console.log(posts)