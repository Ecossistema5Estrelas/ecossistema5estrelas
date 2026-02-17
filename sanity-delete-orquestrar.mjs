import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITORIAL_TOKEN,
  useCdn: false,
});

const id = "P0ARo92oMMSuIIwmmYtwvr";

const res = await client.delete(id);
console.log("DELETED:", res);
