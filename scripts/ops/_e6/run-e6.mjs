/**
 * E6 — Runner (patch mínimo)
 * 1) Build artifact (public + _audit)
 * 2) Gate formal (relatórios)
 *
 * Saídas:
 *  - public/_indices/e6-state.json
 *  - _audit/E6/e6-state.json
 *  - _audit/E6/e6-build-meta.json
 *  - _audit/E6/e6-gate.json
 *  - _audit/E6/e6-gate.txt
 */

import { spawnSync } from "node:child_process"

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const build = "scripts/ops/_build/build-e6-indices.mjs"
const gate  = "scripts/ops/_audit/e6/audit-e6-cognitive-indexes.mjs"

run("node", [build, "content/indices/e6.dsl.txt", "public/_indices/e6-state.json", "_audit/E6/e6-state.json"])
run("node", [gate,  "content/indices/e6.dsl.txt", "_audit/E6/e6-gate.json", "_audit/E6/e6-gate.txt"])

console.log("E6 PATCH RUN COMPLETE")