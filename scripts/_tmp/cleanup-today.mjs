import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_EDITORIAL_TOKEN,
  apiVersion: '2023-10-01',
  useCdn: false,
});

const start = new Date();
start.setUTCHours(0, 0, 0, 0);

const query = `
*[
  _type == "post" &&
  defined(publishedAt) &&
  publishedAt >= $start
]{
  _id,
  title,
  publishedAt
}
`;

async function run() {
  const posts = await client.fetch(query, {
    start: start.toISOString(),
  });

  if (!posts.length) {
    console.log("✅ Nenhum post de hoje encontrado.");
    return;
  }

  console.log("🧨 POSTS DE HOJE:");
  posts.forEach(p =>
    console.log("-", p.title, "(", p.publishedAt, ")")
  );

  console.log("\n🚨 APAGANDO…");
  for (const p of posts) {
    await client.delete(p._id);
    console.log("🗑️ removido:", p.title);
  }

  console.log("\n✅ Limpeza concluída.");
}

run().catch(err => {
  console.error("❌ Erro:", err);
  process.exit(1);
});