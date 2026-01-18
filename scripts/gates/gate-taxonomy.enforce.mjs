#!/usr/bin/env node
/**
 * gate-taxonomy.enforce.mjs
 * Gate constitucional: impede posts órfãos e categorias fora do dicionário
 * DRY-RUN por padrão
 */

import fs from "fs";
import process from "process";

const MAP = "reports/sanity-posts.map.json";
const TAXONOMY = "taxonomy.v1.json"; // fonte canônica

const isDryRun = !process.argv.includes("--apply");

function fail(msg) {
  console.error("❌ FAIL:", msg);
  process.exit(1);
}
function ok(msg) { console.log("✅", msg); }

if (!fs.existsSync(MAP)) fail("Mapa ausente: " + MAP);
if (!fs.existsSync(TAXONOMY)) fail("Taxonomia ausente: " + TAXONOMY);

const map = JSON.parse(fs.readFileSync(MAP, "utf8"));
const tax = JSON.parse(fs.readFileSync(TAXONOMY, "utf8"));

const valid = new Set(tax.categories || []);

const orphans = map.orphans || [];

if (orphans.length > 0) {
  fail("Posts órfãos detectados: " + orphans.length);
}

const invalid = [];

for (const k of Object.keys(map.clusters || {})) {
  if (k === "__uncategorized") continue;
  if (!valid.has(k)) invalid.push(k);
}

if (invalid.length > 0) {
  fail("Categorias inválidas: " + invalid.join(", "));
}

if (isDryRun) {
  ok("Dry-run completo. Taxonomia válida.");
  process.exit(0);
}

ok("Taxonomia validada (apply).");