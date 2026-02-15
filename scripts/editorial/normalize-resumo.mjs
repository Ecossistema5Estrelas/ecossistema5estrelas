import fs from "fs";
import path from "path";

const POSTS_DIR = "posts";
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));

let fixed = 0;

for (const file of files) {
  const fullPath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  if (raw.includes("\nRESUMO\n")) continue;

  const lines = raw.split(/\r?\n/);

  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "DATA") {
      insertIndex = i + 3;
      break;
    }
  }

  if (insertIndex === -1) continue;

  lines.splice(
    insertIndex,
    0,
    "",
    "RESUMO",
    "",
    "[RESUMO A NORMALIZAR]",
    ""
  );

  fs.writeFileSync(fullPath, lines.join("\n"), "utf8");
  fixed++;
}

console.log(`✔ RESUMO normalizado em ${fixed} arquivos.`);