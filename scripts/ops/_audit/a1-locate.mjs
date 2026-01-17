import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

/**
 * A1 — LOCATE (LEVE, IMORTAL)
 * - Nunca presume que algo exista
 * - Nunca quebra por ENOENT/EPERM/EACCES
 * - Erro vira dado
 * - Sempre gera _audit/A1/A1-structural.raw.json
 */

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "A1");
const OUT_FILE = path.join(OUT_DIR, "A1-structural.raw.json");

const DEFAULT_EXCLUDES = new Set([
  ".git",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".vercel",
  ".cache",
  ".DS_Store"
]);

function nowIso() {
  return new Date().toISOString();
}

function normRel(absPath) {
  const rel = path.relative(ROOT, absPath);
  return rel === "" ? "." : rel.replaceAll("\\", "/");
}

function classifyError(err) {
  const code = err?.code || "UNKNOWN";
  return {
    code,
    message: String(err?.message || err),
    syscall: err?.syscall,
    path: err?.path
  };
}

async function safeMkdir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: classifyError(err) };
  }
}

async function safeLstat(p) {
  try {
    const st = await fs.lstat(p);
    return { ok: true, st };
  } catch (err) {
    return { ok: false, error: classifyError(err) };
  }
}

async function safeReaddir(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return { ok: true, entries };
  } catch (err) {
    return { ok: false, error: classifyError(err) };
  }
}

function shouldExclude(name) {
  if (!name) return false;
  if (DEFAULT_EXCLUDES.has(name)) return true;
  // Qualquer pasta/arquivo de "contaminação" ou sentinela operacional
  if (name.startsWith("node_modules.PNPM-CONTAMINATED")) return true;
  return false;
}

async function walk(abs, items, stats, seenReal, depth, maxDepth) {
  // Limite de profundidade (evita exploração infinita)
  if (depth > maxDepth) {
    items.push({
      path: normRel(abs),
      kind: "depth-limit",
      exists: true,
      readable: true,
      depth
    });
    stats.depthLimited++;
    return;
  }

  const ls = await safeLstat(abs);
  if (!ls.ok) {
    items.push({
      path: normRel(abs),
      kind: "missing-or-inaccessible",
      exists: false,
      readable: false,
      error: ls.error
    });
    stats.errors++;
    return;
  }

  const st = ls.st;

  // Evitar ciclos por symlink: não segue symlink
  const isSymlink = st.isSymbolicLink();
  if (isSymlink) {
    items.push({
      path: normRel(abs),
      kind: "symlink",
      exists: true,
      readable: true,
      size: Number(st.size),
      mtimeMs: Number(st.mtimeMs)
    });
    stats.symlinks++;
    return;
  }

  if (st.isFile()) {
    items.push({
      path: normRel(abs),
      kind: "file",
      exists: true,
      readable: true,
      size: Number(st.size),
      mtimeMs: Number(st.mtimeMs)
    });
    stats.files++;
    return;
  }

  if (st.isDirectory()) {
    // dedupe por realpath (se disponível) para evitar loops por mounts/junctions
    let real = null;
    try {
      real = await fs.realpath(abs);
    } catch {
      // realpath falhou: não é fatal
      real = null;
    }
    if (real && seenReal.has(real)) {
      items.push({
        path: normRel(abs),
        kind: "dir-duplicate-realpath",
        exists: true,
        readable: true
      });
      stats.dupeRealpath++;
      return;
    }
    if (real) seenReal.add(real);

    items.push({
      path: normRel(abs),
      kind: "dir",
      exists: true,
      readable: true,
      mtimeMs: Number(st.mtimeMs)
    });
    stats.dirs++;

    const rd = await safeReaddir(abs);
    if (!rd.ok) {
      items.push({
        path: normRel(abs),
        kind: "dir-unreadable",
        exists: true,
        readable: false,
        error: rd.error
      });
      stats.errors++;
      return;
    }

    for (const ent of rd.entries) {
      const name = ent.name;

      if (shouldExclude(name)) {
        items.push({
          path: normRel(path.join(abs, name)),
          kind: "excluded",
          exists: true,
          readable: true
        });
        stats.excluded++;
        continue;
      }

      // nunca presume: chama walk e deixa ele registrar erros se faltar
      await walk(path.join(abs, name), items, stats, seenReal, depth + 1, maxDepth);
    }

    return;
  }

  // Outros tipos (FIFO, socket, etc.)
  items.push({
    path: normRel(abs),
    kind: "other",
    exists: true,
    readable: true
  });
  stats.other++;
}

async function main() {
  console.log("A1 LOCATE — INICIADO (CANÔNICO / IMORTAL)");
  console.log("ROOT:", ROOT);

  const mk = await safeMkdir(OUT_DIR);

  const items = [];
  const stats = {
    files: 0,
    dirs: 0,
    symlinks: 0,
    excluded: 0,
    other: 0,
    errors: 0,
    depthLimited: 0,
    dupeRealpath: 0
  };

  const meta = {
    generatedAt: nowIso(),
    root: ROOT,
    platform: process.platform,
    node: process.version,
    hostname: os.hostname(),
    version: "A1-LOCATE-1.1-IMMORTAL",
    outDirOk: mk.ok,
    outDirError: mk.ok ? null : mk.error,
    maxDepth: 25
  };

  // Mesmo que ROOT tenha algum problema (raro), A1 não morre: vira item
  const seenReal = new Set();
  await walk(ROOT, items, stats, seenReal, 0, meta.maxDepth);

  const payload = {
    meta: {
      ...meta,
      total: items.length,
      stats
    },
    items
  };

  // Escrever saída: se falhar, loga mas não mata o processo
  try {
    await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2), "utf8");
    console.log("A1 LOCATE — CONCLUÍDO");
    console.log("OUT:", OUT_FILE);
    console.log("TOTAL ITENS:", items.length);
    console.log("ERROS (como dados):", stats.errors);
  } catch (err) {
    console.error("A1 LOCATE — SAÍDA NÃO PÔDE SER SALVA (SEM QUEBRA)");
    console.error(classifyError(err));
    console.log("TOTAL ITENS (em memória):", items.length);
    console.log("ERROS (como dados):", stats.errors);
  }
}

// A1 nunca faz exit(1). Nunca é crítico.
main().catch(err => {
  console.error("A1 LOCATE — EXCEÇÃO GLOBAL CAPTURADA (SEM QUEBRA)");
  console.error(classifyError(err));
});