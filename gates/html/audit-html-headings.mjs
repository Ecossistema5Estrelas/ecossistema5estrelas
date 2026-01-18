import path from "node:path";
import { walkFiles, readTextSafe } from "../_lib/walk.mjs";
import { writeAudit, exitByOk } from "../_lib/report.mjs";
import { classifyFile, isPageLike } from "../_lib/classifier.mjs";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT = path.join(ROOT, "_audit");
const gate = "audit-html-headings";
const area = "HTML";

const files = walkFiles(ROOT, { exts: [".html", ".tsx", ".jsx", ".mdx"] });

const issues = [];

for (const f of files) {
  const { kind } = classifyFile(f);
  if (kind === "archive") continue;

  // headings estruturais só em "page-like"
  if (!isPageLike(kind)) continue;

  const t = readTextSafe(f);

  const h1 = t.match(/<h1\b/gi) || [];
  if (h1.length > 1) {
    issues.push({ code: "HTML_H1_MULTIPLE", file: f, msg: `Encontrado ${h1.length} <h1>. Permitido: 1.` });
  }

  const empty = t.match(/<h[1-6]\b[^>]*>\s*<\/h[1-6]>/gi) || [];
  if (empty.length > 0) {
    issues.push({ code: "HTML_HEADING_EMPTY", file: f, msg: `Headings vazios detectados: ${empty.length}.` });
  }

  // pulo de nível (best-effort)
  const levels = [];
  const rx = /<h([1-6])\b/gi;
  let m;
  while ((m = rx.exec(t)) !== null) levels.push(Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1], cur = levels[i];
    if (cur > prev + 1) {
      issues.push({ code: "HTML_HEADING_SKIP", file: f, msg: `Possível pulo de heading: h${prev} -> h${cur}.` });
      break;
    }
  }
}

const results = { ok: issues.length === 0, issues };
writeAudit({ area, gate, rootDir: ROOT, auditDir: AUDIT, results });
exitByOk(results.ok);

