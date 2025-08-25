import AdUnit from '../../../components/AdUnit';
import all from '../../../data/posts.json';

export async function generateStaticParams() {
  return (all as any[]).map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (all as any[]).find(p => p.slug === slug);
  if (!post) return <div>Post não encontrado.</div>;

  return (
    <article style={{ display:'grid', gap:16 }}>
      <h1 style={{ fontSize:30, margin:0 }}>{post.title}</h1>
      <small style={{ opacity:.7 }}>{new Date(post.date).toLocaleDateString('pt-BR')}</small>

      <AdUnit slot="1234567890" />

      <p style={{ lineHeight:1.8, opacity:.95 }}>{post.content}</p>

      <AdUnit slot="1234567890" />
    </article>
  );
}
