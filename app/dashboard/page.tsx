// /app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui futuramente você pode validar se o usuário está logado
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
    <main className="min-h-screen p-6 bg-gradient-main text-white">
      <h1 className="text-3xl font-bold mb-4">🌟 Bem-vindo ao seu Painel!</h1>
      <p className="text-lg">Aqui você poderá gerenciar sua conta, perfil, preferências e acessar conteúdos exclusivos.</p>

      {/* Exemplos futuros */}
      <ul className="mt-6 space-y-2 list-disc list-inside">
        <li>📋 Visualizar dados do perfil</li>
        <li>⚙️ Configurações da conta</li>
        <li>💎 Acesso Premium e benefícios</li>
        <li>🧠 Estatísticas de uso do Ecossistema</li>
      </ul>
    </main>
  )
}
