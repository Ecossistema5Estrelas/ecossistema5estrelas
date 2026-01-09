import ObrigadoContent from './ObrigadoContent'
import BotaoVoltar from '@/components/BotaoVoltar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obrigado | ECOSSISTEMA 5ESTRELAS',
  description: 'Confirmação de ação registrada no ECOSSISTEMA 5ESTRELAS.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ObrigadoPage() {
  return (
    <main
      id="content"
      role="main"
      className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white"
      aria-labelledby="obrigado-title"
    >
      <section className="max-w-4xl mx-auto space-y-10 text-center">
        <h1 id="obrigado-title" className="sr-only">
          Confirmação
        </h1>

        <ObrigadoContent />

        <div>
          <BotaoVoltar href="/" texto="Voltar ao início" />
        </div>
      </section>
    </main>
  )
}
