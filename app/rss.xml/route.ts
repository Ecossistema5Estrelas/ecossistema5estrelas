import { NextResponse } from "next/server";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org";

// TODO: troque por sua fonte real de posts (CMS/API interna)
async function getPosts() {
  // se você já tem /api/posts, use fetch(`${SITE}/api/posts`, { cache: "no-store" })
  // mock mínimo para não quebrar:
  return [
    { title: "Bem-vindo ao ECOSSISTEMA 5?", slug: "bem-vindo-ao-ecossistema", updatedAt: new Date().toISOString() }
  ];
}

export async function GET() {
  const items = await getPosts();
  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>ECOSSISTEMA 5ESTRELAS</title>
  <link>${SITE}</link>
  <description>Novidades do ECOSSISTEMA 5ESTRELAS</description>
  <language>pt-BR</language>
  ${items.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.updatedAt || Date.now()).toUTCString()}</pubDate>
    </item>`).join("")}
</channel>
</rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" }});
}




