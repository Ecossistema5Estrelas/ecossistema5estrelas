#!/usr/bin/env node
import fs from "fs";
import path from "path";

const CANON_ROOT_NAME = "portal-ecossistema5estrelas";
const cwd = process.cwd();
const base = path.basename(cwd);

function out(status, msg, code) {
  const p = status === "OK" ? "✅" : status === "BLOCKED" ? "🟨" : "❌";
  console.log(`${p} ${status} gate-root: ${msg}`);
  process.exit(code);
}

if (base !== CANON_ROOT_NAME) {
  out("BLOCKED", `Wrong root. Expected '${CANON_ROOT_NAME}', got '${base}' (${cwd})`, 2);
}

if (!fs.existsSync("package.json")) {
  out("FAIL", "Missing package.json at repo root", 1);
}

out("OK", `Canonical root confirmed (${cwd})`, 0);