import Link from "next/link";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0b3d2a,#166534)] text-emerald-50">
      <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-emerald-900/40">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="font-bold tracking-wide inline-flex items-center gap-2">
            🌟 ECOSSISTEMA 5ESTRELAS
          </Link>
          <Link href="/blog" className="hover:text-emerald-300">Blog</Link>
          <Link href="/loja" className="hover:text-emerald-300">Loja</Link>
          <Link href="/contato" className="hover:text-emerald-300">Contato</Link>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      <footer className="mt-16 py-6 text-center text-sm opacity-75">
        © {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS. Todos os direitos reservados.
      </footer>
    </div>
  );
}
