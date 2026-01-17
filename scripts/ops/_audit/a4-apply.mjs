/**
 * scripts/ops/_audit/a4-apply.mjs
 * A4 APPLY — Aplicação segura do Plano A3 (CANÔNICO)
 *
 * Regras:
 * - DRY-RUN por padrão com --dry-run
 * - Snapshot Git: stash (-u) + branch audit/a4-apply-YYYYMMDD-HHMMSS (a menos que --skip-git)
 * - LOCAL_ONLY: atualiza .gitignore (apenas roots) + remove do index git SOMENTE top-level sensíveis
 * - LEGACY: move SOMENTE top-level permitidos para _archive/a4-migration/<nome>
 * - PROTEGIDO (NUNCA mover): .governance, _audit, _archive, docs, posts, app, components, lib, public, scripts, studio, styles
 * - SANDBOX_ONLY: não move automaticamente (apenas reporta)
 * - REVIEW/CORE/BLOG: não toca
 */

import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");

const A3_FILE = path.join(ROOT, "_audit", "A3", "decision-plan.json");
const OUT_DIR = path.join(ROOT, "_audit", "A4");
const GITIGNORE_PATH = path.join(ROOT, ".gitignore");
const MIGRATION_DIR = path.join(ROOT, "_archive", "a4-migration");

const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_GIT = process.argv.includes("--skip-git");

const PROTECTED_TOPLEVEL = new Set([
  ".governance",
  "_audit",
  "_archive",
  "docs",
  "posts",
  "app",
  "components",
  "lib",
  "public",
  "scripts",
  "studio",
  "styles",
]);

function nowStamp() {
  // YYYYMMDD-HHMMSS
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "-" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function log(s = "") { console.log(s); }

function gitExec(cmd, silent = false) {
  if (SKIP_GIT) {
    if (!silent) console.log(`[GIT SKIPPED] ${cmd}`);
    return "";
  }
  try {
    const out = execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
    if (!silent) console.log(`✓ ${cmd}`);
    return out;
  } catch (e) {
    const msg = String(e?.message || e);
    console.error(`✗ FALHA: ${cmd}`);
    console.error(msg);
    throw e;
  }
}

function isGitRepo() {
  if (SKIP_GIT) return false;
  try {
    execSync("git rev-parse --is-inside-work-tree", { cwd: ROOT, stdio: ["ignore", "ignore", "ignore"] });
    return true;
  } catch {
    return false;
  }
}

function normalize(p) {
  return String(p || "").replace(/\\/g, "/");
}

function topLevelRoot(p) {
  const n = normalize(p);
  if (!n) return "";
  const parts = n.split("/");
  return parts[0] || "";
}

function isTopLevelPath(p) {
  const n = normalize(p);
  return n.length > 0 && !n.includes("/");
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function gitTracked(relPath) {
  if (SKIP_GIT) return false;
  try {
    const out = execSync(`git ls-files -- "${relPath}"`, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
}

async function readJson(p) {
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function snapshotGit() {
  if (!isGitRepo()) {
    log("\n📸 SNAPSHOT (git): (skip — não é repo git ou --skip-git)");
    return { branch: null, stashed: false };
  }

  log("\n📸 SNAPSHOT (git):");
  const status = gitExec("git status --porcelain", true);
  let stashed = false;

  if (status) {
    log("⚠️  Working tree sujo — criando stash (-u)...");
    gitExec('git stash push -u -m "A4: stash antes de aplicação"', true);
    log("✓ stash criado");
    stashed = true;
  }

  const branch = `audit/a4-apply-${nowStamp()}`;
  gitExec(`git checkout -b ${branch}`);
  log(`✅ Branch criada: ${branch}`);
  return { branch, stashed };
}

async function updateGitignore(roots) {
  log("\n🚫 LOCAL_ONLY → .gitignore (sem poluição)");

  let current = "";
  if (await exists(GITIGNORE_PATH)) current = await fs.readFile(GITIGNORE_PATH, "utf8");

  const markerStart = "# === A4 LOCAL_ONLY (auto) START ===";
  const markerEnd = "# === A4 LOCAL_ONLY (auto) END ===";

  const before = current.split(markerStart)[0] ?? current;
  const after = current.includes(markerEnd) ? current.split(markerEnd).slice(1).join(markerEnd) : "";

  const cleanedRoots = Array.from(new Set(roots))
    .map(r => r.trim())
    .filter(Boolean)
    .sort((a,b)=>a.localeCompare(b));

  const blockLines = [
    markerStart,
    ...cleanedRoots.map(r => r.startsWith("/") ? r : `/${r}`),
    markerEnd,
    "",
  ];

  const next = `${before.trimEnd()}\n\n${blockLines.join("\n")}${after ? after.trimStart() : ""}`.trimEnd() + "\n";

  if (!DRY_RUN) {
    await fs.writeFile(GITIGNORE_PATH, next, "utf8");
  }

  log(`✅ Roots LOCAL_ONLY adicionados/atualizados: ${cleanedRoots.length}`);
  return cleanedRoots;
}

function pickSafeUntrackTopLevel(decisions) {
  // Hard-safety: remover do índice SOMENTE alguns top-level sensíveis
  // (não tentar rm --cached de node_modules/.git etc.)
  const SENSITIVE_TOPLEVEL = new Set([
    ".env",
    ".env.local",
    ".env.production",
    ".env.sentry-build-plugin",
    "tsconfig.tsbuildinfo",
  ]);

  const out = [];
  for (const d of decisions) {
    const p = normalize(d.path);
    if (!isTopLevelPath(p)) continue;
    if (!SENSITIVE_TOPLEVEL.has(p)) continue;
    if (gitTracked(p)) out.push(p);
  }
  return Array.from(new Set(out));
}

async function untrackTopLevel(paths) {
  log("\n🧹 Garantir LOCAL_ONLY fora do índice git (hard safety)");
  const done = [];

  for (const p of paths) {
    const cmd = `git rm --cached -- "${p}"`;
    if (DRY_RUN) {
      log(`(dry-run) ${cmd}`);
      done.push(p);
      continue;
    }
    if (SKIP_GIT) {
      log(`[GIT SKIPPED] ${cmd}`);
      done.push(p);
      continue;
    }
    try {
      execSync(cmd, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
      done.push(p);
    } catch {
      // se já não está no index, ignora
    }
  }

  log(`✅ Remoções do índice (se aplicável): ${done.length}`);
  return done;
}

function pickLegacyTopLevelToMove(decisions) {
  // Só mover TOP-LEVEL e só se NÃO for protegido.
  // Decisões LEGACY podem vir como:
  // - targetClass === "LEGACY"
  // - action === "PLAN_MOVE"
  const candidates = new Set();

  for (const d of decisions) {
    const target = String(d.targetClass || "");
    const action = String(d.action || "");
    const p = normalize(d.path);

    if (!isTopLevelPath(p)) continue;

    const isLegacy = (target === "LEGACY") || (action === "PLAN_MOVE");
    if (!isLegacy) continue;

    const root = topLevelRoot(p);
    if (!root) continue;

    // NUNCA mover protegidos
    if (PROTECTED_TOPLEVEL.has(root)) continue;

    candidates.add(root);
  }

  return Array.from(candidates).sort((a,b)=>a.localeCompare(b));
}

async function moveTopLevelLegacy(roots) {
  log("\n📦 LEGACY → _archive/a4-migration (somente TOP-LEVEL, seguro)");
  await ensureDir(MIGRATION_DIR);

  const moved = [];
  for (const rootName of roots) {
    const src = path.join(ROOT, rootName);
    const dst = path.join(MIGRATION_DIR, rootName);

    if (!(await exists(src))) continue;

    const msg = `MOVE ${rootName} -> ${path.relative(ROOT, dst).replace(/\\/g,"/")}`;
    if (DRY_RUN) {
      log(`(dry-run) ${msg}`);
      moved.push(rootName);
      continue;
    }

    // garantir destino pai
    await ensureDir(path.dirname(dst));

    try {
      await fs.rename(src, dst);
      moved.push(rootName);
    } catch (e) {
      // se rename falhar (ex: cross-device), fallback copy+delete seria pesado;
      // aqui preferimos falhar para manter segurança.
      throw new Error(`Falha ao mover "${rootName}". Motivo: ${String(e?.message || e)}`);
    }
  }

  log(`✅ Itens top-level migrados LEGACY: ${moved.length}`);
  return moved;
}

function countSandboxTop(decisions) {
  const roots = new Set();
  for (const d of decisions) {
    if (String(d.targetClass || "") !== "SANDBOX_ONLY") continue;
    const r = topLevelRoot(d.path);
    if (r) roots.add(r);
  }
  // reportar apenas os top-level conhecidos
  return Array.from(roots).sort((a,b)=>a.localeCompare(b));
}

async function writeReport(payload) {
  await ensureDir(OUT_DIR);

  const jsonPath = path.join(OUT_DIR, "a4-report.json");
  const txtPath = path.join(OUT_DIR, "a4-report.txt");

  const json = JSON.stringify(payload, null, 2);
  await fs.writeFile(jsonPath, json, "utf8");

  const lines = [];
  lines.push("# A4 — RELATORIO DE APLICACAO (CANONICO)");
  lines.push("");
  lines.push(`Timestamp: ${payload.timestamp}`);
  lines.push(`Modo: ${payload.dryRun ? "DRY RUN" : "APLICACAO REAL"}`);
  lines.push(`Branch: ${payload.branch || "(sem git)"}`);
  lines.push("");
  lines.push("## ACOES");
  lines.push(`- Roots LOCAL_ONLY adicionados ao .gitignore: ${payload.actions.gitignoreRoots}`);
  lines.push(`- Remocoes do indice git (LOCAL_ONLY top-level): ${payload.actions.untracked}`);
  lines.push(`- Itens LEGACY movidos (top-level, seguros): ${payload.actions.legacyMoved}`);
  lines.push(`- SANDBOX_ONLY detectados (top-level, mantidos): ${payload.actions.sandboxTop}`);
  lines.push("");
  lines.push("## NOTAS");
  lines.push("- A4 nao apaga nada.");
  lines.push("- A4 nao move: _audit, _archive, docs, .governance e demais CORE/BLOG protegidos.");
  lines.push("- REVIEW/CORE/BLOG nao sao tocados.");
  lines.push("- Rollback: git checkout <branch anterior> (ou main) e git stash pop (se houver).");

  await fs.writeFile(txtPath, lines.join("\n") + "\n", "utf8");
  log(`✅ Relatórios em: ${OUT_DIR}`);
}

async function main() {
  log("A4 APPLY — INICIADO (CANÔNICO)");
  log(`ROOT: ${ROOT}`);
  log(`MODO: ${DRY_RUN ? "DRY RUN" : "APLICAÇÃO REAL"}`);
  log(`A3_FILE: ${A3_FILE}`);

  if (!(await exists(A3_FILE))) {
    throw new Error("A3_FILE não encontrado. Gere o A3 antes: node .\\scripts\\ops\\_audit\\a3-decide.mjs");
  }

  const decisions = await readJson(A3_FILE);
  log(`→ Decisões carregadas: ${decisions.length}`);

  // Snapshot Git
  const snap = await snapshotGit();

  // LOCAL_ONLY roots (somente roots top-level)
  const localRoots = new Set();
  for (const d of decisions) {
    if (String(d.targetClass || "") !== "LOCAL_ONLY") continue;
    const r = topLevelRoot(d.path);
    if (r) localRoots.add(r);
  }

  const gitignoreRoots = await updateGitignore(Array.from(localRoots));

  // Untrack top-level sensíveis
  const toUntrack = pickSafeUntrackTopLevel(decisions);
  const untracked = await untrackTopLevel(toUntrack);

  // LEGACY top-level seguro
  const legacyMoveRoots = pickLegacyTopLevelToMove(decisions);
  const legacyMoved = await moveTopLevelLegacy(legacyMoveRoots);

  // SANDBOX_ONLY apenas reporta
  log("\n🧪 SANDBOX_ONLY → (NÃO MOVE por padrão)");
  const sandboxTop = countSandboxTop(decisions);
  log(`→ SANDBOX_ONLY top-level detectados (mantidos no lugar): ${sandboxTop.length}`);

  // Relatório
  const report = {
    timestamp: new Date().toISOString(),
    dryRun: DRY_RUN,
    branch: snap.branch,
    counts: { totalDecisions: decisions.length },
    actions: {
      gitignoreRoots: gitignoreRoots.length,
      untracked: untracked.length,
      legacyMoved: legacyMoved.length,
      sandboxTop: sandboxTop.length,
    },
    details: {
      gitignoreRoots,
      untracked,
      legacyMoved,
      sandboxTop,
      protected: Array.from(PROTECTED_TOPLEVEL).sort((a,b)=>a.localeCompare(b)),
    },
  };

  await writeReport(report);

  log("\nA4 APPLY — CONCLUÍDO ✅");
  if (!DRY_RUN) {
    log("\nPRÓXIMOS PASSOS:");
    log("  git status");
    log("  git add -A");
    log('  git commit -m "A4: aplicar plano constitucional (local-only + legacy migration)"');
  } else {
    log("\n(dry-run) Execute sem --dry-run para aplicar de verdade.");
  }
}

main().catch((err) => {
  console.error("A4 APPLY — FALHA CRÍTICA");
  console.error(err);
  process.exit(1);
});