import { spawnSync } from "node:child_process";
import { parseArgs, assertPatchContract, assertFileExists, isPlaceholder, hardFail } from "./guardrail.lib.mjs";

const args = parseArgs(process.argv.slice(2));
assertPatchContract(args);

const slug = args.slug;
const bodyFile = args["body-file"];

if (!bodyFile) hardFail("Faltou --body-file.");
if (isPlaceholder(bodyFile)) hardFail("body-file contém placeholder.");

assertFileExists(bodyFile);

const res = spawnSync(process.execPath, [
  "scripts/editorial/patch-post-body-from-md.mjs",
  "--slug", slug,
  "--body-file", bodyFile
], { stdio: "inherit", windowsHide: true });

process.exit(res.status ?? 1);
