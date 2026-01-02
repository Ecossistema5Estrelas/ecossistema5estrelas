import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false,
});

const query = `
*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt
}
`;

const posts = await client.fetch(query);

const ghosts = posts.filter(p =>
  !p.slug?.current ||
  !p.publishedAt ||
  new Date(p.publishedAt) > new Date()
);

if (ghosts.length) {
  console.error("🚨 POSTS FANTASMAS DETECTADOS:");
  console.table(ghosts);
  process.exit(1);
}

console.log("✅ Nenhum post fantasma encontrado.");