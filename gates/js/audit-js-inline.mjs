import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const scanRoots = ["app", "styles", "components", "ui", "pages", "src"];
const ignore = ["node_modules", ".next", "dist", "build", "public", "_archive", "_files"];

const issues = [];
let filesScanned = 0;

function shouldIgnore(p) {
  return ignore.some(i => p.includes(i));
}

function rel(p) {
  return p.replace(ROOT + path.sep, "").replaceAll("\\", "/");
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

    if (!/\.(tsx|jsx|ts|js|html)$/.test(full)) continue;

    filesScanned++;
    const src = fs.readFileSync(full, "utf8");

    // 1) HTML inline handlers (onclick="", onload="", etc.) e javascript: URLs
    if (/\son[a-z]+\s*=\s*["'][^"']+["']/i.test(src)) {
      issues.push({ code: "JS_HTML_INLINE_HANDLER", severity: "DESTRUCTIVE", file: rel(full) });
    }
    if (/\bhref\s*=\s*["']\s*javascript:/i.test(src)) {
      issues.push({ code: "JS_JAVASCRIPT_URL", severity: "DESTRUCTIVE", file: rel(full) });
    }

    // 2) React/JSX inline event handlers (onClick={() => ...}, onSubmit={function...})
    // Heurística: prop onXxx= { ( ... ) => ... } ou { function ... } ou { async (...) => ... }
    if (/\bon[A-Z][A-Za-z0-9]*\s*=\s*\{\s*(async\s*)?\([^}]*\)\s*=>/m.test(src)) {
      issues.push({ code: "JSX_INLINE_EVENT_HANDLER", severity: "FRAGILE", file: rel(full) });
    }
    if (/\bon[A-Z][A-Za-z0-9]*\s*=\s*\{\s*(async\s*)?function\b/m.test(src)) {
      issues.push({ code: "JSX_INLINE_EVENT_HANDLER", severity: "FRAGILE", file: rel(full) });
    }

    // 3) dangerouslySetInnerHTML (inline injection)
    if (/\bdangerouslySetInnerHTML\s*=\s*\{/m.test(src)) {
      issues.push({ code: "JSX_DANGEROUSLY_SET_INNER_HTML", severity: "DESTRUCTIVE", file: rel(full) });
    }

    // 4) Inline script injection patterns comuns
    if (/\binnerHTML\s*=\s*["'`]/m.test(src)) {
      issues.push({ code: "JS_INNER_HTML_ASSIGNMENT", severity: "FRAGILE", file: rel(full) });
    }
  }
}

for (const r of scanRoots) {
  const p = path.join(ROOT, r);
  if (fs.existsSync(p)) walk(p);
}

const ok = issues.length === 0;

const report = {
  gate: "JS/audit-js-inline",
  ok,
  issues_count: issues.length,
  files_scanned: filesScanned,
  issues
};

fs.mkdirSync("_audit/JS", { recursive: true });
fs.writeFileSync("_audit/JS/js-inline.json", JSON.stringify(report, null, 2), "utf8");

fs.writeFileSync(
  "_audit/JS/js-inline.txt",
  "[GATE] JS/audit-js-inline\n" +
  "[OK] " + ok + "\n" +
  "[ISSUES] " + issues.length + "\n",
  "utf8"
);

const byCode = {};
for (const it of issues) byCode[it.code] = (byCode[it.code] || 0) + 1;

let summary =
  "JS INLINE — SUMMARY\n\n" +
  "FILES SCANNED: " + filesScanned + "\n" +
  "ISSUES: " + issues.length + "\n" +
  "STATUS: " + (ok ? "OK" : "MAPPED") + "\n\n" +
  "BREAKDOWN:\n";

for (const k of Object.keys(byCode).sort()) summary += "- " + k + ": " + byCode[k] + "\n";

fs.writeFileSync("_audit/JS/js-inline-summary.txt", summary, "utf8");

console.log("JS/audit-js-inline GATE COMPLETE");
console.log("Report: _audit/JS/js-inline.json");
console.log("Text: _audit/JS/js-inline.txt");
console.log("Summary: _audit/JS/js-inline-summary.txt");

if (!ok) process.exitCode = 1;

