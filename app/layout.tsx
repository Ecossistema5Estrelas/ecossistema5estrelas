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
          .estrela-circulo {
            position: relative;
            width: 120px;
            height: 120px;
            margin: 0 auto;
            animation: spin 6s linear infinite;
          }
          .estrela-circulo span {
            position: absolute;
            font-size: 24px;
            animation: blink 1.5s infinite alternate;
          }
          .estrela-circulo span:nth-child(1) { top: 0; left: 45%; }
          .estrela-circulo span:nth-child(2) { top: 20%; left: 85%; }
          .estrela-circulo span:nth-child(3) { top: 70%; left: 85%; }
          .estrela-circulo span:nth-child(4) { top: 100%; left: 45%; }
          .estrela-circulo span:nth-child(5) { top: 70%; left: 0; }
          .estrela-circulo span:nth-child(6) { top: 20%; left: 0; }

          .estrela-central {
            font-size: 36px;
            animation: pulse 2s infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes blink {
            from { opacity: 1; }
            to { opacity: 0.3; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.6; }
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
          {/* Cabeçalho com fundo verde carbono zero */}
          <header className="sticky top-0 z-20 flex flex-col items-center py-6 bg-[#003300] shadow-lg">
            {/* Estrelas animadas */}
            <div className="estrela-circulo">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              <div className="estrela-central">⭐</div>
            </div>

            {/* Logomarca centralizada */}
            <img
              src="/logo-5estrelas.png"
              alt="Logomarca ECOSSISTEMA 5ESTRELAS"
              className="mt-4 h-20 md:h-28 object-contain"
            />

            {/* Navegação */}
            <nav className="mt-4 flex items-center gap-6">
              <a href="/blog" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Blog</a>
              <a href="/loja" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Loja</a>
              <a href="/contato" className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur hover:bg-black/40 transition">Contato</a>
            </nav>
          </header>

          {/* Conteúdo */}
          <main className="container-estrela flex-1 py-10">{children}</main>

          {/* Footer fixo com políticas */}
          <footer className="mt-16 border-t border-black/20 bg-black/60 text-center text-sm py-6">
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
