import path from "node:path";
import { listFilesRecursive, repoRoot, nowStamp, writeJson, writeText, rel } from "./audit-lib.mjs";

const ROOT = repoRoot();
const ts = nowStamp();
const outDir = path.join(ROOT, "_audit", "I1", ts);

const appDir = path.join(ROOT, "app");

const pageLike = (fp) => /[\\\/](page|route)\.(tsx|ts|jsx|js)$/.test(fp);

function routeFromFile(fp) {
  // app/<segments>/page.tsx -> /<segments>
  const r = path.relative(appDir, fp).replaceAll("\\", "/");
  const parts = r.split("/");
  parts.pop(); // remove file name
  // ignore group segments ( ... )
  const segs = parts.filter(s => !(s.startsWith("(") && s.endsWith(")")));
  const url = "/" + segs.join("/");
  return url === "/" ? "/" : url.replace(/\/+$/,"");
}

function classify(url) {
  if (url.startsWith("/blog")) return "blog";
  if (url.startsWith("/posts")) return "posts";
  if (url.startsWith("/tags")) return "tags";
  if (url.startsWith("/series")) return "series";
  if (url.startsWith("/busca") || url.startsWith("/search")) return "search";
  if (url.startsWith("/continuar")) return "continue";
  if (url.startsWith("/planejamento")) return "plan";
  if (url.startsWith("/admin/semantic")) return "admin.semantic";
  return "other";
}

const requiredSurfaces = [
  "/",                 // home editorial OR site home (we accept as surface entry)
  "/blog",
  "/blog/[slug]",
  "/blog/temas",
  "/blog/temas/[slug]",
  "/blog/timeline",
  "/continuar",
  "/planejamento",
  "/busca"
];

const files = await listFilesRecursive(appDir, pageLike);

const routes = files.map(fp => {
  const url = routeFromFile(fp);
  return { url, kind: classify(url), file: rel(fp) };
}).sort((a,b)=>a.url.localeCompare(b.url));

const present = new Set(routes.map(r=>r.url));
const missing = requiredSurfaces.filter(x => !present.has(x));

const report = {
  ts,
  appDir: rel(appDir),
  counts: {
    total_route_files: files.length,
    total_routes: routes.length
  },
  routes,
  requiredSurfaces,
  missingRequiredSurfaces: missing
};

await writeJson(path.join(outDir, "routes.map.json"), report);

let txt = `I1 ROUTES MAP\nTimestamp: ${new Date().toISOString()}\n\n`;
txt += `Total route files: ${files.length}\nTotal routes: ${routes.length}\n\n`;
txt += `Missing required surfaces (${missing.length}):\n` + missing.map(x=>`- ${x}`).join("\n") + "\n\n";
txt += routes.map(r=>`${r.url}\t${r.kind}\t${r.file}`).join("\n") + "\n";

await writeText(path.join(outDir, "routes.map.txt"), txt);

console.log("I1 ROUTES MAP OK");
console.log("Audit:", rel(path.join(outDir, "routes.map.json")));