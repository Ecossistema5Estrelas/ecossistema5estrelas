import PerfilContent from './perfil/PerfilContent'
import BotaoVoltar from '@/components/BotaoVoltar'
import IAsSection from './ias/IAsSection'

export const metadata = {
  title: 'Dashboard | ECOSSISTEMA 5ESTRELAS',
  description: 'Gerencie seu perfil e preferências no ECOSSISTEMA 5ESTRELAS.',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-4 py-10">
      <section className="max-w-4xl mx-auto space-y-12">

        {/* Cabeçalho do Dashboard */}
        <header className="text-center">
          <div className="text-5xl mb-2">👤</div>
          <h1 className="text-3xl font-bold">DASHBOARD</h1>
          <p className="text-gray-400 text-sm mt-2">
            Gerencie seu perfil, preferências e configurações
          </p>
        </header>

        {/* Perfil do usuário */}
        <PerfilContent />

        {/* IAs do Ecossistema */}
        <IAsSection />

        {/* Ação de retorno */}
        <div className="text-center">
          <BotaoVoltar />
        </div>

      </section>
    </main>
  )
}