import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico 5⭐ — sites inteligentes, conteúdo e monetização.",
};

export const viewport: Viewport = { themeColor: "#0f172a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-estrela-grad">
        <header className="border-b border-white/10">
          <div className="container-estrela py-4 flex items-center justify-between">
            <a href="/" className="text-lg sm:text-xl font-semibold tracking-wide">
              ✨ ECOSSISTEMA <span className="text-estrela-gold">5ESTRELAS</span>
            </a>
            <nav className="flex gap-4 text-sm">
              <a className="opacity-90 hover:opacity-100 hover:underline" href="/blog">📚 Blog</a>
              <a className="opacity-90 hover:opacity-100 hover:underline" href="/loja">🛍 Loja</a>
              <a className="opacity-90 hover:opacity-100 hover:underline" href="/sobre">🏛 Sobre</a>
            </nav>
          </div>
        </header>
        <main className="container-estrela py-10">{children}</main>
        <footer className="mt-16 border-t border-white/10">
          <div className="container-estrela py-6 text-sm opacity-80">
            © 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados. • <a className="underline" href="/privacidade">Privacidade</a> • <a className="underline" href="/termos">Termos</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
