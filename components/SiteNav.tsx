import Link from "next/link";

export default function SiteNav(){
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-blue-700 flex items-center gap-2">
          <span aria-hidden="true">⭐⭐⭐⭐⭐</span> <span>ECOSSISTEMA 5ESTRELAS</span>
        </Link>
        <ul className="flex items-center gap-2 sm:gap-3">
          <li><Link href="/loja"  className="px-3 py-1.5 rounded-full hover:bg-black/5">🛍 Loja</Link></li>
          <li><Link href="/blog"  className="px-3 py-1.5 rounded-full bg-blue-600 text-white hover:brightness-110">📚 Blog</Link></li>
          <li><Link href="/sobre" className="px-3 py-1.5 rounded-full hover:bg-black/5">🏁 Sobre</Link></li>
          <li><Link href="/contato" className="px-3 py-1.5 rounded-full hover:bg-black/5">✉️ Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
}



