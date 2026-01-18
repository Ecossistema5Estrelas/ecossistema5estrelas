import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "CSS");
const JSON_OUT = path.join(OUT_DIR, "css-tokens.json");
const TXT_OUT  = path.join(OUT_DIR, "css-tokens.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

// Regex corrigidas (sem escape duplo)
const COLOR_REGEX = /(#(?:[0-9a-fA-F]{3}){1,2}\b|rgb\(|rgba\(|hsl\(|hsla\()/g;
const SIZE_REGEX  = /\b\d+(px|rem|em|vh|vw|%)\b/g;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    let m;

    while ((m = COLOR_REGEX.exec(line)) !== null) {
      if (!line.includes("var(")) {
        violations.push({
          file: filePath,
          rule: "hardcoded-color",
          line: idx + 1,
          raw: m[0]
        });
      }
    }

    while ((m = SIZE_REGEX.exec(line)) !== null) {
      if (!line.includes("var(")) {
        violations.push({
          file: filePath,
          rule: "hardcoded-size",
          line: idx + 1,
          raw: m[0]
        });
      }
    }
  });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", "_audit"].includes(e.name)) continue;
      walk(full);
    } else if (e.isFile() && e.name.endsWith(".css")) {
      scanFile(full);
    }
  }
}

walk(ROOT);

const report = {
  gate: "css-tokens",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "CSS TOKENS GATE\n\n";

if (violations.length === 0) {
  text += "STATUS: OK — No violations found.\n";
} else {
  text += "STATUS: FAIL — " + violations.length + " violations.\n\n";
  for (const v of violations) {
    text += "File: " + v.file + "\n";
    text += "Rule: " + v.rule + "\n";
    text += "Line: " + v.line + "\n";
    if (v.raw) text += "Raw: " + v.raw + "\n";
    text += "\n";
  }
}

fs.writeFileSync(TXT_OUT, text, "utf8");

console.log("CSS TOKENS GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
