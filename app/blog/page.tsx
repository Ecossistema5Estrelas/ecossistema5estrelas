import Link from 'next/link';
import posts from '../../data/posts.json';
import AdUnit from '../../components/AdUnit';

export const metadata = {
  title: 'Blog — ECOSSISTEMA 5ESTRELAS',
  description: 'Conteúdo pronto para SEO e monetização.'
};

export default function BlogIndex() {
  return (
    <section style={{ display:'grid', gap:24 }}>
      <h1 style={{ fontSize:30, margin:0 }}>Blog</h1>
      <p style={{ opacity:.9 }}>Guias, novidades e estudos de caso.</p>

      <AdUnit slot="1234567890" />

      <div style={{ display:'grid', gap:16 }}>
        {posts.map((post:any) => (
          <article key={post.slug} style={{ border:'1px solid #1e2433', borderRadius:12, padding:16 }}>
            <h2 style={{ marginTop:0, marginBottom:8 }}>
              <Link href={/blog/\} style={{ color:'#a5b4fc', textDecoration:'none' }}>
                {post.title}
              </Link>
            </h2>
            <small style={{ opacity:.7 }}>{new Date(post.date).toLocaleDateString('pt-BR')}</small>
            <p style={{ marginTop:8, opacity:.9 }}>{post.excerpt}</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {post.tags?.map((t:string) => (
                <span key={t} style={{ fontSize:12, border:'1px solid #2a344a', borderRadius:999, padding:'4px 8px', opacity:.8 }}>#{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <AdUnit slot="1234567890" />
    </section>
  );
}
