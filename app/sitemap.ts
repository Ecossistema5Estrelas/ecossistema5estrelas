import { client } from '@/sanity/lib/clients'

export default async function sitemap() {
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updated": _updatedAt
    }
  `)

  const base = 'https://ecossistema5estrelas.org'

  const routes = [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ]

  const blogRoutes = posts.map((p: any) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated),
  }))

  return [...routes, ...blogRoutes]
}