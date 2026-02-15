#!/usr/bin/env node
function out(status,msg,code){
  const p=status==="OK"?"✅":status==="BLOCKED"?"🟨":"❌";
  console.log(`${p} ${status} gate-slug: ${msg}`);
  process.exit(code);
}

const slug = (process.argv[2]||"").trim();

if (!slug) out("FAIL","Missing slug argument",1);

// rules: lowercase, digits, hyphen; no leading/trailing hyphen; no double hyphen; 3..80 chars
const ok = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
if (!ok) out("BLOCKED",`Invalid slug: '${slug}'`,2);
if (slug.length < 3 || slug.length > 80) out("BLOCKED",`Slug length out of bounds (3..80): ${slug.length}`,2);
if (slug.includes("--")) out("BLOCKED",`Slug contains double hyphen: '${slug}'`,2);

out("OK",`Slug valid: '${slug}'`,0);