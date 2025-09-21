import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
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
        <style>{`
          .estrela-piscando {
            animation: blink 1.5s infinite alternate;
          }
          @keyframes blink {
            from { opacity: 1; }
            to { opacity: 0.4; }
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
          {/* Cabeçalho fixo com degradê dourado */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 backdrop-blur border-b border-yellow-700/30">
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <span className="estrela-piscando">⭐</span>
              <span>ECOSSISTEMA 5ESTRELAS</span>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/blog" className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition">Blog</a>
              <a href="/loja" className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition">Loja</a>
              <a href="/contato" className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition">Contato</a>
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
