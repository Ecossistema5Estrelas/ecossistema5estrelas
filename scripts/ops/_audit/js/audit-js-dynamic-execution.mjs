import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "JS");
const JSON_OUT = path.join(OUT_DIR, "js-dynamic-execution.json");
const TXT_OUT  = path.join(OUT_DIR, "js-dynamic-execution.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

function lineOf(content, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < content.length; i++) {
    if (content[i] === "\n") line++;
  }
  return line;
}

function snippet(content, idx, len = 120) {
  return content
    .slice(idx, Math.min(content.length, idx + len))
    .replace(/\s+/g, " ")
    .trim();
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const checks = [
    { rule: "eval", re: /\beval\s*\(/g },
    { rule: "new-function", re: /\bnew\s+Function\s*\(/g },
    // Function("a","b","return ...") — constructor call
    { rule: "function-constructor", re: /(^|[^\w])Function\s*\(/g },

    // setTimeout("...") / setInterval('...') / setTimeout(`...`)
    { rule: "settimeout-string", re: /\bsetTimeout\s*\(\s*(['"`])/g },
    { rule: "setinterval-string", re: /\bsetInterval\s*\(\s*(['"`])/g },
  ];

  for (const c of checks) {
    let m;
    while ((m = c.re.exec(content)) !== null) {
      // For Function( detection with leading capture, keep index at the "Function" token
      const idx = c.rule === "function-constructor"
        ? m.index + (m[1] ? m[1].length : 0)
        : m.index;

      violations.push({
        file: filePath,
        rule: c.rule,
        line: lineOf(content, idx),
        raw: snippet(content, idx)
      });
    }
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", "_audit"].includes(e.name)) continue;
      walk(full);
    } else if (e.isFile()) {
      const n = e.name.toLowerCase();
      if (n.endsWith(".js") || n.endsWith(".ts") || n.endsWith(".jsx") || n.endsWith(".tsx")) {
        scanFile(full);
      }
    }
  }
}

walk(ROOT);

const report = {
  gate: "js-dynamic-execution",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "JS DYNAMIC EXECUTION GATE\n\n";

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

console.log("JS DYNAMIC EXECUTION GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
