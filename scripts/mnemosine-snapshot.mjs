import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const ARCHIVE = path.join(ROOT, "_archive", "mnemosine");
const TS = new Date().toISOString().replace(/[:.]/g, "-");

const SNAPSHOT_DIR = path.join(ARCHIVE, TS);
fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });

// 1) Coletar estado Git
const git = {
  branch: execSync("git branch --show-current").toString().trim(),
  commit: execSync("git rev-parse HEAD").toString().trim(),
  status: execSync("git status --porcelain").toString().trim(),
};

// 2) Coletar artefatos críticos
const files = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "lib/queries.ts",
  "lib/sanity.ts",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
];

const collected = {};
for (const f of files) {
  if (fs.existsSync(f)) {
    collected[f] = fs.readFileSync(f, "utf8");
  }
}

// 3) Hash determinístico
const hash = crypto
  .createHash("sha256")
  .update(JSON.stringify({ git, collected }))
  .digest("hex");

// 4) Persistência
fs.writeFileSync(path.join(SNAPSHOT_DIR, "meta.json"), JSON.stringify({
  ts: TS,
  git,
  hash,
}, null, 2));

fs.writeFileSync(path.join(SNAPSHOT_DIR, "artifacts.json"), JSON.stringify(collected, null, 2));

console.log("MNEMOSINE SNAPSHOT OK");
console.log("DIR:", SNAPSHOT_DIR);
console.log("HASH:", hash);
