import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const scanRoots = ["app", "components", "ui", "src", "pages", "styles"];
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
    if (stat.isDirectory()) { walk(full); continue; }

    if (!/\.(tsx|jsx|ts|js|mjs|cjs)$/.test(full)) continue;

    filesScanned++;
    const src = fs.readFileSync(full, "utf8");

    // 1) eval(...)
    if (/\beval\s*\(/.test(src)) {
      issues.push({ code: "JS_DYNAMIC_EVAL", severity: "DESTRUCTIVE", file: rel(full), message: "Uso de eval(...) detectado." });
    }

    // 2) new Function(...) ou Function(...)
    // (inclui Function.call/apply como heurística conservadora: só marca constructor)
    if (/\bnew\s+Function\s*\(/.test(src) || /(^|[^.\w])Function\s*\(\s*["'`]/m.test(src)) {
      issues.push({ code: "JS_DYNAMIC_FUNCTION_CONSTRUCTOR", severity: "DESTRUCTIVE", file: rel(full), message: "Uso de Function constructor detectado." });
    }

    // 3) setTimeout/setInterval com string
    if (/\bset(Time|Inter)val\s*\(\s*["'`]/.test(src) || /\bsetTimeout\s*\(\s*["'`]/.test(src) || /\bsetInterval\s*\(\s*["'`]/.test(src)) {
      issues.push({ code: "JS_DYNAMIC_TIMER_STRING", severity: "DESTRUCTIVE", file: rel(full), message: "Uso de setTimeout/setInterval com string detectado." });
    }

    // 4) import() com argumento não-literal (sinaliza; não necessariamente proibido)
    // (import("x") ok; import(var) fragiliza auditabilidade)
    if (/\bimport\s*\(\s*[^"'`\s][^)]+\)/.test(src)) {
      issues.push({ code: "JS_DYNAMIC_IMPORT_NON_LITERAL", severity: "FRAGILE", file: rel(full), message: "import() com argumento não-literal (auditabilidade reduzida)." });
    }

    // 5) innerHTML / outerHTML assignment (sinaliza risco)
    if (/\.\s*(innerHTML|outerHTML)\s*=\s*/.test(src)) {
      issues.push({ code: "JS_HTML_INJECTION_ASSIGNMENT", severity: "FRAGILE", file: rel(full), message: "Atribuição a innerHTML/outerHTML detectada (potencial injeção)." });
    }

    // 6) document.write (destrutivo)
    if (/\bdocument\.write\s*\(/.test(src)) {
      issues.push({ code: "JS_DOCUMENT_WRITE", severity: "DESTRUCTIVE", file: rel(full), message: "Uso de document.write detectado." });
    }
  }
}

for (const r of scanRoots) {
  const p = path.join(ROOT, r);
  if (fs.existsSync(p)) walk(p);
}

const destructive = issues.filter(i => i.severity === "DESTRUCTIVE").length;
const ok = destructive === 0;

const report = {
  gate: "JS/audit-js-dynamic-execution",
  ok,
  issues_count: issues.length,
  destructive_count: destructive,
  files_scanned: filesScanned,
  issues
};

fs.mkdirSync("_audit/JS", { recursive: true });
fs.writeFileSync("_audit/JS/js-dynamic-execution.json", JSON.stringify(report, null, 2), "utf8");

fs.writeFileSync(
  "_audit/JS/js-dynamic-execution.txt",
  "[GATE] JS/audit-js-dynamic-execution\n" +
  "[OK] " + ok + "\n" +
  "[ISSUES] " + issues.length + "\n" +
  "[DESTRUCTIVE] " + destructive + "\n",
  "utf8"
);

const byCode = {};
for (const it of issues) byCode[it.code] = (byCode[it.code] || 0) + 1;

let summary =
  "JS DYNAMIC EXECUTION — SUMMARY\n\n" +
  "FILES SCANNED: " + filesScanned + "\n" +
  "ISSUES: " + issues.length + "\n" +
  "DESTRUCTIVE: " + destructive + "\n" +
  "STATUS: " + (ok ? "OK" : "BLOCKED") + "\n\n" +
  "BREAKDOWN:\n";

for (const k of Object.keys(byCode).sort()) summary += "- " + k + ": " + byCode[k] + "\n";

fs.writeFileSync("_audit/JS/js-dynamic-execution-summary.txt", summary, "utf8");

console.log("JS/audit-js-dynamic-execution GATE COMPLETE");
console.log("Report: _audit/JS/js-dynamic-execution.json");
console.log("Text: _audit/JS/js-dynamic-execution.txt");
console.log("Summary: _audit/JS/js-dynamic-execution-summary.txt");

if (!ok) process.exitCode = 1;

