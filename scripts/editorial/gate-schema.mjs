#!/usr/bin/env node
import fs from "fs";

function out(status,msg,code){
  const p=status==="OK"?"✅":status==="BLOCKED"?"🟨":"❌";
  console.log(`${p} ${status} gate-schema: ${msg}`);
  process.exit(code);
}

const file = process.argv[2];
if (!file) out("FAIL","Usage: node gate-schema.mjs <body-file.md>",1);
if (!fs.existsSync(file)) out("FAIL",`File not found: ${file}`,1);

const s = fs.readFileSync(file,"utf8");

// Minimal: non-empty, no markdown headings like '# ' (your rule: no markdown formatting)
if (!s.trim()) out("BLOCKED","Body file is empty",2);
if (/(^|\n)\s*#\s+/.test(s)) out("BLOCKED","Markdown heading detected ('# '). Body must be plain text.",2);
if (s.length < 400) out("BLOCKED",`Body too short (<400 chars): ${s.length}`,2);

out("OK",`Body schema OK (${s.length} chars)`,0);