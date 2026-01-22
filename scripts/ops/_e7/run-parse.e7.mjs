import fs from "node:fs"
import path from "node:path"
import { parseE7DSL } from "../../core/e7/models.e7.mjs"

const fixture = process.argv[2] || "scripts/ops/_e7/fixture.e7.dsl.txt"
const outJson = process.argv[3] || "_audit/E7/e7-state.json"

const dsl = fs.readFileSync(fixture, "utf8")
const nowISO = new Date().toISOString()

const res = parseE7DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E7 PARSE FAILED")
  console.error(JSON.stringify(res, null, 2))
  process.exit(1)
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(res.state, null, 2), "utf8")

console.log("E7 PARSE OK")
console.log("Fixture:", fixture)
console.log("Output:", outJson)