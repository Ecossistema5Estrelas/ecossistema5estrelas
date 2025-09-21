import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export const runtime = "nodejs";

export async function POST(req: Request) {
  // (Opcional) validar assinatura do Sanity:
  // const sig = req.headers.get("x-sanity-signature");
  // if (sig !== process.env.SANITY_WEBHOOK_SECRET) return new Response("Unauthorized", { status: 401 });

  const { tag = "posts" } = await req.json().catch(() => ({ tag: "posts" }));
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}



