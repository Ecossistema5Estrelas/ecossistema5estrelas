import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-lg">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-header-ecossistema5estrelas.png"
          alt="ECOSSISTEMA 5ESTRELAS"
          width={48}
          height={48}
        />
        <span className="font-bold text-xl text-white">ECOSSISTEMA 5ESTRELAS</span>
      </div>
      <nav className="flex gap-6 font-semibold">
        <Link href="/blog" className="hover:text-yellow-200 text-white transition">Blog</Link>
        <Link href="/loja" className="hover:text-yellow-200 text-white transition">Loja</Link>
        <Link href="/contato" className="hover:text-yellow-200 text-white transition">Contato</Link>
      </nav>
    </header>
  );
}

