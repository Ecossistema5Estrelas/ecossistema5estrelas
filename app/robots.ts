import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api",
          "/_next",
          "/dashboard",
          "/dashboard/*",
        ],
      },
    ],
    sitemap: "https://ecossistema5estrelas.org/sitemap.xml",
    host: "https://ecossistema5estrelas.org",
  };
}
