import 'dotenv/config';
import {createClient} from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "df3uyd06",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-02-19",
  token: process.env.SANITY_API_TOKEN, // token Editor
  useCdn: false,
});

async function ensure(doc) {
  return client.createIfNotExists(doc);
}

async function run() {
  const author = await ensure({_id:"author-cezar", _type:"author", name:"Cezar Braga"});

  const cat = await ensure({
    _id:"cat-geral", _type:"category", title:"Geral",
    slug:{_type:"slug", current:"geral"}
  });

  const now = new Date().toISOString();

  const posts = [
    {
      _id:"post-bem-vindo",
      _type:"post",
      title:"Bem-vindo ao ECOSSISTEMA 5ESTRELAS",
      slug:{_type:"slug", current:"bem-vindo-ao-ecossistema"},
      excerpt:"Conheça a visão e os pilares do projeto.",
      publishedAt: now,
      author:{_type:"reference", _ref: author._id},
      categories:[{_type:"reference", _ref: cat._id}],
      tags:["boas-vindas"],
      content:[{_type:"block", style:"normal", children:[{_type:"span", text:"Este é o pontapé inicial do nosso ecossistema."}]}],
    },
    {
      _id:"post-seguranca",
      _type:"post",
      title:"Segurança Digital para Iniciantes",
      slug:{_type:"slug", current:"seguranca-digital"},
      excerpt:"Dicas práticas para começar com o pé direito.",
      publishedAt: now,
      author:{_type:"reference", _ref: author._id},
      categories:[{_type:"reference", _ref: cat._id}],
      tags:["seguranca"],
      content:[{_type:"block", style:"normal", children:[{_type:"span", text:"Senhas fortes, 2FA e backup: o básico bem feito."}]}],
    }
  ];

  for (const doc of posts) await ensure(doc);

  console.log("✅ Seed concluído em df3uyd06/production");
}

run().catch((e)=>{ console.error(e); process.exit(1); });

