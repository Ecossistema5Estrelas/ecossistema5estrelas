import Link from 'next/link'

export const metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
  description: 'Inovação, inclusão e prosperidade digital em um só lugar.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen py-14 text-white">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">🌟 ECOSSISTEMA 5ESTRELAS</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Acesso inteligente aos aplicativos que transformam a sociedade.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto px-4">
        <Link
          href="/blog"
          className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 text-center"
        >
          <div className="text-4xl mb-2">📚</div>
          <h2 className="text-xl font-semibold">Blog Oficial</h2>
          <p className="text-gray-400 text-sm mt-1">
            Bastidores da inovação e novas ideias.
          </p>
        </Link>

        <Link
          href="/contato"
          className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 text-center"
        >
          <div className="text-4xl mb-2">📬</div>
          <h2 className="text-xl font-semibold">Contato</h2>
          <p className="text-gray-400 text-sm mt-1">
            Fale conosco e envie sua proposta.
          </p>
        </Link>

        <Link
          href="/sobre"
          className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 text-center"
        >
          <div className="text-4xl mb-2">ℹ️</div>
          <h2 className="text-xl font-semibold">Sobre</h2>
          <p className="text-gray-400 text-sm mt-1">
            Conheça a visão e missão do projeto.
          </p>
        </Link>

        <Link
          href="/dashboard"
          className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 text-center"
        >
          <div className="text-4xl mb-2">👤</div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">
            Acompanhe seu progresso e recompensas.
          </p>
        </Link>
      </section>
    </main>
  )
}