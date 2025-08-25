import SobreContent from './SobreContent'

export const metadata = { title: 'Sobre | ECOSSISTEMA 5ESTRELAS' }

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">ℹ️ Sobre</h1>
        <SobreContent />
      </section>
    </main>
  )
}

