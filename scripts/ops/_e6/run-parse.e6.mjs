import fs from "node:fs"
import path from "node:path"
import { parseE6DSL } from "../../core/e6/models.e6.mjs"

const fixture = process.argv[2] || "scripts/ops/_e6/fixture.e6.dsl.txt"
const outJson = process.argv[3] || "_audit/E6/e6-state.json"

const dsl = fs.readFileSync(fixture, "utf8")
const nowISO = new Date().toISOString()

const res = parseE6DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E6 PARSE FAILED")
  console.error(JSON.stringify(res, null, 2))
  process.exit(1)
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(res.state, null, 2), "utf8")
console.log("E6 PARSE OK")
console.log("Fixture:", fixture)
console.log("Output:", outJson)