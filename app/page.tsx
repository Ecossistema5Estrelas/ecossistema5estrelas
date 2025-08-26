import posts from "../data/posts.json";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <main style={{display:"grid",gap:16}}>
      <h1>🌌 ECOSSISTEMA 5ESTRELAS</h1>
      <p>Bem-vindo! Últimos posts:</p>
      <ul style={{display:"grid",gap:8,listStyle:"none",padding:0}}>
        {posts.slice(0,3).map((p:any)=>(
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
