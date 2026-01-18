#!/usr/bin/env node
import fs from "fs";

function fail(msg) {
  console.error("❌ ORTHOGRAPHY GATE FAILED:", msg);
  process.exit(1);
}

function ok(msg) {
  console.log("✅ ORTHOGRAPHY GATE OK:", msg);
}

const dictPath = "scripts/editorial/lang/pt-br.json";

if (!fs.existsSync(dictPath)) {
  fail(`Dictionary not found: ${dictPath}`);
}

let dict;
try {
  dict = JSON.parse(fs.readFileSync(dictPath, "utf8"));
} catch {
  fail("Invalid JSON in dictionary");
}

if (!dict.meta || dict.meta.lang !== "pt-BR") {
  fail("Invalid dictionary schema");
}

ok("Dictionary loaded and schema valid");
process.exit(0);