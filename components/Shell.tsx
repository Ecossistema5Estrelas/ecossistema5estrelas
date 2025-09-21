import Link from "next/link";
import Icon from "./Icon";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0b3d2a,#166534)] text-emerald-50">
      <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-emerald-900/40">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="font-bold tracking-wide inline-flex items-center gap-2">
            <Icon name="star" /><span>ECOSSISTEMA 5ESTRELAS</span>
          </Link>
          <div className="ml-auto flex items-center gap-4 text-emerald-100">
            <Link href="/" className="hover:opacity-90 inline-flex items-center gap-1"><Icon name="home" /> <span>Início</span></Link>
            <Link href="/blog" className="hover:opacity-90 inline-flex items-center gap-1"><Icon name="blog" /> <span>Blog</span></Link>
            <Link href="/loja" className="hover:opacity-90 inline-flex items-center gap-1"><Icon name="store" /> <span>Loja</span></Link>
            <Link href="/dashboard" className="hover:opacity-90 inline-flex items-center gap-1"><Icon name="dash" /> <span>Dashboard</span></Link>
            <Link href="/contato" className="hover:opacity-90 inline-flex items-center gap-1"><Icon name="contact" /> <span>Contato</span></Link>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="mt-12 border-t border-emerald-900/40 bg-black/10">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-emerald-200 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex items-center gap-2">
            <Icon name="star" /><span>© {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacidade" className="underline underline-offset-4 hover:opacity-90">Privacidade</Link>
            <Link href="/termos" className="underline underline-offset-4 hover:opacity-90">Termos</Link>
            <Link href="/politica" className="underline underline-offset-4 hover:opacity-90">Política</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
