import fs from "node:fs";
import path from "node:path";

const dir = "posts";

const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

let broken = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");

  const normalized = raw.replace(/^\uFEFF/, ""); // remove BOM

  const hasTitulo = /(^|\r?\n)TÍTULO(\r?\n|$)/.test(normalized);

  if (!hasTitulo) {
    broken.push(f);
  }
}

console.log("Arquivos SEM header TÍTULO:");
broken.forEach(f => console.log(" -", f));
console.log(`Total: ${broken.length}`);
