import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between bg-[#0A1F0A] px-8 py-4 shadow-lg">
      {/* Logomarca grande no cabeçalho */}
      <div className="flex items-center">
        <Image
          src="/logo-header-ecossistema5estrelas.png"
          alt="ECOSSISTEMA 5ESTRELAS"
          width={380}
          height={100}
          priority
        />
      </div>
      {/* Navegação com botões dourados translúcidos */}
      <nav className="flex gap-6 text-yellow-400 font-semibold">
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
    </header>
  );
}
