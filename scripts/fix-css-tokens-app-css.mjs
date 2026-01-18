import fs from "node:fs";
import path from "node:path";

const issues = JSON.parse(fs.readFileSync("./_audit/CSS/css-tokens.json","utf8")).issues;
const targets = issues.filter(i => i.file.startsWith("app/") && i.file.endsWith(".css"));

if (!targets.length) {
  console.log("NO app/*.css ISSUES");
  process.exit(0);
}

const tokensFile = "styles/tokens.css";
let tokens = fs.readFileSync(tokensFile,"utf8");

const counters = { COLOR:0, SPACE:0, SIZE:0, MOTION:0 };
const inserts = [];

function tokenName(kind){
  counters[kind] = (counters[kind]||0)+1;
  return "--" + kind.toLowerCase() + "-auto-app-" + String(counters[kind]).padStart(2,"0");
}

for (const it of targets){
  const kind = it.code.replace(/^CSS_/,"").replace(/_HARDCODED$/,"");
  const file = it.file;
  const value = String(it.value);

  const abs = path.join(process.cwd(), file);
  if (!fs.existsSync(abs)) continue;

  let src = fs.readFileSync(abs,"utf8");
  if (!src.includes(value)) continue;

  const t = tokenName(kind);
  src = src.split(value).join(`var(${t})`);
  fs.writeFileSync(abs, src, "utf8");

  inserts.push(`  ${t}: ${value};`);
  console.log("PATCHED ->", file, "=>", t);
}

if (inserts.length){
  tokens = tokens.replace(/:root\s*\{\s*([\s\S]*?)\n\}/m, (m, body)=> {
    const b = body.trimEnd();
    return `:root {\n${b}\n\n  /* auto-tokens (app css) */\n${inserts.join("\n")}\n}`;
  });
  fs.writeFileSync(tokensFile, tokens, "utf8");
  console.log("UPDATED -> tokens.css");
}
