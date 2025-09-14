import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-700 text-white p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 drop-shadow-lg text-center">
        🌟 ECOSSISTEMA 5ESTRELAS 🌟
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/blog"
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-5 rounded-2xl shadow-lg text-xl font-semibold transition transform hover:scale-105 text-center"
        >
          📚 Blog
        </Link>
        <Link
          href="/loja"
          className="bg-green-400 hover:bg-green-300 text-black px-8 py-5 rounded-2xl shadow-lg text-xl font-semibold transition transform hover:scale-105 text-center"
        >
          🛍 Loja
        </Link>
        <Link
          href="/sobre"
          className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-5 rounded-2xl shadow-lg text-xl font-semibold transition transform hover:scale-105 text-center"
        >
          🚀 Sobre
        </Link>
      </div>

      <p className="mt-10 text-center opacity-80 max-w-xl">
        Plataforma viva de inovação, cultura e tecnologia. Todos os aplicativos,
        tokens e sistemas de reputação se integram aqui, no coração do 🌐 ECOSSISTEMA 5ESTRELAS.
      </p>
    </main>
  );
}
