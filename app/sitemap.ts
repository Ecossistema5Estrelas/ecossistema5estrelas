import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ecossistema5estrelas.org";
  const slugs: { slug: string }[] = await sanityClient.fetch(
    groq`*[_type=="post" && defined(slug.current)][].{"slug": slug.current}`
  );
  const now = new Date().toISOString();

  const staticPaths = [
    "", "sobre", "contato", "loja", "privacidade", "termos", "cookies",
    "comunidade", "copyright", "anuncios", "suporte", "blog"
  ].map(p => ({ url: `${base}/${p}`, lastModified: now }));

  const posts = slugs.map(({ slug }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now
  }));

  return [...staticPaths, ...posts];
}
