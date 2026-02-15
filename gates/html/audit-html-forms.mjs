import path from "node:path";
import { walkFiles, readTextSafe } from "../_lib/walk.mjs";
import { writeAudit, exitByOk } from "../_lib/report.mjs";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const ROOT = process.cwd();
const AUDIT = path.join(ROOT, "_audit");
const gate = "audit-html-forms";
const area = "HTML";

const files = walkFiles(ROOT, { exts: [".html", ".tsx", ".jsx", ".mdx"] });

const issues = [];

function extractInputs(text) {
  // best-effort: match <input ...>
  return text.match(/<input\b[^>]*>/gi) || [];
}

function hasAttr(tag, name) {
  const rx = new RegExp(`\\b${name}\\s*=\\s*["'{][^"'}]+["'}]`, "i");
  return rx.test(tag);
}

function getAttr(tag, name) {
  const rx = new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i");
  const m = rx.exec(tag);
  return m ? m[1] : null;
}

for (const f of files) {
  const t = readTextSafe(f);
  const inputs = extractInputs(t);
  if (inputs.length === 0) continue;

  for (const tag of inputs) {
    // ignore hidden inputs? still require name/id typically, but keep strict
    const id = getAttr(tag, "id");
    const name = getAttr(tag, "name");

    if (!name) issues.push({ code: "FORM_INPUT_NAME_MISSING", file: f, msg: `Input sem name: ${tag}` });
    if (!id) issues.push({ code: "FORM_INPUT_ID_MISSING", file: f, msg: `Input sem id: ${tag}` });

    const hasAria = hasAttr(tag, "aria-label") || hasAttr(tag, "aria-labelledby");
    let hasLabelFor = false;
    if (id) {
      const rxLabel = new RegExp(`<label\\b[^>]*for\\s*=\\s*["']${id}["'][^>]*>`, "i");
      hasLabelFor = rxLabel.test(t);
    }
    if (!hasAria && !hasLabelFor) {
      issues.push({ code: "FORM_INPUT_LABEL_MISSING", file: f, msg: `Input sem label/aria detectável (id=${id ?? "N/A"}): ${tag}` });
    }
  }
}

const results = { ok: issues.length === 0, issues };
writeAudit({ area, gate, rootDir: ROOT, auditDir: AUDIT, results });
exitByOk(results.ok);

