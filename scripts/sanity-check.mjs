import { config as dotenv } from "dotenv";
dotenv({ path: ".env.local" });

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const token      = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) {
  console.error("projectId inválido (só a-z, 0-9 e hífen). Valor atual:", JSON.stringify(projectId));
  process.exit(1);
}
if (!dataset) {
  console.error("dataset ausente.");
  process.exit(1);
}
if (!token) {
  console.error("TOKEN ausente.");
  process.exit(1);
}

const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=1`;

fetch(url, { headers: { Authorization: `Bearer ${token}` }})
  .then(async (r) => {
    const text = await r.text();
    console.log("HTTP", r.status, r.statusText);
    console.log(text);
    if (r.status !== 200) process.exit(2);
  })
  .catch((e) => { console.error(e); process.exit(3); });