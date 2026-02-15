import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "CSS");
const JSON_OUT = path.join(OUT_DIR, "css-motion.json");
const TXT_OUT  = path.join(OUT_DIR, "css-motion.txt");

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

  // 1) transition: all
  {
    const re = /\btransition\s*:\s*all\b/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "transition-all",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 2) animation sem prefers-reduced-motion
  if ((/\banimation\b/gi.test(content) || /\btransition\b/gi.test(content)) &&
      !/prefers-reduced-motion/gi.test(content)) {
    violations.push({
      file: filePath,
      rule: "missing-reduced-motion",
      line: 1,
      raw: "animation/transition used without prefers-reduced-motion fallback"
    });
  }

  // 3) duração hardcoded (ms ou s sem var)
  {
    const re = /\b(animation-duration|transition-duration)\s*:\s*(?!var\()[^;]+;/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "hardcoded-duration",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 4) keyframes sem controle
  {
    const re = /@keyframes\s+[^{]+/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "keyframes-present",
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
  gate: "css-motion",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "CSS MOTION GATE\n\n";

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

console.log("CSS MOTION GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
