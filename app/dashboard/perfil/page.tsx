import type { Metadata } from 'next'
import PerfilContent from './PerfilContent'

export const metadata: Metadata = {
  title: 'Perfil | ECOSSISTEMA 5ESTRELAS',
  description: 'Gerencie seu perfil e preferências.',
}

export default function PerfilPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">👤 Meu Perfil</h1>
        <PerfilContent />
      </section>
    </main>
  )
}

