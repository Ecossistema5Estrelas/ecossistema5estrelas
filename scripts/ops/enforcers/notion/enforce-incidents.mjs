import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DB_INCIDENTS

if (!NOTION_TOKEN || !DATABASE_ID) {
  console.error("❌ Missing env vars")
  process.exit(1)
}

const STATUS_FIELD = "Status"
const STATUS_CLOSED = "✅ Encerrado"
const STATUS_REVERT = "🟦 Em correção"

const headers = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
}

async function notionFetch(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${res.statusText}\n${txt}`)
  }
  return res.json()
}

async function queryClosed() {
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`

  let all = []
  let cursor = undefined

  while (true) {
    const body = {
      filter: {
        property: STATUS_FIELD,
        status: { equals: STATUS_CLOSED },
      },
      start_cursor: cursor,
    }

    const data = await notionFetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    all.push(...(data.results ?? []))

    if (!data.has_more) break
    cursor = data.next_cursor
  }

  return all
}

function invalid(p) {
  return (
    !p["Causa raiz"]?.rich_text?.length ||
    !p["Princípio derivado"]?.rich_text?.length ||
    !p["Encerrado em"]?.date?.start
  )
}

async function revert(page) {
  console.log("↩️ Reverting:", page.id)

  await notionFetch(
    `https://api.notion.com/v1/pages/${page.id}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        properties: {
          [STATUS_FIELD]: {
            status: { name: STATUS_REVERT },
          },
        },
      }),
    }
  )
}

async function run() {
  console.log("🔎 Running Incident Enforcer")

  const rows = await queryClosed()

  if (!rows.length) {
    console.log("✅ No closed incidents")
    return
  }

  let changed = 0

  for (const r of rows) {
    if (invalid(r.properties)) {
      await revert(r)
      changed++
    }
  }

  console.log(`✅ Finished. Reverted: ${changed}`)
}

run().catch(e => {
  console.error("❌ Failure")
  console.error(e)
  process.exit(1)
})
