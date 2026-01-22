import path from "node:path";
import { repoRoot, nowStamp, writeJson, writeText, fileExists, readJsonIfExists, listFilesRecursive, grepFiles, rel } from "./audit-lib.mjs";

const ROOT = repoRoot();
const ts = nowStamp();
const outDir = path.join(ROOT, "_audit", "I1", ts);

const publicTargets = [
  { key: "E6.indices",  path: path.join(ROOT, "public", "_indices") },
  { key: "E7.paths",    path: path.join(ROOT, "public", "_paths") },
  { key: "E8.memory",   path: path.join(ROOT, "public", "_memory") },
  { key: "E9.plans",    path: path.join(ROOT, "public", "_plans") },
];

const auditTargets = [
  { key: "audit.E6", path: path.join(ROOT, "_audit", "E6") },
  { key: "audit.E7", path: path.join(ROOT, "_audit", "E7") },
  { key: "audit.E8", path: path.join(ROOT, "_audit", "E8") },
  { key: "audit.E9", path: path.join(ROOT, "_audit", "E9") },
];

const existence = [];
for (const t of [...publicTargets, ...auditTargets]) {
  existence.push({ key: t.key, exists: await fileExists(t.path), path: rel(t.path) });
}

// Look for canonical JSON outputs if present
const knownFiles = [
  path.join(ROOT, "public", "_indices", "e6-state.json"),
  path.join(ROOT, "public", "_paths",   "e7-state.json"),
  path.join(ROOT, "public", "_memory",  "e8-state.json"),
  path.join(ROOT, "public", "_plans",   "e9-state.json"),
];

const parsed = [];
for (const fp of knownFiles) {
  const obj = await readJsonIfExists(fp);
  parsed.push({ file: rel(fp), exists: obj !== null, topKeys: obj ? Object.keys(obj).slice(0, 20) : [] });
}

// Code consumption: grep for public paths usage
const codeDirs = ["app", "components", "lib", "src"].map(d => path.join(ROOT, d));
const needles = [
  "/_indices/", "/_paths/", "/_memory/", "/_plans/",
  "public/_indices", "public/_paths", "public/_memory", "public/_plans",
  "e6-state.json", "e7-state.json", "e8-state.json", "e9-state.json"
];

let codeFiles = [];
for (const d of codeDirs) {
  const files = await listFilesRecursive(d, (fp) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(fp));
  codeFiles = codeFiles.concat(files);
}

const hits = await grepFiles(codeFiles, needles);

const report = {
  ts,
  existence,
  parsedKnownStateFiles: parsed,
  codeConsumptionHits: hits.map(h => ({ file: rel(h.file), needle: h.needle }))
};

await writeJson(path.join(outDir, "contracts.consumption.json"), report);

let txt = `I1 CONTRACT CONSUMPTION\nTimestamp: ${new Date().toISOString()}\n\n`;
txt += "Existence:\n" + existence.map(e=>`- ${e.key}: ${e.exists ? "OK" : "MISSING"} (${e.path})`).join("\n") + "\n\n";
txt += "Known state files:\n" + parsed.map(p=>`- ${p.file}: ${p.exists ? "OK" : "MISSING"}`).join("\n") + "\n\n";
txt += `Code consumption hits: ${hits.length}\n` + hits.slice(0,200).map(h=>`- ${rel(h.file)} :: ${h.needle}`).join("\n") + "\n";

await writeText(path.join(outDir, "contracts.consumption.txt"), txt);

console.log("I1 CONTRACT CONSUMPTION OK");
console.log("Audit:", rel(path.join(outDir, "contracts.consumption.json")));