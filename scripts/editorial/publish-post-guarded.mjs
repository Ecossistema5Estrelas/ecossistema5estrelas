#!/usr/bin/env node
import { spawnSync } from "child_process";

function run(cmd, args, allowCodes=[0]) {
  const r = spawnSync(cmd, args, { stdio: "inherit" });
  const code = r.status ?? 1;
  if (!allowCodes.includes(code)) process.exit(code);
  return code;
}

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");

const getArg = (prefix) => {
  const a = argv.find(x => x.startsWith(prefix));
  return a ? (a.split("=",2)[1] || "") : "";
};

const slug   = getArg("--slug=");
const body   = getArg("--body=");
const themes = getArg("--themes="); // comma-separated slugs

console.log("🛡️  PUBLISH GUARDED START");
if (!dryRun) {
  console.log("🟨 BLOCKED publish: Use --dry-run first. Publishing is blocked by constitution.");
  process.exit(2);
}

run("node", ["scripts/editorial/gate-root.mjs"]);
run("node", ["scripts/editorial/gate-path.mjs"]);
run("node", ["scripts/editorial/gate-orthography.mjs"]);

// taxonomy (1–3 temas, existirem no JSON)
if (themes) run("node", ["scripts/editorial/gate-taxonomy.mjs", `--themes=${themes}`], [0,2]);
else {
  console.log("🟨 BLOCKED gate-taxonomy: Missing --themes=... (taxonomy is mandatory for new posts)");
  process.exit(2);
}

if (slug) run("node", ["scripts/editorial/gate-slug.mjs", slug], [0,2]);

if (body) {
  run("node", ["scripts/editorial/gate-size.mjs", body, "256"], [0,2]);
  run("node", ["scripts/editorial/gate-schema.mjs", body], [0,2]);
} else {
  console.log("🟨 BLOCKED gate-schema: Missing --body=... (body is mandatory)");
  process.exit(2);
}

run("node", ["scripts/editorial/gate-collision.mjs", slug || "missing-slug", "posts"], [0,2,3]);

console.log("✅ OK publish: All gates passed in DRY-RUN mode.");
process.exit(0);