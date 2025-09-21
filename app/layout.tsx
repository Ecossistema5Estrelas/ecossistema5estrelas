import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "ECOSSISTEMA 5ESTRELAS",
    description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
    images: ["/logo-5estrelas.png", "/brain-fractal.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECOSSISTEMA 5ESTRELAS",
    description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
    images: ["/logo-5estrelas.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .estrela-piscando {
            animation: blink 1.5s infinite alternate;
          }
          @keyframes blink {
            from { opacity: 1; }
            to { opacity: 0.3; }
          }
        `}</style>
      </head>
      <body>
        <div
          className="relative min-h-screen text-white"
          style={{
            backgroundImage: "url('/brain-fractal.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Cabeçalho com logo + estrelas piscando */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 backdrop-blur border-b border-black/20">
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <span className="estrela-piscando">⭐</span>
              <span>ECOSSISTEMA 5ESTRELAS</span>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/blog" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Blog</a>
              <a href="/loja" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Loja</a>
              <a href="/contato" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Contato</a>
            </nav>
          </header>

          {/* Conteúdo */}
          <main className="container-estrela flex-1 py-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
