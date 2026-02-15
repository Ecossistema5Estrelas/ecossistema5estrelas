import fs from "fs/promises";

const NAV_PATH = "reports/navigation.semantic.v1.json";
const TAX_PATH = "taxonomy.v1.json";

function fail(msg) {
  throw new Error("[SEMANTIC] " + msg);
}

export async function readNavigation() {
  try {
    const raw = await fs.readFile(NAV_PATH, "utf8");
    const nav = JSON.parse(raw);
    if (!nav?.version || !nav?.views || !nav?.axes) fail("navigation semantic inválida");
    return nav;
  } catch (e) {
    fail("Falha ao ler " + NAV_PATH + " :: " + (e?.message || String(e)));
  }
}

export async function readTaxonomy() {
  try {
    const raw = await fs.readFile(TAX_PATH, "utf8");
    const tax = JSON.parse(raw);
    if (!Array.isArray(tax?.categories)) fail("taxonomy inválida (categories ausente)");
    return tax;
  } catch (e) {
    fail("Falha ao ler " + TAX_PATH + " :: " + (e?.message || String(e)));
  }
}