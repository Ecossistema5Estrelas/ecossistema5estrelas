import fs from "node:fs"
import path from "node:path"
import { parseE8DSL } from "../../core/e8/models.e8.mjs"

const fixture = process.argv[2] || "scripts/ops/_e8/fixture.e8.dsl.txt"
const outJson = process.argv[3] || "_audit/E8/e8-state.json"

const dsl = fs.readFileSync(fixture, "utf8")
const nowISO = new Date().toISOString()

const res = parseE8DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E8 PARSE FAILED")
  console.error(JSON.stringify(res, null, 2))
  process.exit(1)
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(res.state, null, 2), "utf8")

console.log("E8 PARSE OK")
console.log("Fixture:", fixture)
console.log("Output:", outJson)