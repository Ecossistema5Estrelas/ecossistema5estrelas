import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false,
})

const q = `*[_type=="post"]{
  _id,
  title,
  "slug": slug.current
}`

const run = async () => {
  const posts = await client.fetch(q)
  console.log(JSON.stringify(posts,null,2))
}

run().catch(console.error)

