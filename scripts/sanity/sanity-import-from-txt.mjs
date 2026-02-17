import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_EDITORIAL_TOKEN
} = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_EDITORIAL_TOKEN) {
  console.error("❌ ENV incompleto");
  process.exit(1);
}

const slug = "hydra-governanca-seguranca-integridade";
const id = "post.hydra-governanca-seguranca-integridade";
const publishedAt = "2025-12-29T02:00:00Z"; // UTC explícito

const text = fs.readFileSync(
  "hydra-governanca-seguranca-integridade.txt",
  "utf8"
);

const body = text
  .split("\n\n")
  .map((block) => ({
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: block.trim() }]
  }))
  .filter((b) => b.children[0].text.length > 0);

const doc = {
  _id: id,
  _type: "post",
  title: "HYDRA — Governança, Segurança e Integridade",
  slug: { _type: "slug", current: slug },
  publishedAt,
  body
};

const mutation = {
  mutations: [{ createOrReplace: doc }]
};

const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/mutate/${SANITY_DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${SANITY_EDITORIAL_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(mutation)
});

console.log("STATUS:", res.status);
console.log(await res.text());