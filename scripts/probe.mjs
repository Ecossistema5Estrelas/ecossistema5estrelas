import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn:false
});

const q = '*[_type=="post"][0..2]{_id,title,"slug":slug.current,publishedAt}';

const run = async()=>{
  const r = await client.fetch(q);
  console.log("RESULT=",r);
};

run();
