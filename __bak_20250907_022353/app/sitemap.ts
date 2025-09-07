import type { MetadataRoute } from "next";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  const paths = [
    "", "apps", "blog", "contato", "loja", "sobre", "termos", "politicas/privacidade",
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
