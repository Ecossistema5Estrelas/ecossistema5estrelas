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
  gate: "BLOG_E4_NAVIGATION",
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

check("contract_exists", () => mustExist("contracts/blog/e4-navigation.contract.json"));
check("e4_nav_lib_exists", () => mustExist("src/lib/blog/e4-nav.ts"));

check("blog_index_route_exists", () => {
  const a = path.join(ROOT, "app/blog/page.tsx");
  const b = path.join(ROOT, "src/app/blog/page.tsx");
  if (!fs.existsSync(a) && !fs.existsSync(b)) throw new Error("Missing /blog page.tsx in app router");
});

check("blog_reader_route_exists", () => {
  const candidates = [
    "app/blog/[slug]/page.tsx",
    "src/app/blog/[slug]/page.tsx",
    "app/blog/(reader)/[slug]/page.tsx",
    "src/app/blog/(reader)/[slug]/page.tsx"
  ].map((p) => path.join(ROOT, p));
  if (!candidates.some((p) => fs.existsSync(p))) throw new Error("Missing /blog/[slug] page.tsx route");
});

check("blog_index_reads_searchParams", () => {
  const candidates = [
    "app/blog/page.tsx",
    "src/app/blog/page.tsx"
  ].map((p) => path.join(ROOT, p)).filter(fs.existsSync);

  const hit = candidates.some((p) => {
    const s = read(p);
    return s.includes("searchParams") && s.includes("parseBlogNav");
  });

  if (!hit) throw new Error("No evidence of E4 parseBlogNav(searchParams) in /blog");
});

report.ok = report.checks.every((c) => c.ok);

const outDir = path.join(ROOT, "_audit", "BLOG");
fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, "blog-e4-navigation.json");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

if (!report.ok) {
  console.error("BLOG E4 NAVIGATION GATE FAILED");
  console.error("Report:", jsonPath);
  process.exit(1);
}

console.log("BLOG E4 NAVIGATION GATE COMPLETE");
console.log("Report:", jsonPath);