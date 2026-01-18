import fs from "fs";
import path from "path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT_DIR = path.join(ROOT, "_audit", "HTML");
const OUT_TXT = path.join(AUDIT_DIR, "audit-html-landmarks.txt");
const OUT_JSON = path.join(AUDIT_DIR, "audit-html-landmarks.json");

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p, files);
    } else if (/\.(tsx|jsx|html)$/.test(f)) {
      files.push(p);
    }
  }
  return files;
}

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}



function isPage(file) {
  return file.endsWith("page.tsx");
}

function isDocumentLike(file) {
  return file.endsWith("not-found.tsx") || file.endsWith("global-error.tsx");
}

function has(tag, content) {
  const re = new RegExp(`<${tag}[\\s>]|<${tag}>`, "i");
  return re.test(content);
}

const files = walk(path.join(ROOT, "app"));

const issues = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const content = read(file);

  const hasHeader = has("header", content);
  const hasNav = has("nav", content);
  const hasFooter = has("footer", content);
  const hasMain = has("main", content);

  // RULES

  // 1) app/layout.tsx must contain all landmarks
  if (rel === "app/layout.tsx") {
    if (!hasHeader)
      issues.push({
        code: "HTML_LANDMARK_HEADER_MISSING",
        file: rel,
        message: "Layout institucional sem <header>.",
      });
    if (!hasNav)
      issues.push({
        code: "HTML_LANDMARK_NAV_MISSING",
        file: rel,
        message: "Layout institucional sem <nav>.",
      });
    if (!hasFooter)
      issues.push({
        code: "HTML_LANDMARK_FOOTER_MISSING",
        file: rel,
        message: "Layout institucional sem <footer>.",
      });
    if (!hasMain)
      issues.push({
        code: "HTML_LANDMARK_MAIN_MISSING",
        file: rel,
        message: "Layout institucional sem <main>.",
      });
    continue;
  }

  // 2) page.tsx and document-like must contain <main>
  if (isPage(file) || isDocumentLike(file)) {
    if (!hasMain) {
      issues.push({
        code: "HTML_MAIN_MISSING",
        file: rel,
        message: "Documento sem <main>.",
      });
    }
  }

  // 3) Do NOT require header/nav/footer in pages or document-like
}

const ok = issues.length === 0;

let txt = `[GATE] HTML/audit-html-landmarks\n`;
txt += `[OK] ${ok}\n`;
txt += `[ISSUES] ${issues.length}\n\n`;

for (const i of issues) {
  txt += `- ${i.code} :: ${path.join(ROOT, i.file)}\n  ${i.message}\n`;
}

fs.mkdirSync(AUDIT_DIR, { recursive: true });
fs.writeFileSync(OUT_TXT, txt, "utf8");
fs.writeFileSync(OUT_JSON, JSON.stringify({ ok, issues }, null, 2), "utf8");

if (!ok) process.exit(1);

