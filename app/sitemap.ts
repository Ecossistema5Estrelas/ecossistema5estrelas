import type { MetadataRoute } from "next";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org";
  const now = new Date();
  const paths = [
    "", "blog", "sobre", "contato",
    "politicas", "politicas/privacidade", "politicas/termos",
    "obrigado", "apps"
  ];
  return paths.map((p) => {
    const url = p ? `${BASE.replace(/\/$/,"")}/${p}` : BASE.replace(/\/$/,"") + "/";
    return {
      url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: p === "" ? 1 : 0.7,
    };
  });
}

