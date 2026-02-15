import path from "node:path";
import { repoRoot, nowStamp, writeJson, writeText, readJsonIfExists, fileExists, rel } from "./audit-lib.mjs";

const ROOT = repoRoot();
const ts = nowStamp();
const outDir = path.join(ROOT, "_audit", "I1", ts);

const stateSignals = [
  "never_read", "in_progress", "read", "returning", "continuity", "planned",
  "nunca_lido", "em_progresso", "lido", "em_retorno", "em_continuidade", "planejado"
];

const e8 = path.join(ROOT, "public", "_memory", "e8-state.json");
const e9 = path.join(ROOT, "public", "_plans", "e9-state.json");

const e8Obj = await readJsonIfExists(e8);
const e9Obj = await readJsonIfExists(e9);

function findSignals(obj) {
  if (!obj) return [];
  const s = JSON.stringify(obj).toLowerCase();
  return stateSignals.filter(k => s.includes(k));
}

const report = {
  ts,
  inputs: [
    { file: rel(e8), exists: await fileExists(e8), signals: findSignals(e8Obj) },
    { file: rel(e9), exists: await fileExists(e9), signals: findSignals(e9Obj) }
  ],
  expectedStates: [
    "Nunca lido", "Em progresso", "Lido", "Em retorno", "Em continuidade", "Planejado"
  ]
};

await writeJson(path.join(outDir, "states.detect.json"), report);

let txt = `I1 STATES DETECT\nTimestamp: ${new Date().toISOString()}\n\n`;
txt += report.inputs.map(i => `- ${i.file}: ${i.exists ? "OK" : "MISSING"} | signals: ${i.signals.join(", ") || "(none)"}`).join("\n") + "\n";
await writeText(path.join(outDir, "states.detect.txt"), txt);

console.log("I1 STATES DETECT OK");
console.log("Audit:", rel(path.join(outDir, "states.detect.json")));