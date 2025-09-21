import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="relative w-full flex flex-col items-center justify-center px-6 py-6 shadow-lg"
      style={{
        backgroundImage: "url('/logo-header-ecossistema5estrelas.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navegação no topo direito */}
      <nav className="absolute top-3 right-8 flex gap-6 text-yellow-400 font-semibold">
        <Link href="/blog" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 transition">
          Blog
        </Link>
        <Link href="/loja" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 transition">
          Loja
        </Link>
        <Link href="/contato" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 transition">
          Contato
        </Link>
      </nav>

      {/* Logo central visível */}
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/logo-header-ecossistema5estrelas.png"
          alt="ECOSSISTEMA 5ESTRELAS"
          width={600}
          height={160}
          priority
          className="drop-shadow-2xl"
        />
      </div>
    </header>
  );
}
