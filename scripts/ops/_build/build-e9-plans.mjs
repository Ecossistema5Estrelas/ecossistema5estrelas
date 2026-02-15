/**
 * E9 — Build artifact determinístico (sem UI)
 * Input : content/plans/e9.dsl.txt
 * Output: public/_plans/e9-state.json
 * Audit : _audit/E9/e9-state.json
 * Meta  : _audit/E9/e9-build-meta.json
 *
 * Regras:
 *  - Parser puro no core
 *  - IO só aqui
 *  - Saída determinística (normalizada no core)
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE9DSL } from "../../core/e9/models.e9.mjs"

const inFile   = process.argv[2] || "content/plans/e9.dsl.txt"
const outPub   = process.argv[3] || "public/_plans/e9-state.json"
const outAudit = process.argv[4] || "_audit/E9/e9-state.json"

function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex")
}

const dsl = fs.readFileSync(inFile, "utf8")
const nowISO = new Date().toISOString()

const res = parseE9DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E9 BUILD FAILED")
  console.error(JSON.stringify(res, null, 2))
  process.exit(1)
}

const stateJson = JSON.stringify(res.state, null, 2)
const meta = {
  input: inFile,
  generatedAtISO: nowISO,
  hashes: {
    dsl_sha256: sha256(dsl),
    state_sha256: sha256(JSON.stringify(res.state)),
  }
}

fs.mkdirSync(path.dirname(outPub), { recursive: true })
fs.mkdirSync(path.dirname(outAudit), { recursive: true })

fs.writeFileSync(outPub, stateJson, "utf8")
fs.writeFileSync(outAudit, stateJson, "utf8")

fs.writeFileSync("_audit/E9/e9-build-meta.json", JSON.stringify(meta, null, 2), "utf8")

console.log("E9 BUILD OK")
console.log("Input :", inFile)
console.log("Public:", outPub)
console.log("Audit :", outAudit)
console.log("Meta  :", "_audit/E9/e9-build-meta.json")