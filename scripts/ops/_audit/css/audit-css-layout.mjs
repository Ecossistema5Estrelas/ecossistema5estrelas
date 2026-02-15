import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "CSS");
const JSON_OUT = path.join(OUT_DIR, "css-layout.json");
const TXT_OUT  = path.join(OUT_DIR, "css-layout.txt");

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

  // 1) position absolute/fixed usado como layout
  {
    const re = /\bposition\s*:\s*(absolute|fixed)\b/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "position-as-layout",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 2) float para layout
  {
    const re = /\bfloat\s*:\s*(left|right)\b/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "float-layout",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 3) display ausente em containers (heurística mínima: classes com 'container' ou 'layout')
  {
    const re = /\.(container|layout)[^{]*\{[^}]*\}/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      const block = m[0];
      if (!/display\s*:\s*(grid|flex|block|inline-block)/i.test(block)) {
        violations.push({
          file: filePath,
          rule: "container-without-display",
          line: lineOf(content, m.index),
          raw: block.slice(0, 120).replace(/\s+/g, " ").trim()
        });
      }
    }
  }

  // 4) z-index sem token
  {
    const re = /\bz-index\s*:\s*(?!var\()[^;]+;/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "zindex-without-token",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 5) uso de table para layout
  {
    const re = /\bdisplay\s*:\s*table\b/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "table-layout",
        line: lineOf(content, m.index),
        raw: m[0].trim()
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
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".css")) {
      scanFile(full);
    }
  }
}

walk(ROOT);

const report = {
  gate: "css-layout",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "CSS LAYOUT GATE\n\n";

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

console.log("CSS LAYOUT GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
