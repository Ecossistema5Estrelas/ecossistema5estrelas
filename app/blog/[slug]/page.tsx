import all from "../../../data/posts.json";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return (all as any[]).map((p:any) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (all as any[]).find((p:any) => p.slug === slug);
  if (!post) return <div>Post não encontrado.</div>;
  return (
    <article style={{display:"grid",gap:16}}>
      <h1>{post.title}</h1>
      <small style={{opacity:.7}}>{new Date(post.date).toLocaleDateString("pt-BR")}</small>
      <p style={{lineHeight:1.8}}>{post.content}</p>
    </article>
  );
}
