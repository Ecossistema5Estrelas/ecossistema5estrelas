import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

function getSlug(body: SanityWebhookBody): string | null {
  if (!body) return null;
  if (typeof body.slug === "string") return body.slug;
  if (body.slug?.current) return body.slug.current;
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-secret");
    if (!secret || secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
    }

    const body = (await req.json()) as SanityWebhookBody;
    const slug = getSlug(body);

    // Tag global (para queries que usam tags)
    revalidateTag("sanity");

    // Post específico
    if (body._type === "post" && slug) {
      revalidateTag(`post:${slug}`);
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({
      ok: true,
      revalidated: true,
      type: body._type ?? null,
      slug: slug ?? null,
      ts: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[NEXT-01] revalidate error:", err);
    return NextResponse.json({ ok: false, error: "Revalidate failed" }, { status: 500 });
  }
}
