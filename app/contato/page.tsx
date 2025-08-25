import FormularioContato from './FormularioContato'

export const metadata = {
  title: 'Contato | ECOSSISTEMA 5ESTRELAS',
  description: 'Fale com o ECOSSISTEMA 5ESTRELAS.',
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Ã°Å¸â€œÂ¬ Contato</h1>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg shadow-black/40">
          <FormularioContato />
        </div>
      </section>
    </main>
  )
}

