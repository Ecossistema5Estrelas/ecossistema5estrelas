import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const mustExist = (p) => {
  const abs = path.join(ROOT, p);
  if (!fs.existsSync(abs)) throw new Error(`MISSING: ${p}`);
  return abs;
};

const read = (p) => fs.readFileSync(p, "utf8");

const report = {
  gate: "BLOG_E5_READING_MODES",
  ok: false,
  checks: [],
};

const check = (name, fn) => {
  try {
    fn();
    report.checks.push({ name, ok: true });
  } catch (e) {
    report.checks.push({ name, ok: false, error: String(e.message || e) });
  }
};

check("contract_exists", () =>
  mustExist("contracts/blog/e5-reading-modes.contract.json")
);

check("e5_core_exists", () =>
  mustExist("src/lib/blog/e5-reading.ts")
);

check("reader_route_exists", () => {
  const candidates = [
    "app/blog/[slug]/page.tsx",
    "src/app/blog/[slug]/page.tsx",
    "app/blog/(reader)/[slug]/page.tsx",
    "src/app/blog/(reader)/[slug]/page.tsx"
  ].map((p) => path.join(ROOT, p));
  if (!candidates.some((p) => fs.existsSync(p)))
    throw new Error("Missing /blog/[slug] reader route");
});

check("reader_reads_mode", () => {
  const candidates = [
    "app/blog/[slug]/page.tsx",
    "src/app/blog/[slug]/page.tsx",
    "app/blog/(reader)/[slug]/page.tsx",
    "src/app/blog/(reader)/[slug]/page.tsx"
  ].map((p) => path.join(ROOT, p)).filter(fs.existsSync);

  const hit = candidates.some((p) => {
    const s = read(p);
    return s.includes("parseReadingMode") && s.includes("searchParams");
  });

  if (!hit)
    throw new Error("No evidence of parseReadingMode(searchParams) in reader");
});

check("fallback_defined", () => {
  const core = read(path.join(ROOT, "src/lib/blog/e5-reading.ts"));
  if (!core.includes('fallback: ReadingMode = "focus"') && !core.includes('= "focus"'))
    throw new Error("No deterministic fallback to 'focus' detected");
});

report.ok = report.checks.every((c) => c.ok);

const outDir = path.join(ROOT, "_audit", "BLOG");
fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, "blog-e5-reading.json");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

if (!report.ok) {
  console.error("BLOG E5 READING GATE FAILED");
  console.error("Report:", jsonPath);
  process.exit(1);
}

console.log("BLOG E5 READING GATE COMPLETE");
console.log("Report:", jsonPath);