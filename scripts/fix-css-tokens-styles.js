const fs = require("fs");
const path = require("path");

const issues = JSON.parse(fs.readFileSync("./_audit/CSS/css-tokens-issues.styles.json","utf8"));
const tokensFile = "styles/tokens.css";

let tokens = fs.readFileSync(tokensFile,"utf8");
if (!tokens.includes(":root")) throw new Error("tokens.css inválido: sem :root");

const counters = { COLOR:0, SPACE:0, SIZE:0, MOTION:0 };
const inserts = [];

function tokenName(kind){
  counters[kind] = (counters[kind]||0) + 1;
  const base = kind.toLowerCase();
  return "--" + base + "-auto-" + String(counters[kind]).padStart(2,"0");
}

for (const it of issues){
  const kind = it.code.replace(/^CSS_/,"").replace(/_HARDCODED$/,"");
  const file = it.file;
  const value = String(it.value);

  const abs = path.join(process.cwd(), file);
  if (!fs.existsSync(abs)) continue;

  let src = fs.readFileSync(abs,"utf8");
  if (!src.includes(value)) continue;

  const t = tokenName(kind);
  const replacement = "var(" + t + ")";

  src = src.split(value).join(replacement);
  fs.writeFileSync(abs, src, "utf8");

  inserts.push("  " + t + ": " + value + ";");
  console.log("PATCHED ->", file, "=>", t);
}

if (inserts.length){
  tokens = tokens.replace(/:root\s*\{\s*([\s\S]*?)\n\}/m, (m, body)=> {
    const b = body.trimEnd();
    const add = inserts.join("\n");
    return `:root {\n${b}\n\n  /* auto-tokens (css-tokens gate) */\n${add}\n}`;
  });
  fs.writeFileSync(tokensFile, tokens, "utf8");
  console.log("UPDATED ->", tokensFile, "added", inserts.length, "tokens");
} else {
  console.log("NO_STYLE_ISSUES_PATCHED");
}
