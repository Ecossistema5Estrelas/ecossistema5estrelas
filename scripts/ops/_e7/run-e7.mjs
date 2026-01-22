/**
 * E7 — Runner (patch mínimo)
 * 1) Build artifact (public + _audit)
 * 2) Gate formal (relatórios) com coerência E6
 *
 * Saídas:
 *  - public/_paths/e7-state.json
 *  - _audit/E7/e7-state.json
 *  - _audit/E7/e7-build-meta.json
 *  - _audit/E7/e7-gate.json
 *  - _audit/E7/e7-gate.txt
 */

import { spawnSync } from "node:child_process"

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const build = "scripts/ops/_build/build-e7-paths.mjs"
const gate  = "scripts/ops/_audit/e7/audit-e7-adaptive-paths.mjs"

run("node", [build, "content/paths/e7.dsl.txt", "public/_paths/e7-state.json", "_audit/E7/e7-state.json"])
run("node", [gate,  "content/paths/e7.dsl.txt", "public/_indices/e6-state.json", "_audit/E7/e7-gate.json", "_audit/E7/e7-gate.txt"])

console.log("E7 PATCH RUN COMPLETE")