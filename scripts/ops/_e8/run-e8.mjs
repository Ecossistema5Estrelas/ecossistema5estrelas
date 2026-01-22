/**
 * E8 — Runner (patch mínimo)
 * 1) Build artifact (public + _audit)
 * 2) Gate formal (relatórios) com coerência E6/E7
 *
 * Saídas:
 *  - public/_memory/e8-state.json
 *  - _audit/E8/e8-state.json
 *  - _audit/E8/e8-build-meta.json
 *  - _audit/E8/e8-gate.json
 *  - _audit/E8/e8-gate.txt
 */

import { spawnSync } from "node:child_process"

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const build = "scripts/ops/_build/build-e8-memory.mjs"
const gate  = "scripts/ops/_audit/e8/audit-e8-continuity-memory.mjs"

run("node", [build, "content/memory/e8.dsl.txt", "public/_memory/e8-state.json", "_audit/E8/e8-state.json"])
run("node", [gate,  "content/memory/e8.dsl.txt", "public/_indices/e6-state.json", "public/_paths/e7-state.json", "_audit/E8/e8-gate.json", "_audit/E8/e8-gate.txt"])

console.log("E8 PATCH RUN COMPLETE")