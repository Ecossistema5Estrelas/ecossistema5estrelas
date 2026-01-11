import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = "posts";

function listMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .map((f) => path.join(dir, f));
}

function detectEol(raw) {
  return raw.includes("\r\n") ? "\r\n" : "\n";
}

function normalizeConclusao(raw) {
  const replaced = raw
    .replace(/^[ \t]*CONCLUSAO[ \t]*:?[ \t]*$/gmi, "CONCLUSÃO")
    .replace(/^[ \t]*CONCLUS[AÃ]O[ \t]*:?[ \t]*$/gmi, "CONCLUSÃO");

  const has = /(^|\r?\n)CONCLUSÃO(\r?\n|$)/.test(replaced);
  if (has) return { out: replaced, changed: replaced !== raw };

  const eol = detectEol(replaced);
  let out = replaced;

  if (!out.endsWith(eol)) out += eol;
  out += eol + "CONCLUSÃO" + eol + eol;

  return { out, changed: true };
}

const files = listMdFiles(POSTS_DIR);
let changedCount = 0;

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const { out, changed } = normalizeConclusao(raw);
  if (changed) {
    fs.writeFileSync(f, out, "utf8");
    changedCount++;
  }
}

console.log(`✔ CONCLUSÃO normalizada em ${changedCount} arquivos.`);
