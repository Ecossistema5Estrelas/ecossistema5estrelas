import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Identidade / Retorno ao início */}
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition"
        >
          ECOSSISTEMA 5ESTRELAS
        </Link>

        {/* Navegação institucional */}
        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/blog" className="hover:text-white transition">
            Blog
          </Link>

          <Link href="/sobre" className="hover:text-white transition">
            Sobre
          </Link>

          <Link href="/contato" className="hover:text-white transition">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  )
}