// app/dashboard/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | ECOSSISTEMA 5ESTRELAS',
  description: 'Acompanhe seu progresso e gerencie seu perfil.',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">👤 Dashboard</h1>

        {/* Apenas a CAIXA com “glass” — o entorno é transparente pro gradiente global aparecer */}
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-6 shadow-lg shadow-black/40">
          <p className="text-zinc-200">Bem-vindo ao seu painel. Em breve, widgets e métricas aqui.</p>
        </div>
      </section>
    </main>
  )
}

