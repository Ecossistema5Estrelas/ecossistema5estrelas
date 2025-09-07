"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = { _id: string; slug?: { current: string }; title: string; excerpt?: string; publishedAt?: string };

export default function BlogList() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        if (!res.ok) throw new Error("Falha ao buscar posts");
        const data: Post[] = await res.json();
        if (!cancelled) setPosts(data);
      } catch (e:any) {
        if (!cancelled) setError(e.message || "Erro desconhecido");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (error) return <div style={{ padding: 24 }}><h2>Erro ao carregar</h2><p>{error}</p></div>;
  if (posts === null) return <div style={{ padding: 24 }}>Carregando...</div>;
  if (!posts.length) return <div style={{ padding: 24 }}>Nenhum post disponÃ­vel no momento.</div>;

  return (
    <main style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>ðŸ“š Blog</h1>
      <ul style={{ display: "grid", gap: 16, listStyle: "none", padding: 0 }}>
        {posts.map((p) => (
          <li key={p._id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>
              <Link href={`/blog/${p.slug?.current ?? p._id}`}>{p.title}</Link>
            </h2>
            {p.excerpt && <p style={{ margin: 0, opacity: .8 }}>{p.excerpt}</p>}
            {p.publishedAt && <small style={{ opacity: .6 }}>Publicado em {new Date(p.publishedAt).toLocaleDateString("pt-BR")}</small>}
          </li>
        ))}
      </ul>
    </main>
  );
}