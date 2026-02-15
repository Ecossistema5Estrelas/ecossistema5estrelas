import { spawnSync } from "node:child_process";
import path from "node:path";

const __args = process.argv.slice(2);
const __t = __args.find(a => a.startsWith("--target="));
if (__t) {
  process.env.ECOS_TARGET_ROOT = __t.split("=").slice(1).join("="); // allow '=' inside paths
}

const ROOT = process.cwd();
const gates = [
  // HTML
  "gates/html/audit-html-structure.mjs",
  "gates/html/audit-html-headings.mjs",
  "gates/html/audit-html-landmarks.mjs",
  "gates/html/audit-html-forms.mjs",
  "gates/html/audit-html-a11y.mjs",
  "gates/html/audit-progressive-enhancement.mjs",

  // CSS
  "gates/css/audit-css-tokens.mjs",
  "gates/css/audit-css-layout.mjs",
  "gates/css/audit-css-motion.mjs",

  // JS
  "gates/js/audit-js-inline.mjs",
  "gates/js/audit-js-fallbacks.mjs",
  "gates/js/audit-js-dynamic-execution.mjs",
];

let ok = true;

for (const g of gates) {
  const p = path.join(ROOT, g);
  const r = spawnSync(process.execPath, [p], { stdio: "inherit" });
  if (r.status !== 0) ok = false;
}

process.exit(ok ? 0 : 1);

