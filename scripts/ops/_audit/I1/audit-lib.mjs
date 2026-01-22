import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

export function repoRoot() {
  return process.cwd();
}

export async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

export function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export async function writeJson(filePath, obj) {
  await ensureDir(path.dirname(filePath));
  await fsp.writeFile(filePath, JSON.stringify(obj, null, 2), "utf8");
}

export async function writeText(filePath, text) {
  await ensureDir(path.dirname(filePath));
  await fsp.writeFile(filePath, text, "utf8");
}

export async function readJsonIfExists(p) {
  try {
    const s = await fsp.readFile(p, "utf8");
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export async function fileExists(p) {
  try { await fsp.access(p, fs.constants.F_OK); return true; } catch { return false; }
}

export async function listFilesRecursive(dir, filterFn = () => true) {
  const out = [];
  async function walk(d) {
    let entries = [];
    try { entries = await fsp.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const fp = path.join(d, e.name);
      if (e.isDirectory()) await walk(fp);
      else if (e.isFile() && filterFn(fp)) out.push(fp);
    }
  }
  await walk(dir);
  return out;
}

export async function grepFiles(files, needles) {
  const hits = [];
  for (const fp of files) {
    let s = "";
    try { s = await fsp.readFile(fp, "utf8"); } catch { continue; }
    for (const needle of needles) {
      if (s.includes(needle)) {
        hits.push({ file: fp, needle });
      }
    }
  }
  return hits;
}

export function rel(p) {
  return path.relative(process.cwd(), p).replaceAll("\\", "/");
}