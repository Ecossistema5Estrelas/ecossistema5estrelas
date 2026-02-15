import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function extractBalanced(src, i) {
  let depth = 0, inS=false, inD=false, inT=false, esc=false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc=false; continue; }
    if (c === "\\") { esc=true; continue; }
    if (!inD && !inT && c === "'") { inS=!inS; continue; }
    if (!inS && !inT && c === '"') { inD=!inD; continue; }
    if (!inS && !inD && c === "`") { inT=!inT; continue; }
    if (inS || inD || inT) continue;
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) return i+1;
    }
  }
  return -1;
}

function isPureRef(s) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*(\.[A-Za-z_$][A-Za-z0-9_$]*)*$/.test(s.trim());
}

function findReturn(src) {
  const m = src.match(/\breturn\s*(\(|<)/);
  return m ? m.index : -1;
}

function fix(file) {
  const abs = path.join(ROOT, file);
  let src = fs.readFileSync(abs, "utf8");
  const rx = /\bon([A-Z][A-Za-z0-9]*)\s*=\s*\{/g;

  let matches = [];
  let m;
  while ((m = rx.exec(src))) {
    const ev = m[1];
    const start = src.indexOf("{", m.index);
    const end = extractBalanced(src, start);
    if (end === -1) continue;
    const inner = src.slice(start+1, end-1).trim();
    if (isPureRef(inner)) continue; // já está ok
    matches.push({ ev, start, end, inner });
    rx.lastIndex = end;
  }

  if (!matches.length) return { file, changed:false };

  const retAt = findReturn(src);
  if (retAt === -1) return { file, changed:false };

  let insert = [];
  let idx = 1;

  matches.reverse().forEach(m => {
    const name = `handle${m.ev}${String(idx++).padStart(2,"0")}`;
    insert.push(`  const ${name} = () => (${m.inner});`);
    src = src.slice(0, m.start) + `{${name}}` + src.slice(m.end);
  });

  src = src.slice(0, retAt) + insert.join("\n") + "\n\n" + src.slice(retAt);
  fs.writeFileSync(abs, src, "utf8");
  return { file, changed:true, count: matches.length };
}

const r = JSON.parse(fs.readFileSync("./_audit/JS/js-inline.json","utf8"));
const out = [];
for (const i of r.issues) {
  const f = i.file.replaceAll("\\","/");
  const res = fix(f);
  out.push(res);
}

const lines = ["[FIX] JS Inline Execution"];
out.forEach(o=>{
  lines.push(`${o.changed?"PATCHED":"SKIP"} -> ${o.file}${o.changed?` (${o.count})`:""}`);
});

fs.writeFileSync("./_audit/JS/js-inline-fix.txt", lines.join("\n")+"\n","utf8");
console.log(lines.join("\n"));
