import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TARGET_DIRS = ['app', 'pages', 'components', 'src'];

const report = {
  gate: "HTML-STRUCTURE",
  timestamp: new Date().toISOString(),
  violations: [],
  warnings: [],
  passed: []
};

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const mainMatches = content.match(/<main[\\s>]/g) || [];
  if (mainMatches.length === 0) {
    report.violations.push({ file: filePath, rule: "missing-main" });
  }
  if (mainMatches.length > 1) {
    report.violations.push({ file: filePath, rule: "multiple-main" });
  }

  const hasSemantic = /<(header|nav|main|footer|section|article|aside)[\\s>]/.test(content);

  if (!hasSemantic) {
    report.violations.push({ file: filePath, rule: "no-semantic-landmarks" });
  }

  const divOnly =
    !/<(header|nav|main|footer|section|article|aside)[\\s>]/.test(content) &&
    /<div[\\s>]/.test(content);

  if (divOnly) {
    report.violations.push({ file: filePath, rule: "layout-div-only" });
  }

  if (mainMatches.length === 1 && hasSemantic && !divOnly) {
    report.passed.push(filePath);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (
      entry.isFile() &&
      (fullPath.endsWith('.tsx') ||
        fullPath.endsWith('.jsx') ||
        fullPath.endsWith('.html'))
    ) {
      scanFile(fullPath);
    }
  }
}

for (const dir of TARGET_DIRS) {
  walk(path.join(ROOT, dir));
}

const outDir = path.join(ROOT, "_audit", "HTML");
fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, "html-structure.json");
const txtPath = path.join(outDir, "html-structure.txt");

fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

let text = "HTML STRUCTURE GATE\n\n";
text += "Violations: " + report.violations.length + "\n";
text += "Warnings: " + report.warnings.length + "\n";
text += "Passed: " + report.passed.length + "\n\n";

for (const v of report.violations) {
  text += "❌ " + v.rule + " -> " + v.file + "\n";
}

fs.writeFileSync(txtPath, text);

console.log("HTML STRUCTURE GATE COMPLETE");
console.log("Report: " + jsonPath);
console.log("Text: " + txtPath);

if (report.violations.length > 0) {
  process.exitCode = 1;
}
