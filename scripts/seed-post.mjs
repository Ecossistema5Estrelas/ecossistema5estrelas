import { config as dotenv } from "dotenv";
dotenv({ path: ".env.local" });
import { createClient } from "@sanity/client";

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-08-01";
const token      = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Faltam envs: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token });

async function upsertPost({ slug, title, subtitle, coverImage, readingTime = "4 min", bodyPortableText = [] }) {
  const id = `post-${slug}`;
  const doc = {
    _id: id,
    _type: "post",
    title,
    slug: { _type: "slug", current: slug },
    publishedAt: new Date().toISOString(),
    coverImage: coverImage ? { _type: "image", asset: { _type: "reference", _ref: coverImage } } : undefined,
    readingTime,
    bodyPortableText,
    author: "ArquiFuturum",
    tags: [],
  };
  await client.createOrReplace(doc);
  console.log("OK upsert:", slug);
}

async function run() {
  await upsertPost({
    slug: "amanhecer-das-5estrelas",
    title: "Notas ArqFuturum #1  O Amanhecer das 5ESTRELAS",
    subtitle: "O blog que não só comenta o futuro  o constrói com você.",
    bodyPortableText: [
      { _type: "block", children: [{ _type: "span", text: "O mundo não está apenas mudando; está sendo reprogramado..." }] },
      { _type: "block", style: "h3", children: [{ _type: "span", text: "Profissionalização viva  Aprender produzindo" }] },
      { _type: "block", children: [{ _type: "span", text: "Projetos, desafios e microcertificações." }] },
      { _type: "block", style: "h3", children: [{ _type: "span", text: "IA como amplificador" }] },
      { _type: "block", children: [{ _type: "span", text: "Ferramentas e prompts úteis, sem misticismo, com resultados." }] },
      { _type: "block", style: "h3", children: [{ _type: "span", text: "Negócios modulares" }] },
      { _type: "block", children: [{ _type: "span", text: "Microprodutos, assinaturas, bundles e comunidades." }] },
      { _type: "block", style: "h3", children: [{ _type: "span", text: "Cultura em alta-voltagem" }] },
      { _type: "block", children: [{ _type: "span", text: "Música, pintura, filmes, literatura e creators conectados a dados." }] },
      { _type: "block", style: "h3", children: [{ _type: "span", text: "Tração e receita" }] },
      { _type: "block", children: [{ _type: "span", text: "Distribuição, SEO prático, ativos próprios e parceria inteligente." }] },
      { _type: "block", style: "blockquote", children: [{ _type: "span", text: "Junte-se às primeiras notas. Quem entra cedo não só assiste à história  assina capítulos." }] },
    ],
  });

  await upsertPost({
    slug: "bastidores-da-inovacao",
    title: "Notas ArqFuturum #2  Bastidores da Inovação",
    subtitle: "O que ninguém vê (mas todos vão sentir).",
    bodyPortableText: [
      { _type: "block", style: "h3", children: [{ _type: "span", text: "Radar 5ESTRELAS" }] },
      { _type: "block", children: [{ _type: "span", text: "Acompanhe os primeiros sinais das novas experiências digitais e de inclusão." }] },
      { _type: "block", style: "normal", children: [{ _type: "span", text: "Você já imaginou ganhar por algo que ninguém jamais pensou em te pagar..." }] },
    ],
  });
}

run().catch((e) => { console.error(e); process.exit(1); });