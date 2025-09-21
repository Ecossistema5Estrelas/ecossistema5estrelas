import { NextResponse } from "next/server";

type Post = {
  _id: string;
  slug?: { current: string };
  title: string;
  excerpt?: string;
  publishedAt?: string;
};

export async function GET() {
  const posts: Post[] = [
    { _id: "1", slug: { current: "bem-vindo" }, title: "Bem-vindo ao blog", excerpt: "Primeiro post de teste.", publishedAt: new Date().toISOString() },
    { _id: "2", slug: { current: "segundo-post" }, title: "Segundo post", excerpt: "Outro exemplo de item.", publishedAt: new Date(Date.now()-86400000).toISOString() }
  ];
  return NextResponse.json(posts);
}


