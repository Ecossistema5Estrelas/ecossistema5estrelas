import fs from "fs";
import path from "path";

const POSTS_DIR = "posts";
const today = new Date().toISOString().slice(0, 10);

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));

let changed = 0;

for (const file of files) {
  const fullPath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  const lines = raw.split(/\r?\n/);

  if (lines[0].trim() === "TÍTULO") continue;

  const oldTitle = lines[0].trim();

  const rest = lines.slice(1).join("\n").replace(/^\n+/, "");

  const normalized = [
    "TÍTULO",
    "",
    oldTitle,
    "",
    "AUTOR",
    "",
    "ArqFuturum",
    "",
    "DATA",
    "",
    today,
    "",
    "",
    rest
  ].join("\n");

  fs.writeFileSync(fullPath, normalized, "utf8");
  changed++;
}

console.log(`✔ Normalização concluída: ${changed} arquivos ajustados.`);