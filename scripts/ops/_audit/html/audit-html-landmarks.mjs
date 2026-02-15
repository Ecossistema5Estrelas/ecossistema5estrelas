import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "HTML");
const JSON_OUT = path.join(OUT_DIR, "html-landmarks.json");
const TXT_OUT  = path.join(OUT_DIR, "html-landmarks.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

const LANDMARKS = ["header", "nav", "main", "footer", "aside"];

function hasAccessibleName(tagBlock) {
  // aria-label or aria-labelledby
  return /aria-label\s*=\s*["'][^"']+["']|aria-labelledby\s*=\s*["'][^"']+["']/.test(tagBlock);
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const found = {};
  for (const lm of LANDMARKS) {
    const regex = new RegExp(`<${lm}[^>]*>`, "gi");
    const matches = [...content.matchAll(regex)].map(m => m[0]);
    if (matches.length > 0) found[lm] = matches;
  }

  // main must exist and be unique
  if (!found.main || found.main.length === 0) {
    violations.push({ file: filePath, rule: "missing-main" });
  } else if (found.main.length > 1) {
    violations.push({ file: filePath, rule: "multiple-main", found: found.main.length });
  }

  // If multiple landmarks of same type, they must have accessible names
  for (const [lm, blocks] of Object.entries(found)) {
    if (blocks.length > 1) {
      blocks.forEach((b, idx) => {
        if (!hasAccessibleName(b)) {
          violations.push({
            file: filePath,
            rule: "landmark-needs-accessible-name",
            landmark: lm,
            index: idx + 1
          });
        }
      });
    }
  }

  // Encourage presence of header/nav/footer (soft fail = violation for now, can be OBSERVE later)
  ["header", "nav", "footer"].forEach(lm => {
    if (!found[lm]) {
      violations.push({
        file: filePath,
        rule: "missing-landmark",
        landmark: lm
      });
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
    } else if (e.isFile() && e.name.endsWith(".html")) {
      scanFile(full);
    }
  }
}

walk(ROOT);

const report = {
  gate: "html-landmarks",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "HTML LANDMARKS GATE\n\n";

if (violations.length === 0) {
  text += "STATUS: OK — No violations found.\n";
} else {
  text += "STATUS: FAIL — " + violations.length + " violations.\n\n";
  for (const v of violations) {
    text += `File: ${v.file}\nRule: ${v.rule}\n`;
    if (v.landmark) text += `Landmark: ${v.landmark}\n`;
    if (v.index) text += `Index: ${v.index}\n`;
    if (v.found !== undefined) text += `Found: ${v.found}\n`;
    text += "\n";
  }
}

fs.writeFileSync(TXT_OUT, text, "utf8");

console.log("HTML LANDMARKS GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
