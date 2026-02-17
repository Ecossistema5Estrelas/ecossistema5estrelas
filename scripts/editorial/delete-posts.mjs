#!/usr/bin/env node

import dotenv from "dotenv"
import { createClient } from "@sanity/client"

dotenv.config({ path: ".env.local" })

if (!process.env.SANITY_DATASET)
  throw new Error("SANITY_DATASET missing")

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_EDITORIAL_TOKEN,
  apiVersion: "2023-01-01",
  useCdn: false
})

const ids = [
"SC4hPXylW7qfW2gxm3KFgI",
"EjFWuuGcJh505P3jMJ3b06",
"S2qtfYKXJuhuwr0TYnnz1n",
"EjFWuuGcJh505P3jMJ3eM2",
"EjFWuuGcJh505P3jMJ3eR0",
"YVgrcz49aySnBCWpOjx9aM",
"YVgrcz49aySnBCWpOjxC0M",
"S2qtfYKXJuhuwr0TYno0Gx",
"EjFWuuGcJh505P3jMJ3fri"
]

console.log("Deleting from dataset:", process.env.SANITY_DATASET)

for (const id of ids) {
  await client.delete(id)
  console.log("DELETED:", id)
}

console.log("DONE")
