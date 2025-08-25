import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.vercel.app"

  const staticRoutes = ["", "/sobre", "/blog", "/contato"].map((p) => ({
    url: `${host}${p || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }))

  return staticRoutes
}
