import Link from "next/link";

export default function SeriesPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Séries</h1>
      <p>V1: visão encadeada. Ainda não há séries declaradas no Sanity (não inventamos).</p>
      <p><Link href="/blog">← Voltar ao Blog</Link></p>
    </main>
  );
}


