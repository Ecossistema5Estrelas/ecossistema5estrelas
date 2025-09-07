import type { MetadataRoute } from "next"

export const revalidate = 86400
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org").replace(/\/$/, "")
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

