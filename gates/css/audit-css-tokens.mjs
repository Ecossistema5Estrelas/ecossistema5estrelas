import fs from "node:fs";
import path from "node:path";

// ECOS_TARGET_ROOT: documentado semanticamente
// TARGET: documentado semanticamente

const GATE_ID = "CSS/audit-css-tokens";
const cwd = process.cwd();

const cfgPath = path.join(cwd, "gates", "config", "css-tokens.allow.json");
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));

const auditDir = path.join(cwd, "_audit", "CSS");
const outJson = path.join(auditDir, "css-tokens.json");
const outTxt  = path.join(auditDir, "css-tokens.txt");
const outSummary = path.join(auditDir, "css-tokens-summary.txt");

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function isIgnored(fp) {
  return cfg.ignore_patterns.some(p => fp.includes(p));
}

function isMinified(fp, src) {
  if (fp.endsWith(".min.css")) return true;
  const lines = src.split(/\r?\n/);
  return lines.length < 5 && src.length > 500;
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (isIgnored(full)) continue;
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function rel(fp) {
  return path.relative(cwd, fp).replaceAll("\\", "/");
}

function classify(value, prefixes) {
  return prefixes.some(p => value.includes(p)) ? "INTEGRATED" : "HARD_CODED";
}

function main() {
  ensureDir(auditDir);

  const files = cfg.scan_roots
    .map(r => path.join(cwd, r))
    .flatMap(r => walk(r))
    .filter(f => f.endsWith(".css") || f.endsWith(".scss") || f.endsWith(".tsx"));

  const issues = [];
  const map = [];

  const counters = { COLOR: 0, SPACE: 0, SIZE: 0, MOTION: 0 };

  const colorRe = /(color|background|border-color)\s*:\s*([^;]+);/gi;
  const spaceRe = /(margin|padding|gap)\s*:\s*([^;]+);/gi;
  const sizeRe  = /(font-size|width|height|border-radius)\s*:\s*([^;]+);/gi;
  const motionRe = /(animation|transition)\s*:\s*([^;]+);/gi;

  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    if (isMinified(f, src)) continue;

    let m;

    const scan = (re, prefixes, kind) => {
      while ((m = re.exec(src)) !== null) {
        const value = m[2].trim();
        const status = classify(value, prefixes);
        counters[kind]++;
        map.push({ file: rel(f), kind, value, status });
        if (status === "HARD_CODED") {
          issues.push({
            code: `CSS_${kind}_HARDCODED`,
            file: rel(f),
            value,
            message: `${kind} usando valor hardcoded.`
          });
        }
      }
    };

    scan(colorRe,  cfg.color_tokens_prefixes,  "COLOR");
    scan(spaceRe,  cfg.space_tokens_prefixes,  "SPACE");
    scan(sizeRe,   cfg.size_tokens_prefixes,   "SIZE");
    scan(motionRe, cfg.motion_tokens_prefixes, "MOTION");
  }

  const ok = issues.length === 0;

  const report = {
    gate: GATE_ID,
    ok,
    issues_count: issues.length,
    stats: {
      files_scanned: files.length,
      counters
    },
    issues,
    map
  };

  const txt =
`[GATE] ${GATE_ID}
[OK] ${ok ? "true" : "false"}
[ISSUES] ${issues.length}
FILES: ${files.length}
COLOR: ${counters.COLOR}
SPACE: ${counters.SPACE}
SIZE: ${counters.SIZE}
MOTION: ${counters.MOTION}
`;

  const summary =
`CSS TOKENS — SUMMARY

FILES SCANNED: ${files.length}

COLOR:  ${counters.COLOR}
SPACE:  ${counters.SPACE}
SIZE:   ${counters.SIZE}
MOTION: ${counters.MOTION}

ISSUES: ${issues.length}
STATUS: ${ok ? "OK" : "BLOCKED"}
`;

  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8");
  fs.writeFileSync(outTxt, txt, "utf8");
  fs.writeFileSync(outSummary, summary, "utf8");

  console.log(`${GATE_ID} GATE COMPLETE`);
  console.log(`Report: ${outJson}`);
  console.log(`Text: ${outTxt}`);
  console.log(`Summary: ${outSummary}`);

  if (!ok) process.exitCode = 1;
}

main();

