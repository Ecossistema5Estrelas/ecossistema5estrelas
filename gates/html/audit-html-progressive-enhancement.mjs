import path from "node:path";
import { walkFiles, readTextSafe } from "../_lib/walk.mjs";
import { writeAudit, exitByOk } from "../_lib/report.mjs";
import { classifyFile, isPageLike } from "../_lib/classifier.mjs";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT = path.join(ROOT, "_audit");
const gate = "audit-html-progressive-enhancement";
const area = "HTML";

const files = walkFiles(ROOT, { exts: [".tsx", ".jsx", ".html", ".mdx"] });

const issues = [];

for (const f of files) {
  const { kind } = classifyFile(f);
  if (kind === "archive") continue;

  // progressive enhancement só em page-like
  if (!isPageLike(kind)) continue;

  const t = readTextSafe(f);

  const hiddenContainers = t.match(/<(main|section|div)\b[^>]*\bhidden\b[^>]*>/gi) || [];
  if (hiddenContainers.length > 0) {
    issues.push({ code: "PE_HIDDEN_CONTAINER", file: f, msg: `Containers com 'hidden' detectados: ${hiddenContainers.length}.` });
  }

  const mainMatch = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(t);
  if (mainMatch) {
    const innerText = mainMatch[1].replace(/<[^>]+>/g, "").trim();
    if (innerText.length === 0) {
      issues.push({ code: "PE_MAIN_EMPTY", file: f, msg: "Conteúdo textual detectável no <main> é vazio (risco de dependência de JS)." });
    }
  } else {
    issues.push({ code: "PE_MAIN_MISSING", file: f, msg: "Sem <main> detectável para validar conteúdo base." });
  }

  if (/\bsuppressHydrationWarning\b/.test(t)) {
    issues.push({ code: "PE_SUPPRESS_HYDRATION", file: f, msg: "suppressHydrationWarning detectado (risco: depender de JS)." });
  }
}

const results = { ok: issues.length === 0, issues };
writeAudit({ area, gate, rootDir: ROOT, auditDir: AUDIT, results });
exitByOk(results.ok);

