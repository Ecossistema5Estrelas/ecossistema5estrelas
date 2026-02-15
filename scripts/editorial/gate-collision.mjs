#!/usr/bin/env node
import fs from "fs";

function out(status,msg,code){
  const p=status==="OK"?"✅":status==="BLOCKED"?"🟨":"❌";
  console.log(`${p} ${status} gate-collision: ${msg}`);
  process.exit(code);
}

const slug = (process.argv[2]||"").trim();
const postsDir = (process.argv[3]||"posts").trim();

if (!slug) out("FAIL","Usage: node gate-collision.mjs <slug> [postsDir]",1);
if (!fs.existsSync(postsDir)) out("OK",`Posts dir not found -> skipping collision check (${postsDir})`,3);

const files = fs.readdirSync(postsDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name);

const hit = files.find(f => f.includes(slug));
if (hit) out("BLOCKED",`Potential collision: '${slug}' appears in '${hit}'`,2);

out("OK",`No collision detected for slug '${slug}' in '${postsDir}'`,0);