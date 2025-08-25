import Link from 'next/link';

export default function Home() {
  return (
    <section style={{ display:'grid', gap:16 }}>
      <h1 style={{ fontSize:36, margin:0 }}>ECOSSISTEMA 5ESTRELAS 🚀✨</h1>
      <p style={{ opacity:.9, lineHeight:1.6 }}>
        Universo intergaláctico de apps, mídia e cultura. O blog já está ligado e pronto pra monetizar.
      </p>
      <div style={{ display:'flex', gap:12 }}>
        <Link href="/blog" style={{ background:'#6ee7b7', color:'#06221a', padding:'10px 16px', borderRadius:10, fontWeight:700, textDecoration:'none' }}>
          🌟 Abrir Blog
        </Link>
        <a href="mailto:contato@ecossistema5estrelas.org" style={{ border:'1px solid #2a344a', padding:'10px 16px', borderRadius:10, color:'#e9ecf1', textDecoration:'none' }}>
          📬 Fale com a gente
        </a>
      </div>
    </section>
  );
}
