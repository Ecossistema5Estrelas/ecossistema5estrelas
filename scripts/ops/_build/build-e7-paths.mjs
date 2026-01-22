/**
 * E7 — Build artifact determinístico (sem UI)
 * Input : content/paths/e7.dsl.txt
 * Output: public/_paths/e7-state.json
 * Audit : _audit/E7/e7-state.json
 * Meta  : _audit/E7/e7-build-meta.json
 *
 * Regras:
 *  - Parser puro no core
 *  - IO só aqui
 *  - Saída determinística (normalizada no core)
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { parseE7DSL } from "../../core/e7/models.e7.mjs"

const inFile   = process.argv[2] || "content/paths/e7.dsl.txt"
const outPub   = process.argv[3] || "public/_paths/e7-state.json"
const outAudit = process.argv[4] || "_audit/E7/e7-state.json"

function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex")
}

const dsl = fs.readFileSync(inFile, "utf8")
const nowISO = new Date().toISOString()

const res = parseE7DSL(dsl, { nowISO })
if (!res.ok) {
  console.error("E7 BUILD FAILED")
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

fs.writeFileSync("_audit/E7/e7-build-meta.json", JSON.stringify(meta, null, 2), "utf8")

console.log("E7 BUILD OK")
console.log("Input :", inFile)
console.log("Public:", outPub)
console.log("Audit :", outAudit)
console.log("Meta  :", "_audit/E7/e7-build-meta.json")