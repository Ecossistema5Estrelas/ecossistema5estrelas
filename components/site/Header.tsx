import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="relative w-full flex flex-col items-center justify-center bg-[url('/logo-header-ecossistema5estrelas.png')] bg-cover bg-center bg-no-repeat shadow-lg"
    >
      {/* Overlay escuro suave para contraste */}
      <div className="absolute inset-0 bg-black/40 mix-blend-overlay" aria-hidden="true"></div>

      {/* Navegação no topo direito */}
      <nav className="absolute top-3 right-8 flex gap-6 font-semibold z-10">
        <Link href="/blog" className="px-4 py-2 rounded-lg text-yellow-300 bg-black/30 backdrop-blur-md border border-yellow-500/30 hover:bg-black/40 hover:border-yellow-500/50 transition">
          Blog
        </Link>
        <Link href="/loja" className="px-4 py-2 rounded-lg text-yellow-300 bg-black/30 backdrop-blur-md border border-yellow-500/30 hover:bg-black/40 hover:border-yellow-500/50 transition">
          Loja
        </Link>
        <Link href="/contato" className="px-4 py-2 rounded-lg text-yellow-300 bg-black/30 backdrop-blur-md border border-yellow-500/30 hover:bg-black/40 hover:border-yellow-500/50 transition">
          Contato
        </Link>
      </nav>

      {/* Logo central visível */}
      <div className="flex flex-col items-center mt-20 z-10">
        <Image
          src="/logo-header-ecossistema5estrelas.png"
          alt="ECOSSISTEMA 5ESTRELAS"
          width={800}
          height={200}
          priority
          className="drop-shadow-2xl"
        />
      </div>
    </header>
  );
}
