import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "_audit", "HTML");
const JSON_OUT = path.join(OUT_DIR, "html-forms.json");
const TXT_OUT  = path.join(OUT_DIR, "html-forms.txt");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const violations = [];

function stripTags(s) {
  return String(s || "").replace(/<[^>]+>/g, "").trim();
}

function getAttr(tag, name) {
  const re = new RegExp("\\b" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i");
  const m = tag.match(re);
  return m ? m[2] : null;
}

function hasBoolAttr(tag, name) {
  const re = new RegExp("\\b" + name + "\\b", "i");
  return re.test(tag);
}

function hasAccessibleName(tag) {
  return /\baria-label\s*=\s*["'][^"']+["']|\baria-labelledby\s*=\s*["'][^"']+["']/.test(tag);
}

function findLabels(html) {
  // Map: id -> count of <label for="id">
  const map = new Map();
  const re = /<label\b[^>]*>/gi;
  const labels = [...html.matchAll(re)].map(m => m[0]);
  for (const lb of labels) {
    const f = getAttr(lb, "for");
    if (f) map.set(f, (map.get(f) || 0) + 1);
  }
  return map;
}

function controlNeedsLabel(tagName, tagOpen) {
  // Excecoes comuns
  if (tagName === "input") {
    const type = (getAttr(tagOpen, "type") || "text").toLowerCase();
    if (["hidden", "submit", "button", "reset", "image"].includes(type)) return false;
  }
  return true;
}

function scanFile(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const labelsFor = findLabels(html);

  // Detecta controles (inputs, selects, textareas) com seu trecho de abertura
  const controls = [];

  const inputRe = /<input\b[^>]*>/gi;
  const selectRe = /<select\b[^>]*>/gi;
  const textareaRe = /<textarea\b[^>]*>/gi;

  for (const m of html.matchAll(inputRe)) controls.push({ tag: "input", open: m[0], index: m.index });
  for (const m of html.matchAll(selectRe)) controls.push({ tag: "select", open: m[0], index: m.index });
  for (const m of html.matchAll(textareaRe)) controls.push({ tag: "textarea", open: m[0], index: m.index });

  if (controls.length === 0) return;

  // Regras por controle
  for (const c of controls) {
    const id = getAttr(c.open, "id");
    const name = getAttr(c.open, "name");
    const placeholder = getAttr(c.open, "placeholder");
    const required = hasBoolAttr(c.open, "required");

    // name obrigatório (para submit etc. pode ser dispensável, mas CORE exige consistencia)
    // Ajuste: para input[type=submit|button|reset|image|hidden], name é opcional.
    let nameRequired = true;
    if (c.tag === "input") {
      const type = (getAttr(c.open, "type") || "text").toLowerCase();
      if (["hidden", "submit", "button", "reset", "image"].includes(type)) nameRequired = false;
    }

    // id obrigatório para controles que precisam de label (pois label-for depende de id)
    const needsLabel = controlNeedsLabel(c.tag, c.open);

    if (nameRequired && (!name || stripTags(name).length === 0)) {
      violations.push({
        file: filePath,
        rule: "control-missing-name",
        control: c.tag,
        id: id || null
      });
    }

    if (needsLabel && (!id || stripTags(id).length === 0)) {
      violations.push({
        file: filePath,
        rule: "control-missing-id",
        control: c.tag,
        name: name || null
      });
    }

    if (needsLabel) {
      const labeledByFor = id ? (labelsFor.get(id) || 0) > 0 : false;

      // Label wrapping: <label> ... <input ...> ... </label>
      // Heuristica simples: procura label de abertura ate 300 chars antes do controle e fechamento depois.
      let wrappedByLabel = false;
      const start = Math.max(0, c.index - 300);
      const end = Math.min(html.length, c.index + 300);
      const window = html.slice(start, end);
      if (/<label\b[^>]*>[\s\S]*?<input\b[^>]*>[\s\S]*?<\/label>/i.test(window) && c.tag === "input") wrappedByLabel = true;
      if (/<label\b[^>]*>[\s\S]*?<select\b[^>]*>[\s\S]*?<\/label>/i.test(window) && c.tag === "select") wrappedByLabel = true;
      if (/<label\b[^>]*>[\s\S]*?<textarea\b[^>]*>[\s\S]*?<\/label>/i.test(window) && c.tag === "textarea") wrappedByLabel = true;

      const a11yName = hasAccessibleName(c.open);

      if (!labeledByFor && !wrappedByLabel && !a11yName) {
        violations.push({
          file: filePath,
          rule: "control-missing-label",
          control: c.tag,
          id: id || null,
          name: name || null
        });
      }

      // Placeholder nao substitui label
      if ((placeholder && stripTags(placeholder).length > 0) && (!labeledByFor && !wrappedByLabel && !a11yName)) {
        violations.push({
          file: filePath,
          rule: "placeholder-is-not-label",
          control: c.tag,
          id: id || null,
          name: name || null
        });
      }
    }

    // required: se existir, ok (gate nao exige required)
    // Este campo só entra no report se você quiser evoluir para regra futura.
    void required;
  }

  // Forms sem method/action (regra CORE opcional — aqui entra como OBSERVE? Mantemos como FAIL por padrão 5⭐)
  const forms = [...html.matchAll(/<form\b[^>]*>/gi)].map(m => m[0]);
  for (const f of forms) {
    const method = (getAttr(f, "method") || "").toLowerCase();
    const action = getAttr(f, "action");

    if (!method) {
      violations.push({ file: filePath, rule: "form-missing-method" });
    } else if (!["get", "post", "dialog"].includes(method)) {
      violations.push({ file: filePath, rule: "form-invalid-method", found: method });
    }

    if (method !== "dialog" && (!action || stripTags(action).length === 0)) {
      violations.push({ file: filePath, rule: "form-missing-action" });
    }
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
  gate: "html-forms",
  generated_at: new Date().toISOString(),
  violations
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

let text = "HTML FORMS GATE\n\n";

if (violations.length === 0) {
  text += "STATUS: OK — No violations found.\n";
} else {
  text += "STATUS: FAIL — " + violations.length + " violations.\n\n";
  for (const v of violations) {
    text += "File: " + v.file + "\n";
    text += "Rule: " + v.rule + "\n";
    if (v.control) text += "Control: " + v.control + "\n";
    if (v.id) text += "Id: " + v.id + "\n";
    if (v.name) text += "Name: " + v.name + "\n";
    if (v.found !== undefined) text += "Found: " + v.found + "\n";
    text += "\n";
  }
}

fs.writeFileSync(TXT_OUT, text, "utf8");

console.log("HTML FORMS GATE COMPLETE");
console.log("Report:", JSON_OUT);
console.log("Text:", TXT_OUT);

if (violations.length > 0) {
  process.exitCode = 1;
}
