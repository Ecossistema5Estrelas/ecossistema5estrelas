import Link from "next/link";

export default function TrilhasPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Trilhas</h1>
      <p>V1: progressão pedagógica. Trilhas serão definidas por contrato (não por data).</p>
      <p><Link href="/blog">← Voltar ao Hub</Link></p>
    </main>
  );
}


