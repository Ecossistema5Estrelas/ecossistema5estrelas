import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_EDITORIAL_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_EDITORIAL_TOKEN) {
  console.error("❌ ENV incompleto");
  process.exit(1);
}

const slug = process.argv[2];
if (!slug) {
  console.error('❌ Use: node sanity-check-slug.mjs "seu-slug"');
  process.exit(1);
}

const q = `*[_type=="post" && slug.current==$slug]{_id,title,publishedAt}`;
const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(q)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`;

const res = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_EDITORIAL_TOKEN}` } });
const json = await res.json();

console.log(JSON.stringify(json.result, null, 2));