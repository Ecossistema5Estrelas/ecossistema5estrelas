import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_EDITORIAL_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_EDITORIAL_TOKEN) {
  console.error("❌ ENV incompleto");
  process.exit(1);
}

// ─────────────────────────────────────────────
// CONTRATO CANÔNICO
// ─────────────────────────────────────────────
const id = "post.pleiades-orquestracao";
const slug = "pleiades-orquestracao";
const publishedAt = new Date(Date.now() - 10 * 60 * 1000).toISOString();

// ─────────────────────────────────────────────
// DOCUMENTO FINAL (INLINE, IMUTÁVEL)
// ─────────────────────────────────────────────
const doc = {
  _id: id,
  _type: "post",
  title: "PLEIADES — ORQUESTRAÇÃO",
  slug: { _type: "slug", current: slug },
  excerpt:
    "Pleiades é a camada de orquestração que garante coerência, governança e sustentabilidade no ECOSSISTEMA 5ESTRELAS.",
  seo: {
    metaTitle: "PLEIADES — Orquestração Consciente no ECOSSISTEMA 5ESTRELAS",
    metaDescription:
      "Entenda como o Pleiades atua como o cérebro de orquestração do ECOSSISTEMA 5ESTRELAS, garantindo governança, eficiência e sustentabilidade."
  },
  publishedAt,
  body: [
    {
      _type: "block",
      style: "h1",
      children: [
        {
          _type: "span",
          text: "PLEIADES: O CÉREBRO DE ORQUESTRAÇÃO DO ECOSSISTEMA 5ESTRELAS"
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "1. Introdução" }]
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text:
            "Em sistemas digitais de pequena escala, a coordenação entre componentes tende a emergir de forma quase espontânea. Contudo, à medida que plataformas evoluem para ecossistemas complexos — compostos por múltiplas aplicações, agentes autônomos, inteligências artificiais especializadas e fluxos econômicos interdependentes — a ausência de um mecanismo explícito de orquestração torna-se um vetor crítico de falha."
        }
      ]
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text:
            "É nesse contexto que surge o Pleiades, concebido como o cérebro de orquestração do ECOSSISTEMA 5ESTRELAS. Sua função não é exercer comando centralizador, mas garantir coerência sistêmica, governança decisória e sustentabilidade operacional em longo prazo."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "2. Fundamentação Conceitual: Por que a Orquestração é Necessária"
        }
      ]
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text:
            "A expansão não orquestrada de sistemas digitais costuma produzir crescimento aparente, acompanhado de degradação estrutural silenciosa."
        }
      ]
    },
    {
      _type: "block",
      listItem: "bullet",
      children: [{ _type: "span", text: "duplicação de funcionalidades;" }]
    },
    {
      _type: "block",
      listItem: "bullet",
      children: [
        { _type: "span", text: "decisões técnicas desconectadas da estratégia global;" }
      ]
    },
    {
      _type: "block",
      listItem: "bullet",
      children: [
        { _type: "span", text: "custos operacionais crescentes sem retorno proporcional;" }
      ]
    },
    {
      _type: "block",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text:
            "conflitos entre automações, agentes e inteligências artificiais;"
        }
      ]
    },
    {
      _type: "block",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "perda de rastreabilidade decisória e responsabilidade ética."
        }
      ]
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text:
            "O Pleiades existe precisamente para evitar esse padrão degenerativo, avaliando cada decisão à luz do impacto sistêmico."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        { _type: "span", text: "8. Conclusão" }
      ]
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text:
            "O Pleiades é o princípio organizador que permite crescer menos, crescer melhor e crescer de forma duradoura."
        }
      ]
    }
  ]
};

// ─────────────────────────────────────────────
// UPSERT CANÔNICO (CREATE + PATCH)
// ─────────────────────────────────────────────
const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/mutate/${SANITY_DATASET}`;

const mutation = {
  mutations: [
    { createIfNotExists: doc },
    {
      patch: {
        id,
        set: {
          publishedAt,
          "slug.current": slug
        }
      }
    }
  ]
};

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