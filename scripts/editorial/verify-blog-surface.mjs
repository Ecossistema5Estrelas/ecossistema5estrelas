import fetch from "node-fetch";

const BLOG_URL = "https://ecossistema5estrelas.org/blog";

const res = await fetch(BLOG_URL, { cache: "no-store" });
const html = await res.text();

if (!html.includes("ECOSSISTEMA 5ESTRELAS")) {
  throw new Error("🚨 HTML inesperado no /blog");
}

console.log("✅ /blog responde corretamente");