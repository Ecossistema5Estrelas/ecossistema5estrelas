import "./globals.css";
import { isEnabled } from "../lib/flags";

export const metadata = { title: "ECOSSISTEMA 5ESTRELAS", description: "Portal oficial" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const useDark = await isEnabled("darkmode");
  return (
    <html lang="pt-BR" className={useDark ? "dark" : ""}>
      <body className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 text-[18px] md:text-[19px]">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-amber-400 focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Pular para o conteúdo
        </a>
        <header className="border-b dark:border-zinc-800">
          <div className="container flex items-center justify-between">
            <strong className="text-xl md:text-2xl">✨ ECOSSISTEMA 5ESTRELAS</strong>
            <nav className="flex gap-3 md:gap-5 text-base">
              <a className="hover:underline" href="/">Home</a>
              <a className="hover:underline" href="/blog">Blog</a>
              <a className="hover:underline" href="/loja">Loja</a>
              <a className="hover:underline" href="/sobre">Sobre</a>
            </nav>
          </div>
        </header>
        <div id="conteudo">{children}</div>
        <footer className="border-t dark:border-zinc-800">
          <div className="container py-6 text-sm md:text-base opacity-80">
            © 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados. • <a className="underline" href="/privacidade">Privacidade</a> • <a className="underline" href="/termos">Termos</a>
          </div>
        </footer>
      </body>
    </html>
  );
}

