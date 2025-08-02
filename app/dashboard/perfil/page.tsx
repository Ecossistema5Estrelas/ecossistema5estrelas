'use client'

import BotaoVoltar from '../../components/BotaoVoltar'

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Painel do Usuário</h1>
      <p className="mb-8 text-lg">
        Aqui você terá acesso às suas informações pessoais, histórico de atividades e configurações do Ecossistema 5ESTRELAS.
      </p>

      {/* Aqui você pode adicionar cards, widgets ou gráficos futuramente */}
      <div className="border border-white/20 rounded-lg p-6 bg-white/5">
        <p className="text-sm text-white/80">Este módulo ainda está em construção.</p>
      </div>

      <BotaoVoltar />
    </main>
  )
}