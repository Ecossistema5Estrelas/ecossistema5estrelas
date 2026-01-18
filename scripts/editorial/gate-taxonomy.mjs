#!/usr/bin/env node
import fs from "fs";

function out(status, msg, code) {
  const p = status === "OK" ? "✅" : status === "BLOCKED" ? "🟨" : "❌";
  console.log(`${p} ${status} gate-taxonomy: ${msg}`);
  process.exit(code);
}

const TAXON_PATH = process.env.TAXONOMY_PATH || "scripts/editorial/taxonomy.v1.json";
const args = process.argv.slice(2);

// usage: node gate-taxonomy.mjs --themes=slug1,slug2,slug3
const themesArg = args.find(a => a.startsWith("--themes="));
if (!themesArg) out("FAIL", "Missing --themes=... (comma-separated slugs)", 1);

const raw = themesArg.split("=", 2)[1] ?? "";
const list = raw
  .split(",")
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

if (list.length === 0) out("BLOCKED", "No themes provided (min 1)", 2);
if (list.length > 3) out("BLOCKED", `Too many themes (${list.length} > 3)`, 2);

// slug rule: lowercase, digits, hyphen; no leading/trailing hyphen; no double hyphen
const slugOk = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && !s.includes("--") && s.length >= 3 && s.length <= 80;

for (const t of list) {
  if (!slugOk(t)) out("BLOCKED", `Invalid theme slug: '${t}'`, 2);
}

const uniq = Array.from(new Set(list));
if (uniq.length !== list.length) out("BLOCKED", "Duplicate themes are not allowed", 2);

// load taxonomy
if (!fs.existsSync(TAXON_PATH)) out("FAIL", `Taxonomy file not found: ${TAXON_PATH}`, 1);

let tax;
try {
  tax = JSON.parse(fs.readFileSync(TAXON_PATH, "utf8"));
} catch {
  out("FAIL", "Invalid JSON in taxonomy file", 1);
}

if (!tax?.themes || !Array.isArray(tax.themes)) out("FAIL", "Invalid taxonomy schema: missing themes[]", 1);
const known = new Set(tax.themes.map(x => x.slug).filter(Boolean));

const unknown = uniq.filter(t => !known.has(t));
if (unknown.length) {
  out("BLOCKED", `Unknown theme(s): ${unknown.join(", ")} (no implicit themes)`, 2);
}

// semantic-dup hook (future): if taxonomy defines aliases, block aliases
// tax.aliases: { "slug": ["alias1","alias2"] } OR { "alias":"canonical" }
if (tax.aliases && typeof tax.aliases === "object") {
  // alias->canonical form
  for (const t of uniq) {
    if (tax.aliases[t] && typeof tax.aliases[t] === "string") {
      out("BLOCKED", `Theme '${t}' is an alias. Use canonical '${tax.aliases[t]}'`, 2);
    }
  }
}

out("OK", `Themes valid (${uniq.length}): ${uniq.join(", ")}`, 0);