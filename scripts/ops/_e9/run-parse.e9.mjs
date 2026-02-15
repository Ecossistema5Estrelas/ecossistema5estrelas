import fs from "node:fs"
import path from "node:path"
import { parseE9DSL } from "../../core/e9/models.e9.mjs"

const fixture = process.argv[2] || "scripts/ops/_e9/fixture.e9.dsl.txt"
const outJson = process.argv[3] || "_audit/E9/e9-state.json"

const dsl = fs.readFileSync(fixture, "utf8")
const nowISO = new Date().toISOString()

const res = parseE9DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E9 PARSE FAILED")
  console.error(JSON.stringify(res, null, 2))
  process.exit(1)
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(res.state, null, 2), "utf8")

console.log("E9 PARSE OK")
console.log("Fixture:", fixture)
console.log("Output:", outJson)