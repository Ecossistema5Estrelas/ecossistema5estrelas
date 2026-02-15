import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const scanRoots = ["app"];
const ignore = ["node_modules", ".next", "dist", "build", "public", "_archive", "_files"];

const issues = [];
let pagesScanned = 0;

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

    if (!/page\.tsx$/i.test(full)) continue;

    pagesScanned++;
    const src = fs.readFileSync(full, "utf8");

    const isClient = /(^|\n)\s*["']use client["']\s*;?\s*(\n|$)/.test(src);
    const hasNoscript = /<noscript[\s>]/i.test(src);

    // Heurística A: page "use client" sem noscript
    if (isClient && !hasNoscript) {
      issues.push({
        code: "JS_FALLBACK_CLIENT_PAGE_NO_NOSCRIPT",
        severity: "A11Y",
        file: rel(full),
        message: 'Page marcada como "use client" sem <noscript> fallback.'
      });
      continue;
    }

    // Heurística B: page server que só retorna um Client Component (wrapper vazio)
    // Detecta return com <Main> contendo apenas <XClient /> (ou similar) e nada mais.
    // (Conservador: só acusa quando é claramente "wrapper")
    const hasReturn = /\breturn\s*\(/.test(src) || /\breturn\s*</.test(src);
    if (hasReturn && !hasNoscript) {
      const looksLikeWrapper =
        /return\s*\(\s*[\s\S]*?<main[^>]*>[\s\S]*?<\w+Client\s*\/>\s*[\s\S]*?<\/main>[\s\S]*?\)\s*;?/i.test(src) &&
        !/return\s*\(\s*[\s\S]*?<main[^>]*>[\s\S]*?(<h1|<p|<a|<nav|<ul|<ol|<section|<article)/i.test(src);

      if (looksLikeWrapper) {
        issues.push({
          code: "JS_FALLBACK_SERVER_WRAPPER_ONLY_CLIENT",
          severity: "FRAGILE",
          file: rel(full),
          message: "Page server aparenta renderizar apenas um Client Component (wrapper). Sem <noscript> fallback."
        });
      }
    }

    // Heurística C: dynamic import com ssr:false (conteúdo client-only)
    if (/dynamic\s*\([\s\S]*\{\s*ssr\s*:\s*false\s*\}/i.test(src)) {
      issues.push({
        code: "JS_FALLBACK_DYNAMIC_SSR_FALSE",
        severity: "FRAGILE",
        file: rel(full),
        message: "Uso de dynamic(...,{ssr:false}) detectado em page. Exigir fallback."
      });
    }
  }
}

for (const r of scanRoots) {
  const p = path.join(ROOT, r);
  if (fs.existsSync(p)) walk(p);
}

const ok = issues.length === 0;

const report = {
  gate: "JS/audit-js-fallbacks",
  ok,
  issues_count: issues.length,
  pages_scanned: pagesScanned,
  issues
};

fs.mkdirSync("_audit/JS", { recursive: true });
fs.writeFileSync("_audit/JS/js-fallbacks.json", JSON.stringify(report, null, 2), "utf8");

fs.writeFileSync(
  "_audit/JS/js-fallbacks.txt",
  "[GATE] JS/audit-js-fallbacks\n" +
  "[OK] " + ok + "\n" +
  "[ISSUES] " + issues.length + "\n",
  "utf8"
);

const byCode = {};
for (const it of issues) byCode[it.code] = (byCode[it.code] || 0) + 1;

let summary =
  "JS FALLBACKS — SUMMARY\n\n" +
  "PAGES SCANNED: " + pagesScanned + "\n" +
  "ISSUES: " + issues.length + "\n" +
  "STATUS: " + (ok ? "OK" : "MAPPED") + "\n\n" +
  "BREAKDOWN:\n";

for (const k of Object.keys(byCode).sort()) summary += "- " + k + ": " + byCode[k] + "\n";

fs.writeFileSync("_audit/JS/js-fallbacks-summary.txt", summary, "utf8");

console.log("JS/audit-js-fallbacks GATE COMPLETE");
console.log("Report: _audit/JS/js-fallbacks.json");
console.log("Text: _audit/JS/js-fallbacks.txt");
console.log("Summary: _audit/JS/js-fallbacks-summary.txt");

if (!ok) process.exitCode = 1;

