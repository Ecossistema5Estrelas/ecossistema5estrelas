#!/usr/bin/env node
import fs from "fs";
import path from "path";

const TAXON_PATH = "scripts/editorial/taxonomy.v1.json";
const POSTS_DIR = "posts"; // ajuste se necessário
const OUT_JSON = "reports/semantic-summary.json";
const OUT_TXT  = "reports/semantic-summary.txt";

function fail(msg) {
  console.error("❌ FAIL semantic-collector:", msg);
  process.exit(1);
}

function ok(msg) {
  console.log("✅", msg);
}

if (!fs.existsSync(TAXON_PATH)) fail("Taxonomy not found: " + TAXON_PATH);
if (!fs.existsSync(POSTS_DIR)) fail("Posts directory not found: " + POSTS_DIR);

let taxonomy;
try {
  taxonomy = JSON.parse(fs.readFileSync(TAXON_PATH, "utf8"));
} catch {
  fail("Invalid taxonomy JSON");
}

const themes = taxonomy.themes.map(t => t.slug);
const themeSet = new Set(themes);

const summary = {
  generatedAt: new Date().toISOString(),
  taxonomyVersion: taxonomy.version,
  totals: {
    posts: 0,
    withThemes: 0,
    withoutThemes: 0
  },
  byTheme: {},
  bySeries: {},
  byLevel: {},
  overlaps: [],
  unclassified: [],
  perPost: []
};

themes.forEach(t => {
  summary.byTheme[t] = { count: 0, posts: [] };
});

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".json"));

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  let post;
  try {
    post = JSON.parse(fs.readFileSync(full, "utf8"));
  } catch {
    fail("Invalid JSON in post: " + file);
  }

  summary.totals.posts++;

  const slug = post.slug || file.replace(".json","");
  const themesUsed = Array.isArray(post.themes) ? post.themes : [];

  summary.perPost.push({
    slug,
    themes: themesUsed,
    series: post.series || null,
    level: post.level || null
  });

  if (!themesUsed.length) {
    summary.totals.withoutThemes++;
    summary.unclassified.push(slug);
  } else {
    summary.totals.withThemes++;
  }

  if (themesUsed.length > 1) {
    summary.overlaps.push({ slug, themes: themesUsed });
  }

  for (const t of themesUsed) {
    if (!themeSet.has(t)) continue;
    summary.byTheme[t].count++;
    summary.byTheme[t].posts.push(slug);
  }

  if (post.series) {
    summary.bySeries[post.series] = summary.bySeries[post.series] || { count: 0, posts: [] };
    summary.bySeries[post.series].count++;
    summary.bySeries[post.series].posts.push(slug);
  }

  if (post.level) {
    summary.byLevel[post.level] = summary.byLevel[post.level] || { count: 0, posts: [] };
    summary.byLevel[post.level].count++;
    summary.byLevel[post.level].posts.push(slug);
  }
}

// Generate TXT (human)
let txt = "";
txt += "SEMANTIC SUMMARY\n";
txt += "Generated: " + summary.generatedAt + "\n";
txt += "Taxonomy: v" + summary.taxonomyVersion + "\n\n";

txt += "TOTAL POSTS: " + summary.totals.posts + "\n";
txt += "WITH THEMES: " + summary.totals.withThemes + "\n";
txt += "WITHOUT THEMES: " + summary.totals.withoutThemes + "\n\n";

txt += "BY THEME:\n";
for (const [k,v] of Object.entries(summary.byTheme)) {
  txt += `- ${k}: ${v.count}\n`;
}

txt += "\nUNCLASSIFIED POSTS:\n";
summary.unclassified.forEach(s => txt += "- " + s + "\n");

txt += "\nOVERLAPS (multi-theme posts):\n";
summary.overlaps.forEach(o => {
  txt += `- ${o.slug}: ${o.themes.join(", ")}\n`;
});

fs.writeFileSync(OUT_JSON, JSON.stringify(summary, null, 2), "utf8");
fs.writeFileSync(OUT_TXT, txt, "utf8");

ok("Semantic summary generated:");
ok(" - " + OUT_JSON);
ok(" - " + OUT_TXT);