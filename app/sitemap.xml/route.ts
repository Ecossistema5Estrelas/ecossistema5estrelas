import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://ecossistema5estrelas.org'

  const staticRoutes = [
    '',
    '/blog',
    '/sobre',
    '/contato',
    '/dashboard',
    '/obrigado',
  ]

  let posts: any[] = []

  // 🔒 Sanity só é carregado em runtime seguro
  try {
    const { getPosts } = await import('@/sanity/lib/queries')
    posts = await getPosts()
  } catch (err) {
    console.warn('[sitemap] Sanity indisponível no build, gerando sitemap parcial')
  }

  const staticUrls = staticRoutes
    .map(
      (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>`
    )
    .join('')

  const dynamicUrls = posts
    .map(
      (post) => `
      <url>
        <loc>${baseUrl}/blog/${post.slug.current}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${dynamicUrls}
  </urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}