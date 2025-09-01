import { NextResponse } from "next/server";
const REGISTRY = [
  { slug:"loja", name:"Loja", category:"Comércio", description:"Produtos e pagamentos", url:"/loja" },
  { slug:"blog", name:"Blog", category:"Conteúdo", description:"Artigos e atualizações", url:"/blog" }
];
export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if(slug){ return NextResponse.json(REGISTRY.find(a=>a.slug===slug) || null); }
  return NextResponse.json(REGISTRY);
}
