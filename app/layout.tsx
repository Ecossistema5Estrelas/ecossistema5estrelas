import Script from 'next/script';
import Link from 'next/link';

export const metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
  description: 'Ecosistema multimodal com blog pronto para monetização.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="pt-BR">
      <head>
        {adsClient ? (
          <Script
            async
            strategy="afterInteractive"
            src={https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=\}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body style={{ fontFamily:'system-ui, sans-serif', background:'#0b0f1a', color:'#e9ecf1', margin:0 }}>
        <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #1e2433', position:'sticky', top:0, background:'#0b0f1a' }}>
          <Link href="/" style={{ textDecoration:'none', color:'#e9ecf1', fontWeight:700 }}>
            <span style={{ fontSize:18 }}>🌌 ECOSSISTEMA 5ESTRELAS</span>
          </Link>
          <nav style={{ display:'flex', gap:16 }}>
            <Link href="/blog" style={{ color:'#e9ecf1' }}>Blog</Link>
          </nav>
        </header>
        <main style={{ padding:'24px', maxWidth:1000, margin:'0 auto' }}>
          {children}
        </main>
        <footer style={{ padding:'24px', borderTop:'1px solid #1e2433', opacity:.9 }}>
          <small>© {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS — Pronto para monetização.</small>
        </footer>
      </body>
    </html>
  );
}
