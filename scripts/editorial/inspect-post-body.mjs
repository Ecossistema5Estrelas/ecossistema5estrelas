import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_EDITORIAL_TOKEN,
  apiVersion: '2023-10-01',
  useCdn: false,
});

const SLUG = "orquestrar-nao-e-centralizar-arquitetura-distribuida-controle-consciente";

async function run() {
  const post = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{_id, body}`,
    { slug: SLUG }
  );

  if (!post) {
    console.log("❌ Post não encontrado.");
    return;
  }

  console.log("🧾 BODY BRUTO:");
  console.dir(post.body, { depth: 10 });
}

run().catch(err => {
  console.error("❌ Erro:", err);
  process.exit(1);
});