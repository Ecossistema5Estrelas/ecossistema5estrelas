import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <style>{`
          /* Estrelas animadas em círculo */
          .estrela-circulo {
            position: relative;
            width: 140px;
            height: 140px;
            margin: 0 auto;
            animation: spin 8s linear infinite;
          }
          .estrela-circulo span {
            position: absolute;
            font-size: 26px;
            animation: blink 1.5s infinite alternate;
          }
          .estrela-circulo span:nth-child(1) { top: 0; left: 45%; }
          .estrela-circulo span:nth-child(2) { top: 20%; left: 85%; }
          .estrela-circulo span:nth-child(3) { top: 70%; left: 85%; }
          .estrela-circulo span:nth-child(4) { top: 100%; left: 45%; }
          .estrela-circulo span:nth-child(5) { top: 70%; left: 0; }
          .estrela-circulo span:nth-child(6) { top: 20%; left: 0; }

          /* Estrela central */
          .estrela-central {
            font-size: 38px;
            animation: pulse 2s infinite;
            text-shadow: 0 0 12px #FFD700, 0 0 24px #FFA500;
          }

          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes blink { from { opacity: 1; } to { opacity: 0.3; } }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.7; }
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
          {/* Cabeçalho expandido com logomarca */}
          <header className="sticky top-0 z-20 flex flex-col items-center py-8 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-lg">
            <div className="estrela-circulo">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              <div className="estrela-central">⭐</div>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-wide">ECOSSISTEMA 5ESTRELAS</h1>
            <nav className="mt-4 flex items-center gap-6">
              <a href="/blog" className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 transition">Blog</a>
              <a href="/loja" className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 transition">Loja</a>
              <a href="/contato" className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 transition">Contato</a>
            </nav>
          </header>

          {/* Conteúdo */}
          <main className="container-estrela flex-1 py-10">{children}</main>

          {/* Footer fixo com políticas */}
          <footer className="mt-16 border-t border-black/20 bg-black/70 text-center text-sm py-6">
            <p>© 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</p>
            <p className="mt-2 space-x-3">
              <a href="/privacidade" className="underline hover:text-yellow-300">Privacidade</a>
              <a href="/termos" className="underline hover:text-yellow-300">Termos</a>
              <a href="/politica" className="underline hover:text-yellow-300">Política</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
