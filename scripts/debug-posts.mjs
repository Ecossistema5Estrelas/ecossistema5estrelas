import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "df3uyd06",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "staging",
  apiVersion: "2024-01-01",
  useCdn: false
});

const run = async () => {
  const rows = await client.fetch(`*[_type=="post"]{_id,title,"slug":slug.current}`);
  console.log("TOTAL:", rows.length);
  console.log(rows.slice(0,5));
};

run();
