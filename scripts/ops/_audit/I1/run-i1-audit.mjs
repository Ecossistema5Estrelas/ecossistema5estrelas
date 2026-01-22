import { spawnSync } from "node:child_process";
import path from "node:path";

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) {
    process.exitCode = r.status ?? 1;
    throw new Error(`FAILED: ${cmd} ${args.join(" ")}`);
  }
}

console.log("I1 AUDIT RUN START");

run("node", [path.join("scripts","ops","_audit","I1","map-routes.mjs")]);
run("node", [path.join("scripts","ops","_audit","I1","detect-contract-consumption.mjs")]);
run("node", [path.join("scripts","ops","_audit","I1","detect-states.mjs")]);
run("node", [path.join("scripts","ops","_audit","I1","detect-paths.mjs")]);
run("node", [path.join("scripts","ops","_audit","I1","gate-i1.mjs")]);

console.log("I1 AUDIT RUN COMPLETE");