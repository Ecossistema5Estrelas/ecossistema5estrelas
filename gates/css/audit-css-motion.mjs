import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const scanRoots = ["app", "styles", "components", "ui"];
const ignore = ["node_modules", ".next", "dist", "build", "public", "_archive", "_files"];

// Arquivos que NÃO representam motion de UI (definições/constantes)
const nonUiDefFiles = ["tokens.css", "variables.css", "theme.css"];

const issues = [];
let filesScanned = 0;

function shouldIgnore(p) {
  if (ignore.some(i => p.includes(i))) return true;
  if (nonUiDefFiles.some(f => p.endsWith(path.sep + f) || p.endsWith("/" + f) || p.endsWith("\\" + f))) return true;
  return false;
}

function rel(p) {
  return p.replace(ROOT + path.sep, "");
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (shouldIgnore(full)) continue;

    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(css|tsx|ts|jsx|js)$/.test(full)) continue;

    filesScanned++;
    const src = fs.readFileSync(full, "utf8");

    // --- Heurísticas focadas (MAPEAMENTO) ---

    // 1) transition: all (proibido)
    if (/\btransition\s*:\s*all\b/i.test(src)) {
      issues.push({ code: "MOTION_TRANSITION_ALL", severity: "DESTRUCTIVE", file: rel(full) });
    }

    // 2) animation/transition com duração hardcoded (ex: 200ms, .2s) sem token (var(--duration- / --motion- / --animate- / --easing-))
    //    Observação: mapear, não tentar parse perfeito.
    const hasAnimOrTrans = /\b(animation|transition)\s*:\s*/i.test(src);
    if (hasAnimOrTrans) {
      const hasDurationLiteral = /(\b\d+(\.\d+)?m?s\b)/i.test(src); // 150ms, .2s, 2s etc
      const hasTokenHint = /\bvar\(--(duration|motion|ease|easing|spring|animate)[-a-z0-9]*\)/i.test(src);

      if (hasDurationLiteral && !hasTokenHint) {
        issues.push({ code: "MOTION_DURATION_HARDCODED", severity: "FRAGILE", file: rel(full) });
      }

      // 3) easing hardcoded (ease/ease-in-out/cubic-bezier) sem token
      const hasEasingLiteral = /\b(ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier\()/.test(src);
      if (hasEasingLiteral && !hasTokenHint) {
        issues.push({ code: "MOTION_EASING_HARDCODED", severity: "FRAGILE", file: rel(full) });
      }

      // 4) Falta de reduced-motion (preferência do usuário)
      // CSS: ausência de @media (prefers-reduced-motion)
      // TSX: ausência de "motion-reduce" / "motion-safe" quando há classes de animação
      const isCss = /\.css$/i.test(full);
      const isTsx = /\.tsx$/i.test(full);

      if (isCss) {
        const hasPRM = /prefers-reduced-motion\s*:\s*reduce/i.test(src);
        if (!hasPRM) {
          issues.push({ code: "MOTION_NO_PREFERS_REDUCED_MOTION_GUARD", severity: "A11Y", file: rel(full) });
        }
      }

      if (isTsx) {
        const hasMotionUtility = /\bmotion-reduce:|\bmotion-safe:|\bprefers-reduced-motion\b/i.test(src);
        const hasAnimClassHint = /\banimate-|\btransition\b|\bduration-\d+|\bease-/.test(src);
        if (hasAnimClassHint && !hasMotionUtility) {
          issues.push({ code: "MOTION_TAILWIND_NO_GUARD", severity: "A11Y", file: rel(full) });
        }
      }
    }
  }
}

for (const r of scanRoots) {
  const p = path.join(ROOT, r);
  if (fs.existsSync(p)) walk(p);
}

const ok = issues.length === 0;

const report = {
  gate: "CSS/audit-css-motion",
  ok,
  issues_count: issues.length,
  files_scanned: filesScanned,
  issues
};

fs.mkdirSync("_audit/CSS", { recursive: true });
fs.writeFileSync("_audit/CSS/css-motion.json", JSON.stringify(report, null, 2), "utf8");

fs.writeFileSync(
  "_audit/CSS/css-motion.txt",
  "[GATE] CSS/audit-css-motion\n" +
  "[OK] " + ok + "\n" +
  "[ISSUES] " + issues.length + "\n",
  "utf8"
);

const byCode = {};
for (const it of issues) byCode[it.code] = (byCode[it.code] || 0) + 1;

let summary =
  "CSS MOTION — SUMMARY\n\n" +
  "FILES SCANNED: " + filesScanned + "\n" +
  "ISSUES: " + issues.length + "\n" +
  "STATUS: " + (ok ? "OK" : "MAPPED") + "\n\n" +
  "BREAKDOWN:\n";

const keys = Object.keys(byCode).sort();
for (const k of keys) summary += "- " + k + ": " + byCode[k] + "\n";

fs.writeFileSync("_audit/CSS/css-motion-summary.txt", summary, "utf8");

console.log("CSS/audit-css-motion GATE COMPLETE");
console.log("Report: _audit/CSS/css-motion.json");
console.log("Text: _audit/CSS/css-motion.txt");
console.log("Summary: _audit/CSS/css-motion-summary.txt");

if (!ok) process.exitCode = 1;

