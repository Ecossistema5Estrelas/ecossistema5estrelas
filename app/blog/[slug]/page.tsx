import Hero from "@/components/hero";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params) {
  return {
    title: `Post — ${params.slug}`,
    description: "Leitura no ecossistema5estrelas",
    openGraph: { title: `Post — ${params.slug}` },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PostPage({ params }: Params) {
  const url = `/api/posts?slug=${params.slug}`;
  let post: any = null;
  try { post = await fetch(url, { cache: "no-store" }).then((r) => r.json()); } catch {}
  if (!post) {
    return (
      <div>
        <Hero title="Post não encontrado" subtitle="Tente voltar ao Blog" />
      </div>
    );
  }
  return (
    <article>
      <Hero title={post.title} subtitle={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("pt-BR") : ""} />
      <div className="prose prose-slate max-w-none mt-4" dangerouslySetInnerHTML={{ __html: post.html || "<p>Conteúdo indisponível.</p>" }} />
    </article>
  );
}
