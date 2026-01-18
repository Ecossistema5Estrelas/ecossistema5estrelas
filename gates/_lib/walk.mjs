import fs from "node:fs";
import path from "node:path";

const DEFAULT_EXCLUDES = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  ".git",
  ".vercel",
  ".turbo",
  "coverage",
  ".cache"
]);

export function walkFiles(rootDir, { exts = [], exclude = [] } = {}) {
  const out = [];
  const ex = new Set([...DEFAULT_EXCLUDES, ...exclude]);

  function rec(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (ex.has(e.name)) continue;
        rec(full);
        continue;
      }
      if (!e.isFile()) continue;
      if (exts.length === 0) {
        out.push(full);
        continue;
      }
      const ext = path.extname(e.name).toLowerCase();
      if (exts.includes(ext)) out.push(full);
    }
  }

  rec(rootDir);
  return out;
}

export function readTextSafe(filePath) {
  const buf = fs.readFileSync(filePath);
  // UTF-8 only; remove BOM if present
  let text = buf.toString("utf8");
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  return text;
}
