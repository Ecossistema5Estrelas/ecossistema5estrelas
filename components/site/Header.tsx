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
      <nav className="absolute top-3 right-8 flex gap-6 font-semibold">
        <Link href="/blog" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 transition">
          Blog
        </Link>
        <Link href="/loja" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 transition">
          Loja
        </Link>
        <Link href="/contato" className="px-4 py-2 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 transition">
          Contato
        </Link>
      </nav>
    </header>
  );
}
