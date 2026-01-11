import { spawnSync } from "node:child_process";
import {
  parseArgs,
  assertCanonicalTitleSlug,
  assertFileExists,
  readUtf8,
  assertRequiredSections,
  assertNoMarkdown,
  isPlaceholder,
  hardFail,
} from "./guardrail.lib.mjs";

const args = parseArgs(process.argv.slice(2));

const title = args.title;
const slug = args.slug;
const bodyFile = args["body-file"];
const now = !!args.now;

assertCanonicalTitleSlug(title, slug);

if (!bodyFile) hardFail("Faltou --body-file.");
if (isPlaceholder(bodyFile)) hardFail("body-file contém placeholder.");

assertFileExists(bodyFile);

const raw = readUtf8(bodyFile);
assertRequiredSections(raw);
assertNoMarkdown(raw);

// chamar script real
const forward = [];
for (const [k, v] of Object.entries(args)) {
  if (k === "_") continue;
  if (v === true) forward.push(`--${k}`);
  else forward.push(`--${k}`, String(v));
}

const res = spawnSync(process.execPath, ["scripts/editorial/publish-post.mjs", ...forward], {
  stdio: "inherit",
  windowsHide: true,
});

process.exit(res.status ?? 1);
