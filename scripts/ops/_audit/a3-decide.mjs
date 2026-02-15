import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

/**
 * A3 — DECIDE (LEVE, IMORTAL)
 * - Lê A1 + A2
 * - Não move, não apaga, não toca em git
 * - Se algo faltar: avisa, continua, nunca quebra
 * - Gera:
 *   _audit/A3/decision-plan.json
 *   _audit/A3/decision-report.txt
 */

const ROOT = process.cwd();

const A1_FILE = path.join(ROOT, "_audit", "A1", "A1-structural.raw.json");
const A2_DIR  = path.join(ROOT, ".governance", "constitution");

const OUT_DIR = path.join(ROOT, "_audit", "A3");
const OUT_PLAN = path.join(OUT_DIR, "decision-plan.json");
const OUT_REPORT = path.join(OUT_DIR, "decision-report.txt");

const A2_FILES = [
  "core_allow.json",
  "blog_allow.json",
  "legacy.json",
  "sandbox_only.json",
  "local_only.json",
  "forbidden.json"
];

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
    const json = JSON.parse(raw);
    return { ok: true, json };
  } catch (e) {
    return { ok: false, error: classifyError(e) };
  }
}

async function safeWriteFile(file, content) {
  try { await fs.writeFile(file, content, "utf8"); return { ok: true }; }
  catch (e) { return { ok: false, error: classifyError(e) }; }
}

/**
 * Regra simples e explícita (constituição mínima):
 * - A2.rules é uma lista de strings (prefixos) OU objetos { prefix, note }.
 * - "prefix" é caminho relativo com / (ex: "scripts/").
 */
function normalizeRules(a2doc) {
  const rules = Array.isArray(a2doc?.rules) ? a2doc.rules : [];
  const out = [];
  for (const r of rules) {
    if (typeof r === "string") out.push({ prefix: r, note: "" });
    else if (r && typeof r === "object" && typeof r.prefix === "string") out.push({ prefix: r.prefix, note: String(r.note || "") });
  }
  // normalizar / e remover vazios
  return out
    .map(x => ({ ...x, prefix: x.prefix.replaceAll("\\", "/").trim() }))
    .filter(x => x.prefix.length > 0);
}

function matchPrefix(p, rules) {
  // "p" já vem com "/"
  for (const r of rules) {
    // match de prefixo simples
    if (p === r.prefix || p.startsWith(r.prefix.endsWith("/") ? r.prefix : (r.prefix + "/"))) return r;
    // também aceitar regra sem barra final: ex "scripts" -> "scripts/"
    if (!r.prefix.endsWith("/") && (p === r.prefix || p.startsWith(r.prefix + "/"))) return r;
  }
  return null;
}

async function main() {
  console.log("A3 DECIDE — INICIADO (LEVE / IMORTAL)");
  console.log("ROOT:", ROOT);

  const mk = await safeMkdir(OUT_DIR);

  // --- Ler A1 (se faltar, continua com vazio)
  const a1 = await safeReadJson(A1_FILE);
  const a1Items = (a1.ok && Array.isArray(a1.json?.items)) ? a1.json.items : [];

  // --- Ler A2 (cada arquivo pode faltar / estar inválido)
  const a2 = {
    core_allow: { ok: false, rules: [], error: null },
    blog_allow: { ok: false, rules: [], error: null },
    legacy: { ok: false, rules: [], error: null },
    sandbox_only: { ok: false, rules: [], error: null },
    local_only: { ok: false, rules: [], error: null },
    forbidden: { ok: false, rules: [], error: null }
  };

  for (const name of A2_FILES) {
    const key = name.replace(".json", "");
    const file = path.join(A2_DIR, name);
    const res = await safeReadJson(file);
    if (res.ok) {
      a2[key] = { ok: true, rules: normalizeRules(res.json), error: null };
    } else {
      a2[key] = { ok: false, rules: [], error: res.error };
    }
  }

  // --- DECISÃO (minimalista)
  // Classificação por prefixos (ordem de precedência):
  // forbidden > local_only > sandbox_only > legacy > blog_allow > core_allow > unknown
  const precedence = ["forbidden","local_only","sandbox_only","legacy","blog_allow","core_allow"];

  const decisions = [];
  let counts = {
    totalConsidered: 0,
    classified: 0,
    unknown: 0,
    byBucket: {
      forbidden: 0,
      local_only: 0,
      sandbox_only: 0,
      legacy: 0,
      blog_allow: 0,
      core_allow: 0,
      unknown: 0
    }
  };

  // A1 inclui "." e muitos diretórios/arquivos; aqui decidimos apenas sobre caminhos relativos válidos
  for (const it of a1Items) {
    const p = (typeof it?.path === "string") ? it.path.replaceAll("\\","/") : null;
    if (!p || p === "." ) continue;

    // opcional: só considerar "file" e "dir" (ignora excluded/depth-limit etc)
    const kind = String(it?.kind || "");
    if (!(kind === "file" || kind === "dir")) continue;

    counts.totalConsidered++;

    let bucket = "unknown";
    let matched = null;

    for (const b of precedence) {
      const m = matchPrefix(p, a2[b].rules);
      if (m) { bucket = b; matched = m; break; }
    }

    if (bucket === "unknown") counts.unknown++;
    else counts.classified++;

    counts.byBucket[bucket]++;

    // A3 não aplica: apenas recomenda
    let action = "KEEP";
    if (bucket === "forbidden") action = "FLAG";
    if (bucket === "local_only") action = "FLAG_LOCAL_ONLY";
    if (bucket === "sandbox_only") action = "FLAG_SANDBOX_ONLY";
    if (bucket === "legacy") action = "KEEP_LEGACY";
    if (bucket === "blog_allow") action = "ALLOW_BLOG";
    if (bucket === "core_allow") action = "ALLOW_CORE";

    decisions.push({
      path: p,
      kind,
      bucket,
      action,
      matchedRule: matched ? matched.prefix : null,
      note: matched ? matched.note : ""
    });
  }

  // --- Plano A3 (máquina)
  const plan = {
    meta: {
      version: "A3-DECIDE-1.0",
      generatedAt: nowIso(),
      root: ROOT,
      platform: process.platform,
      node: process.version,
      hostname: os.hostname(),
      outDirOk: mk.ok,
      outDirError: mk.ok ? null : mk.error,
      inputs: {
        a1: { file: A1_FILE, ok: a1.ok, error: a1.ok ? null : a1.error, items: a1Items.length },
        a2: Object.fromEntries(Object.entries(a2).map(([k,v]) => [k, { ok: v.ok, rules: v.rules.length, error: v.ok ? null : v.error }]))
      },
      counters: counts
    },
    decisions
  };

  // --- Relatório A3 (humano)
  const lines = [];
  lines.push("A3 DECIDE — RELATORIO (LEVE)");
  lines.push(`GERADO: ${plan.meta.generatedAt}`);
  lines.push(`ROOT: ${ROOT}`);
  lines.push("");
  lines.push("INPUTS:");
  lines.push(`- A1: ${plan.meta.inputs.a1.ok ? "OK" : "MISSING/INVALID"} | itens lidos: ${plan.meta.inputs.a1.items}`);
  if (!plan.meta.inputs.a1.ok) lines.push(`  erro: ${JSON.stringify(plan.meta.inputs.a1.error)}`);
  lines.push(`- A2 DIR: ${A2_DIR}`);
  for (const [k,v] of Object.entries(plan.meta.inputs.a2)) {
    lines.push(`  - ${k}.json: ${v.ok ? "OK" : "MISSING/INVALID"} | rules: ${v.rules}${v.ok ? "" : " | erro: " + JSON.stringify(v.error)}`);
  }
  lines.push("");
  lines.push("CONTAGEM (apenas file/dir do A1):");
  lines.push(`- totalConsidered: ${counts.totalConsidered}`);
  lines.push(`- classified: ${counts.classified}`);
  lines.push(`- unknown: ${counts.unknown}`);
  lines.push("BUCKETS:");
  for (const k of Object.keys(counts.byBucket)) {
    lines.push(`- ${k}: ${counts.byBucket[k]}`);
  }
  lines.push("");
  lines.push("OBS:");
  lines.push("- A3 NAO move/apaga/aplica nada. Apenas recomenda (action).");
  lines.push("- Para melhorar a precisão, preencha .governance/constitution/*.json com regras de prefixo.");

  const planWrite = await safeWriteFile(OUT_PLAN, JSON.stringify(plan, null, 2));
  const repWrite  = await safeWriteFile(OUT_REPORT, lines.join("\n") + "\n");

  console.log("A3 DECIDE — CONCLUÍDO");
  console.log("PLAN:", OUT_PLAN, "|", planWrite.ok ? "OK" : "FAIL");
  if (!planWrite.ok) console.log("PLAN ERR:", planWrite.error);
  console.log("REPORT:", OUT_REPORT, "|", repWrite.ok ? "OK" : "FAIL");
  if (!repWrite.ok) console.log("REPORT ERR:", repWrite.error);
}

main().catch(err => {
  console.error("A3 DECIDE — EXCEÇÃO GLOBAL CAPTURADA (SEM QUEBRA)");
  console.error(classifyError(err));
});