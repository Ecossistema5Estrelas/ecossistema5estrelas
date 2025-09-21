export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;
// Gera as páginas estáticas a partir de app/blog/static-slugs.json
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const mod: any = await import("../static-slugs.json");
    const slugs: string[] = (mod.default ?? mod) as string[];
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// (Opcional) título básico por slug
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `ECOSSISTEMA 5ESTRELAS — ${slug.replace(/-/g, " ")}`,
    openGraph: { images: ["/og.png"] },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

// ✅ Next 15: params como Promise
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-2">Post: {slug}</h1>
      <p className="opacity-80">Conteúdo estático do post “{slug}”.</p>
    </main>
  );
}

