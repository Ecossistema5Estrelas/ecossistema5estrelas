/**
 * E9 — Runner (patch mínimo)
 * 1) Build artifact (public + _audit)
 * 2) Gate formal (relatórios) com coerência E6/E7/E8
 *
 * Saídas:
 *  - public/_plans/e9-state.json
 *  - _audit/E9/e9-state.json
 *  - _audit/E9/e9-build-meta.json
 *  - _audit/E9/e9-gate.json
 *  - _audit/E9/e9-gate.txt
 */

import { spawnSync } from "node:child_process"

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const build = "scripts/ops/_build/build-e9-plans.mjs"
const gate  = "scripts/ops/_audit/e9/audit-e9-planning-simulation.mjs"

run("node", [build, "content/plans/e9.dsl.txt", "public/_plans/e9-state.json", "_audit/E9/e9-state.json"])
run("node", [gate,  "content/plans/e9.dsl.txt", "public/_indices/e6-state.json", "public/_paths/e7-state.json", "public/_memory/e8-state.json", "_audit/E9/e9-gate.json", "_audit/E9/e9-gate.txt"])

console.log("E9 PATCH RUN COMPLETE")