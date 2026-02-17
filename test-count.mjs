import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "df3uyd06",
  dataset: "staging",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const run = async () => {
  console.log("TOTAL:", await c.fetch(`count(*[_type=="post"])`));
  console.log("COM publishedAt:", await c.fetch(`count(*[_type=="post" && defined(publishedAt)])`));
};

run();
