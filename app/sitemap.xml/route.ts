import { createClient, groq } from "next-sanity";

type SitemapPost = {
  slug?: { current?: string | null } | null;
  _updatedAt?: string;
  _createdAt?: string;
  publishedAt?: string;
};

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ecossistema5estrelas.org";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hf3nh9vb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  useCdn: true,
});

async function getPosts(): Promise<SitemapPost[]> {
  const query = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug,
    "_createdAt": _createdAt,
    "_updatedAt": _updatedAt,
    "publishedAt": publishedAt
  } | order(coalesce(_updatedAt, _createdAt, publishedAt) desc)[0...500]`;
  const posts = await client.fetch(query);
  return posts as SitemapPost[];
}

export async function GET() {
  const posts = (await getPosts()).filter((p) => p?.slug?.current);

  const staticRoutes = ["", "blog", "contato", "obrigado"];

  const urls = [
    ...staticRoutes.map(
      (r) =>
        `<url><loc>${baseUrl}/${r}</loc><changefreq>weekly</changefreq><priority>${
          r ? "0.7" : "1.0"
        }</priority></url>`
    ),
    ...posts.map((post) => {
      const slug = post.slug!.current!;
      const lastmod =
        post._updatedAt ??
        post._createdAt ??
        post.publishedAt ??
        new Date().toISOString();
      return `<url>
  <loc>${baseUrl}/blog/${slug}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>`;
    }),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}