// app/sitemap.xml/route.ts
export async function GET() {
  const baseUrl = 'https://www.ecossistema5estrelas.org'
  const routes = ['', 'sobre', 'contato', 'blog'].map(
    (path) => `<url><loc>${baseUrl}/${path}</loc></url>`
  )

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${routes.join('')}
     </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  )
}
