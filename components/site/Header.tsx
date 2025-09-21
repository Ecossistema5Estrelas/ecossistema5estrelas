import Link from "next/link";
import Star from "@/components/icons/Star";
import Book from "@/components/icons/Book";
import Cart from "@/components/icons/Cart";
import Mail from "@/components/icons/Mail";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/55 border-b border-black/10">
      <nav className="container-estrela flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="inline-block w-6 h-6"><Star /></span>
          <span>ECOSSISTEMA 5ESTRELAS</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <Link href="/blog" className="btn-estrela"><span className="w-5 h-5"><Book/></span> Blog</Link>
          <Link href="/loja" className="btn-estrela"><span className="w-5 h-5"><Cart/></span> Loja</Link>
          <Link href="/contato" className="btn-estrela"><span className="w-5 h-5"><Mail/></span> Contato</Link>
        </div>
      </nav>
    </header>
  );
}
