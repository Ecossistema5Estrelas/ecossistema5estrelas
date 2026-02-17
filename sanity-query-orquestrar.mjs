import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false,
});

const query = "*[_type=='post' && title match '*ORQUESTRAR*']{_id,title,slug,publishedAt}";

const res = await client.fetch(query);
console.log(JSON.stringify(res, null, 2));
