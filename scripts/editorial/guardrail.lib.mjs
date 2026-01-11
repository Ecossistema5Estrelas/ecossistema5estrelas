import fs from "node:fs";
import path from "node:path";

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

export function hardFail(msg) {
  console.error(`❌ GUARDRAIL: ${msg}`);
  process.exit(1);
}

export function isPlaceholder(v) {
  if (!v) return false;
  const s = String(v).trim();
  const bad = [
    "COLE_AQUI",
    "<ID",
    "ID-RETORNADO",
    "ID_QUE_",
    "<SLUG",
    "slug-definido",
    "TITULO-DEFINITIVO",
  ];
  if (bad.some(b => s.includes(b))) return true;
  if (s.includes("<") || s.includes(">")) return true;
  return false;
}

export function assertFileExists(filePath) {
  if (!filePath) hardFail("Arquivo não informado (--body-file).");
  if (!fs.existsSync(filePath)) hardFail(`Arquivo não existe: ${filePath}`);
}

export function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

/**
 * CORREÇÃO DEFINITIVA:
 * Detecta headers independentemente de:
 * - CRLF / LF
 * - BOM invisível
 * - Espaços antes do header
 * - Posição no arquivo
 */
export function assertRequiredSections(raw) {
  const required = [
    "TÍTULO",
    "AUTOR",
    "DATA",
    "RESUMO",
    "INTRODUÇÃO",
    "DESENVOLVIMENTO",
    "CONCLUSÃO",
  ];

  for (const r of required) {
    const rx = new RegExp(`(^|\\r?\\n)${r}(\\r?\\n|$)`, "m");
    if (!rx.test(raw)) {
      hardFail(`Seção obrigatória ausente: ${r}`);
    }
  }
}

export function assertNoMarkdown(raw) {
  const forbidden = [
    /^#{1,6}\s/m,                 // headings markdown
    /```/m,                       // code fences
    /\[[^\]]+\]\([^)]+\)/m,       // links markdown
    /(^|\s)[*_]{1,3}\S/m,         // bold/italic markers
    /^\s*[-*+]\s+/m,              // listas markdown
    /^\s*\d+\.\s+/m,              // listas numeradas markdown
  ];
  if (forbidden.some(rx => rx.test(raw))) {
    hardFail("Conteúdo contém traços de Markdown. Texto deve ser CRU.");
  }
}

export function assertCanonicalTitleSlug(title, slug) {
  if (!title) hardFail("Título ausente (--title).");
  if (!slug) hardFail("Slug ausente (--slug).");
  if (isPlaceholder(title)) hardFail("Título contém placeholder.");
  if (isPlaceholder(slug)) hardFail("Slug contém placeholder.");

  if (slug !== slug.toLowerCase()) hardFail("Slug deve ser minúsculo.");
  if (/[áàâãéèêíìîóòôõúùûç]/i.test(slug)) hardFail("Slug não pode conter acentos.");
  if (/\s/.test(slug)) hardFail("Slug não pode conter espaços.");
  if (/[\u2013\u2014]/.test(slug)) hardFail("Slug não pode conter travessão especial.");
  if (/\/|\\/.test(slug)) hardFail("Slug não pode conter barras.");
}

export function assertPatchContract(args) {
  // Contrato atual válido: PATCH POR SLUG
  if (args.id) hardFail("Contrato atual: PATCH por --slug (não usar --id).");
  if (!args.slug) hardFail("Patch exige --slug.");
  if (isPlaceholder(args.slug)) hardFail("Slug contém placeholder.");
}

export function listMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(".md"))
    .map(f => path.join(dir, f));
}