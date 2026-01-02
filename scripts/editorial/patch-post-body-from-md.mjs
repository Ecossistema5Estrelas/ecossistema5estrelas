#!/usr/bin/env node

import fs from "node:fs";
import process from "node:process";
import { createClient } from "@sanity/client";

const args = process.argv.slice(2);
const getArg = (k) => args[args.indexOf(k) + 1];

const SLUG = getArg("--slug");
const BODYF = getArg("--body-file");

const fail = (m) => {
  console.error("❌", m);
  process.exit(1);
};

if (!SLUG) fail("slug ausente");
if (!BODYF || !fs.existsSync(BODYF)) fail("body-file inválido");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_EDITORIAL_TOKEN,
  apiVersion: "2023-10-01",
  useCdn: false,
});

// 🔹 Conversão Markdown → PortableText simples (parágrafos)
function markdownToPortableText(md) {
  return md
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text,
          marks: [],
        },
      ],
      markDefs: [],
    }));
}

(async () => {
  // 1. Buscar post
  const post = await client.fetch(
    `*[_type=="post" && slug.current==$s][0]{_id,title}`,
    { s: SLUG }
  );

  if (!post?._id) fail("post não encontrado");

  // 2. Ler Markdown
  const md = fs.readFileSync(BODYF, "utf8");

  // 3. Converter
  const blocks = markdownToPortableText(md);

  if (blocks.length === 0) fail("conteúdo vazio após conversão");

  // 4. Patch
  await client.patch(post._id).set({ body: blocks }).commit();

  console.log("✅ BODY ATUALIZADO COM SUCESSO");
  console.log("• title:", post.title);
  console.log("• slug:", SLUG);
})();