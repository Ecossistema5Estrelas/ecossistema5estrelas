import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok:false, error:"Invalid secret" }, { status: 401 });
  }

  // Aceita { slug, paths } no corpo. Revalida sempre /blog.
  const body = await req.json().catch(() => ({} as any));
  const set = new Set<string>(["/blog"]);
  if (body?.slug && typeof body.slug === "string") set.add(`/blog/${body.slug}`);
  if (Array.isArray(body?.paths)) {
    for (const p of body.paths) if (typeof p === "string" && p.startsWith("/")) set.add(p);
  }

  for (const p of set) revalidatePath(p);

  return NextResponse.json({ ok:true, revalidated: Array.from(set) });
}
