import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function sha256(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function writeAudit({ area, gate, rootDir, auditDir, results }) {
  const areaDir = path.join(auditDir, area);
  ensureDir(areaDir);

  const jsonPath = path.join(areaDir, `${gate}.json`);
  const txtPath  = path.join(areaDir, `${gate}.txt`);

  const payload = {
    meta: {
      area,
      gate,
      rootDir,
      auditDir,
      createdAt: new Date().toISOString(),
      version: "GATES-CORE-1.0"
    },
    summary: {
      ok: results.ok,
      issues: results.issues.length
    },
    issues: results.issues
  };

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf8");

  const lines = [];
  lines.push(`[GATE] ${area}/${gate}`);
  lines.push(`[OK] ${results.ok ? "true" : "false"}`);
  lines.push(`[ISSUES] ${results.issues.length}`);
  lines.push("");
  for (const it of results.issues) {
    lines.push(`- ${it.code} :: ${it.file}${it.loc ? ":"+it.loc : ""}`);
    if (it.msg) lines.push(`  ${it.msg}`);
  }
  fs.writeFileSync(txtPath, lines.join("\n"), "utf8");

  return { jsonPath, txtPath, hash: sha256(JSON.stringify(payload)) };
}

export function exitByOk(ok) {
  process.exit(ok ? 0 : 1);
}
