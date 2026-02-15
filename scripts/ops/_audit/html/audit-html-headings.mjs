import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "HTML");
const JSON_OUT = path.join(OUT_DIR, "html-headings.json");
const TXT_OUT  = path.join(OUT_DIR, "html-headings.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const headings = [...content.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)]
    .map(m => ({
      level: parseInt(m[1].replace("h", ""), 10),
      text: m[2].replace(/<[^>]+>/g, "").trim(),
      raw: m[0]
    }));

  if (headings.length === 0) return;

  const h1s = headings.filter(h => h.level === 1);
  if (h1s.length !== 1) {
    violations.push({
      file: filePath,
      rule: "one-h1-only",
      found: h1s.length
    });
  }

  let last = 0;
  for (const h of headings) {
    if (h.text.length === 0) {
      violations.push({
        file: filePath,
        rule: "empty-heading",
        heading: `h${h.level}`
      });
    }

    if (last !== 0 && h.level > last + 1) {
      violations.push({
        file: filePath,
        rule: "heading-skip",
        from: `h${last}`,
        to: `h${h.level}`
      });
    }

    last = h.level;
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
  gate: "html-headings",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "HTML HEADINGS GATE\n\n";

if (violations.length === 0) {
  text += "STATUS: OK — No violations found.\n";
} else {
  text += "STATUS: FAIL — " + violations.length + " violations.\n\n";
  for (const v of violations) {
    text += `File: ${v.file}\nRule: ${v.rule}\n`;
    if (v.from) text += `From: ${v.from}\n`;
    if (v.to) text += `To: ${v.to}\n`;
    if (v.heading) text += `Heading: ${v.heading}\n`;
    if (v.found !== undefined) text += `Found: ${v.found}\n`;
    text += "\n";
  }
}

fs.writeFileSync(TXT_OUT, text, "utf8");

console.log("HTML HEADINGS GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
