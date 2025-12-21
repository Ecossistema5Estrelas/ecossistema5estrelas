import FormularioContato from './FormularioContato'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato | ECOSSISTEMA 5ESTRELAS',
  description: 'Fale com a equipe do ECOSSISTEMA 5ESTRELAS. Estamos aqui para te ouvir.',
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 px-4 py-12 text-white">
      <section className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <div className="text-5xl mb-2">📬</div>
          <h1 className="text-3xl font-bold">Fale com a gente</h1>
          <p className="text-gray-400 text-sm mt-2">
            Envie sua mensagem e entraremos em contato o quanto antes.
          </p>
        </header>

        <FormularioContato />
      </section>
    </main>
  )
}