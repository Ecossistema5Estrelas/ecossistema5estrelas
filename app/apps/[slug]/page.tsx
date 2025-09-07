export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

// Gera as páginas estáticas a partir de app/apps/static-slugs.json
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const mod: any = await import("../static-slugs.json");
    const slugs: string[] = (mod.default ?? mod) as string[];
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ✅ Next 15: params como Promise
export default async function AppPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">App: {slug}</h1>
    </main>
  );
}
