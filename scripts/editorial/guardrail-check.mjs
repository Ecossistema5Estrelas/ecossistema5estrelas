import { listMdFiles, readUtf8, assertRequiredSections, assertNoMarkdown, hardFail } from "./guardrail.lib.mjs";

const dir = "posts";
const files = listMdFiles(dir);

if (files.length === 0) hardFail("Nenhum .md encontrado em posts\\.");

let ok = 0;
let bad = 0;

for (const f of files) {
  try {
    const raw = readUtf8(f);
    assertRequiredSections(raw);
    assertNoMarkdown(raw);
    ok++;
  } catch (e) {
    bad++;
    console.error(`❌ ${f}`);
    console.error(String(e?.message || e));
  }
}

if (bad > 0) {
  console.error(`\n❌ GUARDRAIL CHECK FALHOU: ${bad} arquivo(s) inválido(s).`);
  process.exit(1);
}

console.log(`✅ GUARDRAIL CHECK OK: ${ok} arquivo(s) válido(s).`);
process.exit(0);
