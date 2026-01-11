import fs from "fs";
import path from "path";

const POSTS_DIR = "posts";
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));

let fixed = 0;

for (const file of files) {
  const fullPath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  if (raw.includes("\nINTRODUÇÃO\n")) continue;

  const lines = raw.split(/\r?\n/);

  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "RESUMO") {
      insertIndex = i + 3;
      break;
    }
  }

  if (insertIndex === -1) continue;

  lines.splice(
    insertIndex,
    0,
    "",
    "INTRODUÇÃO",
    "",
    "[INTRODUÇÃO A NORMALIZAR]",
    ""
  );

  fs.writeFileSync(fullPath, lines.join("\n"), "utf8");
  fixed++;
}

console.log(`✔ INTRODUÇÃO normalizada em ${fixed} arquivos.`);