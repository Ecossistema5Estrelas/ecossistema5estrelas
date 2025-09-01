export const dynamic = "force-static";

type Post = { slug: string; title: string; excerpt: string };

const mock: Post[] = [
  { slug: "bem-vindo-ao-ecossistema", title: "Bem-vindo ao ECOSSISTEMA 5ESTRELAS", excerpt: "Visão geral e próximos passos." },
  { slug: "como-monetizar-com-ads", title: "Como monetizar com Ads", excerpt: "Estratégias de monetização no portal." },
  { slug: "seguranca-digital", title: "Segurança Digital", excerpt: "Boas práticas para o seu ambiente." },
];

export default function BlogPage() {
  const posts = mock; // trocamos por Sanity depois
  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">📰 Blog Oficial</h1>
        <p className="mt-2 opacity-90">Atualizações, guias e comunicados do ecossistema.</p>
      </header>
      <ul className="grid gap-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
            <a href={`/blog/${p.slug}`} className="block">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="opacity-90 mt-1 text-sm">{p.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
