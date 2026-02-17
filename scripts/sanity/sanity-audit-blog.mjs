import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_EDITORIAL_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_EDITORIAL_TOKEN) {
  console.error("❌ ENV incompleto");
  process.exit(1);
}

const q = `
*[_type=="post"] | order(publishedAt desc){
  _id, title, "slug": slug.current, publishedAt, _updatedAt
}
`;

const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(q)}`;

const res = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_EDITORIAL_TOKEN}` } });
const json = await res.json();

console.log(JSON.stringify(json.result, null, 2));