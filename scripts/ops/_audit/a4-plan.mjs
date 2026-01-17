import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

/**
 * A4 — PLAN (LEVE, DRY-RUN ONLY)
 * - NÃO move, NÃO apaga, NÃO toca em git
 * - Lê _audit/A3/decision-plan.json
 * - Foca nos "unknown" e gera plano/recomendações para ajustar A2
 * - Saídas:
 *   _audit/A4/plan.json
 *   _audit/A4/plan-report.txt
 */

const ROOT = process.cwd();
const IN_A3 = path.join(ROOT, "_audit", "A3", "decision-plan.json");
const OUT_DIR = path.join(ROOT, "_audit", "A4");
const OUT_PLAN = path.join(OUT_DIR, "plan.json");
const OUT_REPORT = path.join(OUT_DIR, "plan-report.txt");

function nowIso() { return new Date().toISOString(); }

function classifyError(err) {
  return {
    code: err?.code || "UNKNOWN",
    message: String(err?.message || err),
    syscall: err?.syscall,
    path: err?.path
  };
}

async function safeMkdir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); return { ok: true }; }
  catch (e) { return { ok: false, error: classifyError(e) }; }
}

async function safeReadJson(file) {
  try {
    const raw = await fs.readFile(file, "utf8");
    return { ok: true, json: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, error: classifyError(e) };
  }
}

async function safeWrite(file, content) {
  try { await fs.writeFile(file, content, "utf8"); return { ok: true }; }
  catch (e) { return { ok: false, error: classifyError(e) }; }
}

function norm(p) { return String(p || "").replaceAll("\\", "/"); }

function topPrefix(p) {
  // primeiro segmento (ex: "app/", ".github/", "sanity/", "_audit/", "README")
  if (!p || p === ".") return ".";
  const s = p.split("/");
  if (s.length === 1) return s[0]; // ex: "README.md"
  return s[0] + "/";
}

function ext(p) {
  const b = p.split("/").pop() || "";
  const i = b.lastIndexOf(".");
  if (i <= 0) return "";
  return b.slice(i).toLowerCase();
}

function suggestBucket(p) {
  // Heurísticas CONSERVADORAS (não “inventam” movimento; apenas sugerem regra A2)
  // Objetivo: reduzir unknown sem criar dívida.
  const s = norm(p);

  // Não versionáveis / runtime / caches (só sugestão)
  const forbidden = [
    "node_modules/",
    ".next/",
    "dist/",
    "build/",
    "coverage/",
    ".turbo/",
    ".vercel/",
    ".pnpm/",
  ];
  for (const pref of forbidden) {
    if (s.startsWith(pref)) return { bucket: "forbidden", confidence: 0.95, reason: `prefix '${pref}'` };
  }

  // Local-only típico
  if (s.startsWith(".env") || s.endsWith(".log") || s.startsWith("tmp/") || s.startsWith("cache/") || s.startsWith("secrets/")) {
    return { bucket: "local_only", confidence: 0.9, reason: "local env/log/tmp/cache/secrets pattern" };
  }

  // Blog/CMS
  if (s.startsWith("sanity/") || s.startsWith("content/") || s.startsWith("posts/") || s.startsWith("blog/") || s.startsWith("media/")) {
    return { bucket: "blog_allow", confidence: 0.85, reason: "blog/cms/content prefix" };
  }

  // Core típico
  if (s.startsWith("apps/") || s.startsWith("packages/") || s.startsWith("src/") || s.startsWith("scripts/") || s.startsWith("_audit/") || s.startsWith(".governance/") || s.startsWith("public/") || s.startsWith("docs/")) {
    return { bucket: "core_allow", confidence: 0.85, reason: "core prefix" };
  }

  // Sandbox típico
  if (s.startsWith("experiments/") || s.startsWith("tests/") || s.startsWith("scratch/") || s.startsWith("playground/") || s.startsWith("prototypes/")) {
    return { bucket: "sandbox_only", confidence: 0.85, reason: "sandbox prefix" };
  }

  // Legado típico
  if (s.startsWith("old/") || s.startsWith("deprecated/") || s.startsWith("legacy/") || s.startsWith("v1/") || s.startsWith("archive/")) {
    return { bucket: "legacy", confidence: 0.75, reason: "legacy prefix" };
  }

  // Meta/repo tooling (frequente em raiz): sugere CORE (governável), mas com menor confiança
  const rootTooling = new Set([
    ".github/", ".vscode/", ".husky/", ".changeset/", ".storybook/", ".circleci/", ".gitlab/", ".azuredevops/"
  ]);
  if (rootTooling.has(topPrefix(s))) {
    return { bucket: "core_allow", confidence: 0.6, reason: "repo tooling (suggest core governance)" };
  }

  // Arquivos de config na raiz
  const e = ext(s);
  const base = s.split("/").pop() || "";
  const commonConfigs = [
    "package.json","pnpm-lock.yaml","yarn.lock","package-lock.json",
    "tsconfig.json","next.config.js","next.config.mjs","tailwind.config.js","tailwind.config.ts",
    "postcss.config.js","eslint.config.js",".eslintrc",".prettierrc","prettier.config.js",
    "vercel.json","turbo.json","vitest.config.ts","jest.config.js","playwright.config.ts",
    "README.md","LICENSE","SECURITY.md","CODEOWNERS",".editorconfig",".gitignore"
  ];
  if (commonConfigs.includes(base) || e === ".json" || e === ".yml" || e === ".yaml" || e === ".md" || e === ".toml" || e === ".ini") {
    return { bucket: "core_allow", confidence: 0.55, reason: "likely repo/core config-doc" };
  }

  // Default: aguarda decisão humana (permanece unknown)
  return { bucket: "unknown", confidence: 0.0, reason: "needs explicit governance rule" };
}

function inc(map, key, by = 1) { map.set(key, (map.get(key) || 0) + by); }

async function main() {
  console.log("A4 PLAN — INICIADO (DRY-RUN ONLY)");
  console.log("ROOT:", ROOT);

  const mk = await safeMkdir(OUT_DIR);
  const a3 = await safeReadJson(IN_A3);

  const meta = {
    version: "A4-PLAN-1.0",
    generatedAt: nowIso(),
    root: ROOT,
    platform: process.platform,
    node: process.version,
    hostname: os.hostname(),
    outDirOk: mk.ok,
    outDirError: mk.ok ? null : mk.error,
    inputA3: { file: IN_A3, ok: a3.ok, error: a3.ok ? null : a3.error }
  };

  const decisions = (a3.ok && Array.isArray(a3.json?.decisions)) ? a3.json.decisions : [];
  const unknown = decisions.filter(d => d && d.bucket === "unknown");

  // Agrupamentos
  const byTop = new Map();
  const byExt = new Map();
  const suggested = new Map(); // bucket -> count

  const items = [];
  for (const d of unknown) {
    const p = norm(d.path);
    const t = topPrefix(p);
    const e = ext(p) || "(noext)";
    inc(byTop, t);
    inc(byExt, e);

    const sug = suggestBucket(p);
    inc(suggested, sug.bucket);

    items.push({
      path: p,
      kind: d.kind,
      top: t,
      ext: e,
      suggestion: sug
    });
  }

  // Ordenação
  const topSorted = [...byTop.entries()].sort((a,b) => b[1]-a[1]).slice(0, 40);
  const extSorted = [...byExt.entries()].sort((a,b) => b[1]-a[1]).slice(0, 40);
  const sugSorted = [...suggested.entries()].sort((a,b) => b[1]-a[1]);

  // Recomendações A2 (propostas) — apenas para reduzir unknown com segurança
  // Regra: só sugerir adicionar prefixos quando:
  // - top-level é consistente (ex: ".github/")
  // - e o bucket sugerido não é "unknown"
  const a2Proposals = [];
  for (const [pref, count] of topSorted) {
    // não propor para "." ou arquivos soltos; só prefixos com "/"
    if (!pref.endsWith("/")) continue;
    // pegar 1 amostra para inferir sugestão
    const sample = items.find(x => x.top === pref);
    if (!sample) continue;
    const sug = sample.suggestion;
    if (sug.bucket === "unknown") continue;

    a2Proposals.push({
      targetFile: `.governance/constitution/${sug.bucket}.json`,
      addRule: { prefix: pref, note: `AUTO-PROPOSAL: reduce unknown (${count} items). Reason: ${sug.reason}` },
      count,
      confidence: sug.confidence
    });
  }

  const plan = {
    meta: {
      ...meta,
      counters: {
        unknownItems: unknown.length,
        topGroups: topSorted.length,
        extGroups: extSorted.length
      }
    },
    summary: {
      unknownCount: unknown.length,
      topPrefixes: topSorted.map(([k,v]) => ({ prefix: k, count: v })),
      topExtensions: extSorted.map(([k,v]) => ({ ext: k, count: v })),
      suggestions: sugSorted.map(([k,v]) => ({ bucket: k, count: v }))
    },
    proposals: {
      a2AddPrefixRules: a2Proposals
    },
    items
  };

  // Report humano
  const L = [];
  L.push("A4 PLAN — RELATORIO (DRY-RUN ONLY)");
  L.push(`GERADO: ${plan.meta.generatedAt}`);
  L.push(`ROOT: ${ROOT}`);
  L.push("");
  L.push("ENTRADA:");
  L.push(`- A3: ${meta.inputA3.ok ? "OK" : "MISSING/INVALID"}`);
  if (!meta.inputA3.ok) L.push(`  erro: ${JSON.stringify(meta.inputA3.error)}`);
  L.push("");
  L.push(`UNKNOWN ITENS: ${unknown.length}`);
  L.push("");
  L.push("TOP PREFIXOS (UNKNOWN):");
  for (const [k,v] of topSorted) L.push(`- ${k}: ${v}`);
  L.push("");
  L.push("TOP EXTENSOES (UNKNOWN):");
  for (const [k,v] of extSorted) L.push(`- ${k}: ${v}`);
  L.push("");
  L.push("SUGESTOES (HEURISTICAS) — APENAS PROPOSTA:");
  for (const [k,v] of sugSorted) L.push(`- ${k}: ${v}`);
  L.push("");
  L.push("PROPOSTAS A2 (ADICIONAR PREFIXOS) — NAO APLICADAS:");
  if (a2Proposals.length === 0) {
    L.push("- (nenhuma proposta segura encontrada)");
  } else {
    for (const p of a2Proposals) {
      L.push(`- ${p.targetFile}  +=  ${p.addRule.prefix}  (itens: ${p.count}, conf: ${p.confidence})`);
    }
  }
  L.push("");
  L.push("OBS:");
  L.push("- A4-PLAN NAO move/apaga/aplica nada.");
  L.push("- Para aplicar mudanças, crie um A4-APPLY separado com branch + dry-run + confirmação humana.");
  L.push("- Recomenda-se revisar os unknown antes de promover regras para CORE/BLOG.");
  L.push("");

  const w1 = await safeWrite(OUT_PLAN, JSON.stringify(plan, null, 2));
  const w2 = await safeWrite(OUT_REPORT, L.join("\n"));

  console.log("A4 PLAN — CONCLUÍDO");
  console.log("PLAN:", OUT_PLAN, "|", w1.ok ? "OK" : "FAIL");
  if (!w1.ok) console.log("PLAN ERR:", w1.error);
  console.log("REPORT:", OUT_REPORT, "|", w2.ok ? "OK" : "FAIL");
  if (!w2.ok) console.log("REPORT ERR:", w2.error);
}

main().catch(err => {
  console.error("A4 PLAN — EXCEÇÃO GLOBAL CAPTURADA (SEM QUEBRA)");
  console.error(classifyError(err));
});