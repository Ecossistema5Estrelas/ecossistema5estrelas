import posts from "../../data/posts.json";

export const dynamic = "force-static";
export const revalidate = false;

export default function BlogIndex() {
  return (
    <main style={{display:"grid",gap:16}}>
      <h1>Blog</h1>
      <ul style={{display:"grid",gap:8,listStyle:"none",padding:0}}>
        {posts.map((p:any)=>(
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
