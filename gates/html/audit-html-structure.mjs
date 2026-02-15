import path from "node:path";
import { walkFiles, readTextSafe } from "../_lib/walk.mjs";
import { writeAudit, exitByOk } from "../_lib/report.mjs";
import { classifyFile, isDocumentLike } from "../_lib/classifier.mjs";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT = path.join(ROOT, "_audit");
const gate = "audit-html-structure";
const area = "HTML";

const files = walkFiles(ROOT, { exts: [".html", ".tsx", ".jsx", ".mdx"] });

const issues = [];

for (const f of files) {
  const { kind } = classifyFile(f);

  // ignore archives
  if (kind === "archive") continue;

  // só documentos precisam de <main>
  if (!isDocumentLike(kind)) continue;

  const t = readTextSafe(f);
  const mainMatches = t.match(/<main\b/gi) || [];

  if (mainMatches.length > 1) {
    issues.push({ code: "HTML_MAIN_MULTIPLE", file: f, msg: `Encontrado ${mainMatches.length} <main>. Permitido: 1.` });
    continue;
  }

  if (mainMatches.length === 0) {
    issues.push({ code: "HTML_MAIN_MISSING", file: f, msg: `Documento (${kind}) sem <main> detectável.` });
  }
}

const results = { ok: issues.length === 0, issues };
writeAudit({ area, gate, rootDir: ROOT, auditDir: AUDIT, results });
exitByOk(results.ok);

