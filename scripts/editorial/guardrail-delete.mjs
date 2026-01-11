import { spawnSync } from "node:child_process";
import { isPlaceholder, hardFail } from "./guardrail.lib.mjs";

const id = process.argv[2];
if (!id) hardFail("Faltou ID posicional: node guardrail-delete.mjs <ID>");
if (isPlaceholder(id)) hardFail("ID contém placeholder.");

const res = spawnSync(process.execPath, ["scripts/editorial/delete-post.mjs", id], {
  stdio: "inherit",
  windowsHide: true,
});

process.exit(res.status ?? 1);
