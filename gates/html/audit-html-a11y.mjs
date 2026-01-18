import path from "node:path";
import { walkFiles, readTextSafe } from "../_lib/walk.mjs";
import { writeAudit, exitByOk } from "../_lib/report.mjs";
import { RX } from "../_lib/patterns.mjs";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT = path.join(ROOT, "_audit");
const gate = "audit-html-a11y";
const area = "HTML";

const files = walkFiles(ROOT, { exts: [".html", ".tsx", ".jsx", ".mdx"] });
const issues = [];

for (const f of files) {
  const t = readTextSafe(f);

  // img alt
  const imgs = t.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imgs) {
    if (!/\balt\s*=/.i.test(tag)) {
      issues.push({ code: "A11Y_IMG_ALT_MISSING", file: f, msg: `Imagem sem alt: ${tag}` });
    }
  }

  // tabindex positive
  let m;
  const rxTab = new RegExp(RX.positiveTabIndex.source, "gi");
  while ((m = rxTab.exec(t)) !== null) {
    issues.push({ code: "A11Y_TABINDEX_POSITIVE", file: f, msg: `tabindex positivo detectado: ${m[0]}` });
  }

  // dangerouslySetInnerHTML
  if (RX.dangerouslySetInnerHTML.test(t)) {
    issues.push({ code: "A11Y_DANGEROUS_HTML", file: f, msg: "dangerouslySetInnerHTML detectado (proibido)." });
  }

  // links without text (best-effort)
  const emptyLinks = t.match(/<a\b[^>]*>\s*<\/a>/gi) || [];
  if (emptyLinks.length > 0) {
    issues.push({ code: "A11Y_LINK_EMPTY", file: f, msg: `Links vazios detectados: ${emptyLinks.length}.` });
  }
}

const results = { ok: issues.length === 0, issues };
writeAudit({ area, gate, rootDir: ROOT, auditDir: AUDIT, results });
exitByOk(results.ok);

