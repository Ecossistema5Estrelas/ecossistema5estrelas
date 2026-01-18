#!/usr/bin/env node
/**
 * sanity.collect-posts.mjs
 * Coletor semântico canônico (Sanity como fonte viva)
 * Padrão: DRY-RUN (não escreve arquivos)
 *
 * Uso:
 *   node scripts/collectors/sanity.collect-posts.mjs              # DRY-RUN
 *   node scripts/collectors/sanity.collect-posts.mjs --apply      # gera reports/*
 */

import fs from "fs";
import path from "path";
import process from "process";

const REPORT_JSON = "reports/sanity-posts.map.json";
const REPORT_TXT  = "reports/sanity-posts.map.txt";

const isDryRun = !process.argv.includes("--apply");

function fail(msg) {
  console.error("❌ FAIL:", msg);
  process.exit(1);
}
function ok(msg) { console.log("✅", msg); }
function warn(msg) { console.warn("⚠️", msg); }

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function env(name, fallback = null) {
  const v = process.env[name];
  return (v && String(v).trim().length > 0) ? String(v).trim() : fallback;
}

// -----------------------------
// Gate 1: Variáveis obrigatórias
// -----------------------------
const SANITY_PROJECT_ID   = env("SANITY_PROJECT_ID");
const SANITY_DATASET      = env("SANITY_DATASET");
const SANITY_API_VERSION  = env("SANITY_API_VERSION", "2024-01-01");
const SANITY_READ_TOKEN   = env("SANITY_READ_TOKEN", null); // opcional

if (!SANITY_PROJECT_ID) fail("Variável ausente: SANITY_PROJECT_ID");
if (!SANITY_DATASET)    fail("Variável ausente: SANITY_DATASET");

// -----------------------------
// Cliente Sanity (fail-fast se dep faltar)
// -----------------------------
let createClient;
try {
  ({ createClient } = await import("@sanity/client"));
} catch {
  fail("Dependência ausente: @sanity/client. Instale com: pnpm add -D @sanity/client");
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  token: SANITY_READ_TOKEN || undefined,
});

// -----------------------------
// GROQ (escopo mínimo e explícito)
// -----------------------------
const groq = `*[_type=="post"]|order(coalesce(publishedAt,_createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _createdAt,
  _updatedAt,
  // categorias (normalizadas)
  "categoryTitles": categories[]->title,
  "categorySlugs": categories[]->slug.current
}`;

// -----------------------------
// Validação mínima (contrato)
// -----------------------------
function validate(posts) {
  const errors = [];
  const slugSeen = new Set();
  const idSeen = new Set();

  let missingSlug = 0;
  let missingTitle = 0;
  let orphan = 0;
  let dupSlug = 0;

  for (const p of posts) {
    if (!p?._id) errors.push("Post sem _id");
    if (!p?.slug) missingSlug++;
    if (!p?.title) missingTitle++;

    if (p?._id) {
      if (idSeen.has(p._id)) errors.push("ID duplicado: " + p._id);
      idSeen.add(p._id);
    }

    if (p?.slug) {
      if (slugSeen.has(p.slug)) dupSlug++;
      slugSeen.add(p.slug);
    }

    const cats = Array.isArray(p.categorySlugs) ? p.categorySlugs.filter(Boolean) : [];
    if (cats.length === 0) orphan++;
  }

  // Fail-fast determinístico:
  if (errors.length > 0) fail(errors.join(" | "));
  if (missingSlug > 0) fail(`Contrato violado: ${missingSlug} post(s) sem slug`);
  if (missingTitle > 0) fail(`Contrato violado: ${missingTitle} post(s) sem title`);
  if (dupSlug > 0) fail(`Contrato violado: ${dupSlug} slug(s) duplicado(s)`);

  return { orphan };
}

// -----------------------------
// Mapa conceitual (leve)
// -----------------------------
function buildMap(posts) {
  const clusters = {};         // categorySlug -> [slug]
  const orphans = [];          // slugs sem categoria

  for (const p of posts) {
    const slug = p.slug;
    const cats = Array.isArray(p.categorySlugs) ? p.categorySlugs.filter(Boolean) : [];

    if (cats.length === 0) {
      orphans.push(slug);
      const k = "__uncategorized";
      if (!clusters[k]) clusters[k] = [];
      clusters[k].push(slug);
      continue;
    }

    for (const c of cats) {
      if (!clusters[c]) clusters[c] = [];
      clusters[c].push(slug);
    }
  }

  // sinais mínimos para navegação semântica
  return {
    source: "sanity",
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    totalPosts: posts.length,
    totalClusters: Object.keys(clusters).length,
    clusters,
    orphans,
    generatedAt: new Date().toISOString(),
  };
}

// -----------------------------
// Execução
// -----------------------------
console.log("🔎 Coletor Sanity — Modo:", isDryRun ? "DRY-RUN" : "APPLY");

let posts;
try {
  posts = await client.fetch(groq, {});
} catch (e) {
  fail("Falha ao consultar Sanity (GROQ). Verifique credenciais/dataset/token. Detalhe: " + (e?.message || String(e)));
}

if (!Array.isArray(posts)) fail("Resposta inválida do Sanity: esperado array");

const { orphan } = validate(posts);
const map = buildMap(posts);

// Output curto e determinístico
console.log("📦 Posts:", map.totalPosts);
console.log("🧠 Clusters:", map.totalClusters);
if (orphan > 0) warn(`Órfãos (sem categoria): ${orphan}`);

// DRY-RUN não escreve
if (isDryRun) {
  ok("Dry-run completo. Nenhum arquivo foi escrito.");
  process.exit(0);
}

// APPLY escreve reports (curto)
ensureDir(REPORT_JSON);
ensureDir(REPORT_TXT);

fs.writeFileSync(REPORT_JSON, JSON.stringify(map, null, 2), "utf8");

let txt = `MAPA CONCEITUAL — SANITY\n\n`;
txt += `Project: ${map.projectId}\nDataset: ${map.dataset}\nAPI: ${map.apiVersion}\n`;
txt += `Total de posts: ${map.totalPosts}\nTotal de clusters: ${map.totalClusters}\n`;
txt += `Orfãos (sem categoria): ${map.orphans.length}\n\nClusters:\n`;

for (const [k, v] of Object.entries(map.clusters)) {
  txt += `- ${k}: ${v.length}\n`;
}

fs.writeFileSync(REPORT_TXT, txt, "utf8");

ok("Relatórios gerados:");
console.log(" -", REPORT_JSON);
console.log(" -", REPORT_TXT);