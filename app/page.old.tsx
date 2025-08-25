import Link from 'next/link'

export default function HomePageOld() {
  return (
    <main className="min-h-screen px-6 py-16 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="text-center space-y-5 max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight">🌠 ECOSSISTEMA 5ESTRELAS</h1>
        <p className="text-gray-400 text-lg">
          Onde tecnologia, inclusão e propósito se encontram.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800 transition text-center"
        >
          <div className="text-3xl mb-1">📚</div>
          <h2 className="text-lg font-semibold">Blog Oficial</h2>
          <p className="text-sm text-gray-400">Novidades, bastidores e conhecimento.</p>
        </Link>

        <Link
          href="/contato"
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800 transition text-center"
        >
          <div className="text-3xl mb-1">📬</div>
          <h2 className="text-lg font-semibold">Contato</h2>
          <p className="text-sm text-gray-400">Fale com nossa equipe.</p>
        </Link>

        <Link
          href="/sobre"
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800 transition text-center"
        >
          <div className="text-3xl mb-1">ℹ️</div>
          <h2 className="text-lg font-semibold">Sobre</h2>
          <p className="text-sm text-gray-400">Missão, visão e propósito institucional.</p>
        </Link>

        <Link
          href="/dashboard"
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800 transition text-center"
        >
          <div className="text-3xl mb-1">👤</div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-400">Veja seu progresso e recompensas.</p>
        </Link>
      </section>
    </main>
  )
}


