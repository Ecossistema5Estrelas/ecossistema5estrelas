export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;
export async function generateStaticParams() {
  return [
    { slug: 'exemplo' },
    { slug: 'app-x' },
    { slug: 'app-y' }
  ];
}

type PageProps = { params: { slug: string } };

export default function AppDetalhePage({ params }: PageProps) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">App: {params.slug}</h1>
      <p>Página estática gerada via generateStaticParams.</p>
    </main>
  );
}
