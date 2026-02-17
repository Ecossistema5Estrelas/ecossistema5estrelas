import { Q } from "../../src/lib/sanity/queries";
import { sanityFetch } from "../../src/lib/sanity/fetch";

const slug = process.argv[2] || "pleiades-e-a-coordenacao-de-decisoes-em-ecossistemas-complexos";

const run = async () => {
  const data = await sanityFetch(Q.postBySlug, { slug }, 60);
  console.log("slug:", slug);
  console.log("hasData:", !!data);
  console.log("title:", data?.title);
  console.log("bodyType:", typeof data?.body);
  console.log("bodyIsArray:", Array.isArray(data?.body));
  console.log("bodyLen:", Array.isArray(data?.body) ? data.body.length : null);
};

run().catch((e) => { console.error(e); process.exit(1); });
