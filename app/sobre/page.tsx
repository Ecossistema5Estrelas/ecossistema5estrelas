import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-200 via-emerald-500 to-emerald-800 text-neutral-900 p-8">
      <div className="flex gap-1 mb-4 animate-pulse">
        <span className="text-emerald-300 text-2xl animate-ping">⭐</span>
        <span className="text-yellow-300 text-2xl animate-pulse delay-100">⭐</span>
        <span className="text-yellow-200 text-2xl animate-pulse delay-200">⭐</span>
        <span className="text-yellow-300 text-2xl animate-pulse delay-300">⭐</span>
        <span className="text-emerald-300 text-2xl animate-ping delay-500">⭐</span>
      </div>
      <h1 className="text-4xl font-bold mb-2">👤 Sobre</h1>
      <p className="text-lg opacity-90 mb-8">Breve descrição sobre o ECOSSISTEMA 5ESTRELAS.</p>
      <nav className="flex justify-center gap-4 mb-6 text-sm font-medium underline underline-offset-4">
        <Link href="/">🏠 Início</Link>
        <Link href="/blog">📚 Blog</Link>
        <Link href="/loja">🛒 Loja</Link>
        <Link href="/dashboard">📊 Dashboard</Link>
        <Link href="/contato">✉️ Contato</Link>
      </nav>
    </main>
  );
}





