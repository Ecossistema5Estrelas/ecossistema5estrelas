import { Suspense } from 'react'
import BlogList from './BlogList'

export const metadata = {
  title: 'Blog | ECOSSISTEMA 5ESTRELAS',
  description: 'Conheça as novidades e bastidores do ECOSSISTEMA 5ESTRELAS.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <div className="text-5xl mb-2">📚</div>
          <h1 className="text-3xl font-bold">BLOG OFICIAL</h1>
          <p className="text-gray-400 text-sm mt-2">
            Bastidores da Inovação e das Estrelas 🌟
          </p>
        </header>

        <Suspense fallback={<p className="text-center text-gray-400">Carregando posts...</p>}>
          <BlogList />
        </Suspense>
      </section>
    </main>
  )
}