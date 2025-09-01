import { NextResponse } from "next/server";

const MOCK = [
  { slug: "post-exemplo-1", title: "Primeiro Post", publishedAt: "2025-07-01T10:00:00Z", html: "<p>Conteúdo de exemplo do primeiro post.</p>" },
  { slug: "guia-rapido", title: "Guia Rápido do Ecossistema", publishedAt: "2025-07-15T12:00:00Z", html: "<p>Dicas iniciais para começar.</p>" }
];

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if(slug){
    const post = MOCK.find(p => p.slug === slug) || null;
    return NextResponse.json(post);
  }
  return NextResponse.json(MOCK);
}
