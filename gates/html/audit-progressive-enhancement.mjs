import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const GATE_ID = "HTML/audit-progressive-enhancement";

const cwd = process.cwd();
const appDir = path.join(cwd, "app");
const auditDir = path.join(cwd, "_audit", "HTML");
const outJson = path.join(auditDir, "progressive-enhancement.json");
const outTxt  = path.join(auditDir, "progressive-enhancement.txt");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readJsonSafe(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith("_")) continue;
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function isPageFile(fp) {
  const norm = fp.replaceAll("\\", "/");
  if (!norm.includes("/app/")) return false;
  if (!norm.endsWith("/page.tsx") && !norm.endsWith("/page.jsx") && !norm.endsWith("/page.ts")) return false;
  // ignora rotas internas não renderizáveis (se existirem)
  if (norm.includes("/api/")) return false;
  return true;
}

function rel(fp) {
  return path.relative(cwd, fp).replaceAll("\\", "/");
}

function hasUseClient(src) {
  // verifica somente topo (primeiras ~20 linhas)
  const head = src.split(/\r?\n/).slice(0, 40).join("\n");
  return /^\s*["']use client["'];/m.test(head);
}

function hasNoscriptFallback(src) {
  return /<noscript[\s>]/i.test(src) && /<\/noscript>/i.test(src);
}

function readText(fp) {
  return fs.readFileSync(fp, "utf8");
}

function main() {
  ensureDir(auditDir);

  const allowCfgPath = path.join(cwd, "gates", "config", "progressive-enhancement.allow.json");
  const cfg = readJsonSafe(allowCfgPath, { allow_client_pages: [], require_noscript_fallback_for_client_pages: true });

  const allowClient = new Set((cfg.allow_client_pages ?? []).map(String));
  const requireNoscript = cfg.require_noscript_fallback_for_client_pages !== false;

  const files = walk(appDir).filter(isPageFile);

  const issues = [];
  const checks = [];

  for (const fp of files) {
    const r = rel(fp);
    const src = readText(fp);

    const useClient = hasUseClient(src);
    const allowed = allowClient.has(r);

    if (useClient && !allowed) {
      const nos = hasNoscriptFallback(src);

      if (requireNoscript && !nos) {
        issues.push({
          code: "PE_CLIENT_PAGE_NO_FALLBACK",
          file: r,
          message: `Page marcada como "use client" sem <noscript> fallback (Progressive Enhancement exige existência sem JS).`,
        });
      }

      checks.push({ file: r, use_client: true, noscript_fallback: nos, allowed: false });
    } else {
      checks.push({ file: r, use_client: useClient, noscript_fallback: hasNoscriptFallback(src), allowed });
    }
  }

  // Checagem mínima do global-error: manter landmark canônico (id="content") dentro de <main>
  const globalError = path.join(appDir, "global-error.tsx");
  if (fs.existsSync(globalError)) {
    const src = readText(globalError);
    const okMain = /<main[^>]*\bid=["']content["'][^>]*>/i.test(src);
    if (!okMain) {
      issues.push({
        code: "PE_GLOBAL_ERROR_MAIN_ID",
        file: rel(globalError),
        message: `global-error.tsx deve manter <main id="content"> para consistência ontológica durante falha (sem JS).`,
      });
    }
  }

  const ok = issues.length === 0;

  const report = {
    gate: GATE_ID,
    ok,
    issues_count: issues.length,
    issues,
    stats: {
      pages_scanned: files.length
    },
    checks
  };

  const txt =
`[GATE] ${GATE_ID}
[OK] ${ok ? "true" : "false"}
[ISSUES] ${issues.length}
`;

  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8");
  fs.writeFileSync(outTxt, txt, "utf8");

  console.log(`${GATE_ID} GATE COMPLETE`);
  console.log(`Report: ${outJson}`);
  console.log(`Text: ${outTxt}`);

  if (!ok) process.exitCode = 1;
}

main();

