import path from "node:path";
import fsp from "node:fs/promises";
import { repoRoot, nowStamp, writeJson, writeText, fileExists, rel } from "./audit-lib.mjs";

const ROOT = repoRoot();
const ts = nowStamp();
const outDir = path.join(ROOT, "_audit", "I1", ts);

async function loadLatest(prefixName) {
  // Find latest audit folder under _audit/I1 and load file if exists
  const base = path.join(ROOT, "_audit", "I1");
  let dirs = [];
  try {
    dirs = (await fsp.readdir(base, { withFileTypes: true }))
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort()
      .reverse();
  } catch {
    return null;
  }
  for (const d of dirs) {
    const fp = path.join(base, d, prefixName);
    if (await fileExists(fp)) {
      const s = await fsp.readFile(fp, "utf8");
      try { return { folder: d, data: JSON.parse(s), file: rel(fp) }; } catch { return { folder: d, data: null, file: rel(fp) }; }
    }
  }
  return null;
}

const routes = await loadLatest("routes.map.json");
const consumption = await loadLatest("contracts.consumption.json");
const states = await loadLatest("states.detect.json");
const paths = await loadLatest("paths.detect.json");

const missingSurfaces = routes?.data?.missingRequiredSurfaces ?? ["(routes.map.json missing)"];
const contractExist = consumption?.data?.existence ?? [];
const knownStateFiles = consumption?.data?.parsedKnownStateFiles ?? [];

const requiredPublic = ["E6.indices","E7.paths","E8.memory","E9.plans"];
const publicOk = requiredPublic.every(k => contractExist.some(e => e.key === k && e.exists === true));

const knownOk = knownStateFiles.filter(x => x.exists === false).length === 0;

const verdict = {
  ts,
  evidence: {
    routes: routes?.file ?? null,
    consumption: consumption?.file ?? null,
    states: states?.file ?? null,
    paths: paths?.file ?? null
  },
  checks: {
    requiredSurfacesMissingCount: missingSurfaces.length,
    requiredSurfacesMissing: missingSurfaces,
    publicContractsPresent: publicOk,
    knownStateFilesPresent: knownOk
  },
  decision: "INCONCLUSIVE",
  blockers: []
};

if (missingSurfaces.length > 0) verdict.blockers.push({ code: "SURFACES_MISSING", detail: missingSurfaces });
if (!publicOk) verdict.blockers.push({ code: "PUBLIC_CONTRACT_OUTPUTS_MISSING", detail: contractExist });
if (!knownOk) verdict.blockers.push({ code: "KNOWN_STATE_FILES_MISSING", detail: knownStateFiles });

verdict.decision = verdict.blockers.length === 0 ? "APPROVED_FOR_PATCH_MINIMUM" : "BLOCKED";

await writeJson(path.join(outDir, "gate-i1.json"), verdict);

let txt = `GATE I1 VERDICT\nTimestamp: ${new Date().toISOString()}\n\n`;
txt += `Decision: ${verdict.decision}\n\n`;
txt += `Missing surfaces: ${missingSurfaces.length}\n` + missingSurfaces.map(x=>`- ${x}`).join("\n") + "\n\n";
txt += `Public contract outputs present: ${publicOk}\nKnown state files present: ${knownOk}\n\n`;
txt += `Blockers (${verdict.blockers.length}):\n` + verdict.blockers.map(b=>`- ${b.code}`).join("\n") + "\n";
await writeText(path.join(outDir, "gate-i1.txt"), txt);

console.log("GATE I1 COMPLETE");
console.log("Decision:", verdict.decision);
console.log("Report:", rel(path.join(outDir, "gate-i1.json")));