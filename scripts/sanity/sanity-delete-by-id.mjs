import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_EDITORIAL_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_EDITORIAL_TOKEN) {
  console.error("❌ ENV incompleto");
  process.exit(1);
}

const id = process.argv[2];
if (!id) {
  console.error('❌ Use: node sanity-delete-by-id.mjs "post.seu-id"');
  process.exit(1);
}

const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/mutate/${SANITY_DATASET}`;

const mutation = {
  mutations: [{ delete: { id } }]
};

const res = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${SANITY_EDITORIAL_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(mutation)
});

console.log("delete:", id);
console.log("STATUS:", res.status);
console.log(await res.text());