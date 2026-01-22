import path from "node:path";
import { repoRoot, nowStamp, writeJson, writeText, readJsonIfExists, fileExists, rel } from "./audit-lib.mjs";

const ROOT = repoRoot();
const ts = nowStamp();
const outDir = path.join(ROOT, "_audit", "I1", ts);

const e7 = path.join(ROOT, "public", "_paths", "e7-state.json");
const e7Obj = await readJsonIfExists(e7);

const pathSignals = [
  "linear", "modular", "reticular", "return", "continuity",
  "trilha", "percursos", "caminho", "sequencia", "serie"
];

function findSignals(obj) {
  if (!obj) return [];
  const s = JSON.stringify(obj).toLowerCase();
  return pathSignals.filter(k => s.includes(k));
}

const report = {
  ts,
  input: { file: rel(e7), exists: await fileExists(e7), signals: findSignals(e7Obj) },
  expectedPathTypes: ["Linear", "Modular", "Reticular", "Retorno", "Continuidade"]
};

await writeJson(path.join(outDir, "paths.detect.json"), report);

let txt = `I1 PATHS DETECT\nTimestamp: ${new Date().toISOString()}\n\n`;
txt += `- ${report.input.file}: ${report.input.exists ? "OK" : "MISSING"} | signals: ${report.input.signals.join(", ") || "(none)"}\n`;
await writeText(path.join(outDir, "paths.detect.txt"), txt);

console.log("I1 PATHS DETECT OK");
console.log("Audit:", rel(path.join(outDir, "paths.detect.json")));