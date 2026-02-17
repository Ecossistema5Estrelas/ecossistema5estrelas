import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import { createClient } from "@sanity/client"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") })

const REQUIRED_COUNT = 92
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "staging"
const TOKEN = process.env.SANITY_EDITORIAL_TOKEN

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  throw new Error("ENV FAIL: project id ausente")

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
})

const log = (msg) => console.log(msg)

const divider = () => log("--------------------------------------------------")

async function gate1_count() {
  const total = await client.fetch(`count(*[_type=="post"])`)
  if (total >= REQUIRED_COUNT)
    log(`PROVA G1 PASS → count=${total}`)
  else
    log(`PROVA G1 FAIL → count=${total} (<${REQUIRED_COUNT})`)
}

async function gate2_structure() {
  const posts = await client.fetch(`
    *[_type=="post"][0..19]{
      _id,
      title,
      "slug": slug.current,
      publishedAt
    }
  `)

  let ok = true

  for (const p of posts) {
    if (!p._id || !p.slug || !p.title) ok = false
  }

  if (ok)
    log(`PROVA G2 PASS → estrutura íntegra (${posts.length} verificados)`)
  else
    log(`PROVA G2 FAIL → campos obrigatórios ausentes`)
}

async function gate4_editorial() {
  if (!TOKEN) {
    log("PROVA G4 SKIP → token editorial ausente")
    return
  }

  const slug = `audit-${Date.now()}`

  const doc = {
    _type: "post",
    title: "AUDIT TEST POST",
    slug: { _type: "slug", current: slug },
    publishedAt: new Date().toISOString(),
  }

  const created = await client.create(doc)

  const found = await client.fetch(
    `count(*[_type=="post" && slug.current==$slug])`,
    { slug }
  )

  await client.delete(created._id)

  const gone = await client.fetch(
    `count(*[_type=="post" && slug.current==$slug])`,
    { slug }
  )

  if (found === 1 && gone === 0)
    log(`PROVA G4 PASS → create→read→delete OK`)
  else
    log(`PROVA G4 FAIL → ciclo editorial inconsistente`)
}

async function run() {
  divider()
  log("AUDITORIA BLOG — MODO PROVA")
  divider()

  await gate1_count()
  await gate2_structure()
  await gate4_editorial()

  divider()
  log("FIM DA AUDITORIA")
}

run().catch(e=>{
  console.error("AUDIT ERROR:", e.message)
})
