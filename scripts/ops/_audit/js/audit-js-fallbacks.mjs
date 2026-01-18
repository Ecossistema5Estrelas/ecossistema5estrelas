import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "JS");
const JSON_OUT = path.join(OUT_DIR, "js-fallbacks.json");
const TXT_OUT  = path.join(OUT_DIR, "js-fallbacks.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

function lineOf(content, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < content.length; i++) {
    if (content[i] === "\n") line++;
  }
  return line;
}

function scanTextFile(filePath, content) {
  // 1) Marcadores explícitos de JS-only
  {
    const re = /\bdata-js-only\s*=\s*["']true["']/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "explicit-js-only-marker",
        line: lineOf(content, m.index),
        raw: m[0].trim()
      });
    }
  }

  // 2) hidden em markup (baseline some)
  {
    const re = /<[^>]+\bhidden\b[^>]*>/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "hidden-content-without-fallback",
        line: lineOf(content, m.index),
        raw: m[0].slice(0, 120).replace(/\s+/g, " ").trim()
      });
    }
  }

  // 3) Containers vazios que dependem de JS (heurística determinística: div/span/section/aside com data-js-only)
  {
    const re = /<(div|span|section|aside)[^>]*\bdata-js-only\s*=\s*["']true["'][^>]*>\s*<\/\1>/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "js-only-empty-container",
        line: lineOf(content, m.index),
        raw: m[0].slice(0, 160).replace(/\s+/g, " ").trim()
      });
    }
  }

  // 4) React pattern: mounted gate que retorna null antes de hidratar
  //    useEffect(() => setMounted(true), []) + if (!mounted) return null;
  {
    const reMounted =
      /(useState\s*\(\s*false\s*\)\s*;[\s\S]{0,800}?useEffect\s*\(\s*\(\s*\)\s*=>\s*\{\s*setMounted\s*\(\s*true\s*\)\s*;?[\s\S]{0,200}?\}\s*,\s*\[\s*\]\s*\)\s*;?[\s\S]{0,800}?if\s*\(\s*!\s*mounted\s*\)\s*return\s+null\s*;)/gi;
    let m;
    while ((m = reMounted.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "mounted-null-gate",
        line: lineOf(content, m.index),
        raw: "useEffect(setMounted(true)) + if(!mounted) return null"
      });
    }
  }

  // 5) “render nothing until hydration” (padrões comuns)
  {
    const re =
      /\breturn\s*\(\s*hydrated\s*\?\s*[\s\S]{0,200}:\s*null\s*\)/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "hydration-required-null",
        line: lineOf(content, m.index),
        raw: "return(hydrated ? ... : null)"
      });
    }
  }

  // 6) Skeleton-only sem conteúdo (padrão óbvio: "Loading..." sem fallback real)
  {
    const re =
      /\breturn\s*\(\s*<[^>]+>\s*(Loading\.\.\.|Loading|Carregando\.\.\.|Carregando)\s*<\/[^>]+>\s*\)\s*;?/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      violations.push({
        file: filePath,
        rule: "loading-only-shell",
        line: lineOf(content, m.index),
        raw: "return(<...>Loading...</...>)"
      });
    }
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  scanTextFile(filePath, content);
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
      if (n.endsWith(".tsx") || n.endsWith(".jsx") || n.endsWith(".ts") || n.endsWith(".js") || n.endsWith(".html")) {
        scanFile(full);
      }
    }
  }
}

walk(ROOT);

const report = {
  gate: "js-fallbacks",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "JS FALLBACKS GATE\n\n";

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

console.log("JS FALLBACKS GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
