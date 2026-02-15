#!/usr/bin/env node
import fs from "fs";

const requiredDirs = [
  "scripts/editorial",
  "scripts/editorial/lang",
  "_audit/EDITORIAL"
];

function fail(msg, code=1) {
  const p = code === 2 ? "🟨" : "❌";
  console.log(`${p} ${code===2?"BLOCKED":"FAIL"} gate-path: ${msg}`);
  process.exit(code);
}
function ok(msg){ console.log(`✅ OK gate-path: ${msg}`); process.exit(0); }

for (const d of requiredDirs) {
  if (!fs.existsSync(d) || !fs.statSync(d).isDirectory()) {
    fail(`Missing required directory: ${d}`, 1);
  }
}

ok("Required directories present");