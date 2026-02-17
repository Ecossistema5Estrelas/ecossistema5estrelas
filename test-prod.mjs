import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const run = async () => {
  console.log(await c.fetch(`count(*[_type=="post"])`));
};

run();
