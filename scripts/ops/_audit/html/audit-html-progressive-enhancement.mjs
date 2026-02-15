import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "HTML");
const JSON_OUT = path.join(OUT_DIR, "html-progressive-enhancement.json");
const TXT_OUT  = path.join(OUT_DIR, "html-progressive-enhancement.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

function lineOf(content, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < content.length; i++) {
    if (content[i] === "\n") line++;
  }
  return line;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // 1) Containers vazios dependentes de JS
  const emptyContainers = /<div[^>]*(data-js-only=["']true["'])[^>]*>\s*<\/div>/gi;
  let m;
  while ((m = emptyContainers.exec(content)) !== null) {
    violations.push({
      file: filePath,
      rule: "js-only-container",
      line: lineOf(content, m.index),
      raw: m[0].trim()
    });
  }

  // 2) Elementos hidden sem fallback
  const hiddenEls = /<[^>]+hidden[^>]*>/gi;
  while ((m = hiddenEls.exec(content)) !== null) {
    violations.push({
      file: filePath,
      rule: "hidden-without-fallback",
      line: lineOf(content, m.index),
      raw: m[0].trim()
    });
  }

  // 3) <dialog> sem fallback
  const dialogs = /<dialog\b[^>]*>/gi;
  while ((m = dialogs.exec(content)) !== null) {
    violations.push({
      file: filePath,
      rule: "dialog-without-fallback",
      line: lineOf(content, m.index),
      raw: m[0].trim()
    });
  }

  // 4) JS-only markers
  const jsOnly = /data-js-only=["']true["']/gi;
  while ((m = jsOnly.exec(content)) !== null) {
    violations.push({
      file: filePath,
      rule: "explicit-js-only",
      line: lineOf(content, m.index),
      raw: m[0].trim()
    });
  }

  // 5) Script dependência sem noscript
  if (content.includes("<script") && !content.includes("<noscript")) {
    violations.push({
      file: filePath,
      rule: "missing-noscript-fallback",
      line: 1,
      raw: "<script> present but no <noscript> fallback found"
    });
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", "_audit"].includes(e.name)) continue;
      walk(full);
    } else if (e.isFile() && e.name.endsWith(".html")) {
      scanFile(full);
    }
  }
}

walk(ROOT);

const report = {
  gate: "html-progressive-enhancement",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "HTML PROGRESSIVE ENHANCEMENT GATE\n\n";

if (violations.length === 0) {
  text += "STATUS: OK — No violations found.\n";
} else {
  text += "STATUS: FAIL — " + violations.length + " violations.\n\n";
  for (const v of violations) {
    text += "File: " + v.file + "\n";
    text += "Rule: " + v.rule + "\n";
    if (v.line) text += "Line: " + v.line + "\n";
    if (v.raw) text += "Raw: " + v.raw + "\n";
    text += "\n";
  }
}

fs.writeFileSync(TXT_OUT, text, "utf8");

console.log("HTML PROGRESSIVE ENHANCEMENT GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
