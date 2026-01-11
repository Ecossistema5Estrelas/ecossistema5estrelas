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

function normalizeTitulo(raw) {
  const eol = detectEol(raw);

  // Normaliza variações tipo: TITULO, Titulo, TÍTULO:
  let out = raw
    .replace(/^[ \t]*TITULO[ \t]*:?[ \t]*$/gmi, "TÍTULO")
    .replace(/^[ \t]*T[IÍ]TULO[ \t]*:?[ \t]*$/gmi, "TÍTULO");

  const has = /(^|\r?\n)TÍTULO(\r?\n|$)/.test(out);
  if (has) return { out, changed: out !== raw };

  // Se não existe, injeta no topo
  out = "TÍTULO" + eol + eol + out;

  return { out, changed: true };
}

const files = listMdFiles(POSTS_DIR);
let changedCount = 0;

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const { out, changed } = normalizeTitulo(raw);
  if (changed) {
    fs.writeFileSync(f, out, "utf8");
    changedCount++;
  }
}

console.log(`✔ TÍTULO normalizado em ${changedCount} arquivos.`);
