#!/usr/bin/env node
import fs from "fs";

function out(status, msg, code){
  const p = status==="OK"?"✅":status==="BLOCKED"?"🟨":"❌";
  console.log(`${p} ${status} gate-size: ${msg}`);
  process.exit(code);
}

const file = process.argv[2];
const maxKB = Number(process.argv[3] || 256); // default 256KB

if (!file) out("FAIL","Usage: node gate-size.mjs <file> [maxKB]",1);
if (!fs.existsSync(file)) out("FAIL",`File not found: ${file}`,1);

const bytes = fs.statSync(file).size;
const kb = Math.ceil(bytes/1024);

if (kb > maxKB) out("BLOCKED",`File too large (${kb}KB > ${maxKB}KB): ${file}`,2);

out("OK",`Size OK (${kb}KB <= ${maxKB}KB): ${file}`,0);