'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BotaoVoltar from '@/components/BotaoVoltar'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Em breve: validar se usuário está logado aqui
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-main text-white">
        <p className="animate-pulse text-xl">🔄 Carregando seu painel...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-main text-white px-6 py-16 flex flex-col items-start">
      <div className="mb-8">
        <BotaoVoltar />
      </div>

      <section className="w-full max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-2">📊 Seu Painel de Controle</h1>
          <p className="text-lg text-zinc-300">
            Bem-vindo ao seu dashboard 5ESTRELAS! Aqui você pode acompanhar seus dados, interações, histórico
            de atividades e controlar sua jornada pelo Ecossistema.
          </p>
        </header>

        <div className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/20">
          <ul className="space-y-3 text-zinc-100 list-disc list-inside text-lg">
            <li>📋 Visualizar dados do perfil</li>
            <li>⚙️ Configurações da conta</li>
            <li>💎 Acesso Premium e benefícios</li>
            <li>🧠 Estatísticas de uso do Ecossistema</li>
          </ul>
        </div>
      </section>
    </main>
  )
}