import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full flex flex-col items-center justify-center min-h-[320px] bg-[url('/logo-header-ecossistema5estrelas.png')] bg-cover bg-center bg-no-repeat shadow-lg">
      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>

      {/* Navegação com botões translúcidos */}
      <nav className="absolute top-3 right-8 flex gap-6 z-10">
        <Link href="/blog" className="btn-glass">Blog</Link>
        <Link href="/loja" className="btn-glass">Loja</Link>
        <Link href="/contato" className="btn-glass">Contato</Link>
      </nav>

      {/* Logo central em destaque */}
      <div className="flex flex-col items-center mt-20 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg text-center">
          ECOSSISTEMA 5ESTRELAS
        </h1>
      </div>
    </header>
  );
}
