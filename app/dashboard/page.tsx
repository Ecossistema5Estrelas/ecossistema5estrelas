'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fakeUser = {
      name: 'Cezar Braga da Silva',
      email: 'cezar@ecossistema5estrelas.com',
      premium: true,
      estrelas: 128,
      pontos: 5120,
      favoritos: ['BELEZA5ESTRELAS', 'MECÂNICA5ESTRELAS', 'MODA5ESTRELAS']
    }
    setUser(fakeUser)
  }, [])

  if (!user) return <p className="text-center mt-10">Carregando...</p>

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-4">🚀 Bem-vindo, {user.name}</h1>
      <p className="text-lg mb-2">📩 {user.email}</p>
      <p className="mb-4">
        {user.premium ? '⭐ Conta Premium Ativa' : 'Conta Gratuita'}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-800 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">⭐ Estrelas</h2>
          <p className="text-2xl">{user.estrelas}</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">🔥 Pontos</h2>
          <p className="text-2xl">{user.pontos}</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-4 text-center col-span-2">
          <h2 className="text-xl font-bold mb-2">📱 Apps Favoritos</h2>
          <ul className="space-y-1">
            {user.favoritos.map((app: string) => (
              <li key={app}>✅ {app}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={() => router.push('/dashboard/perfil')}>Editar Perfil</Button>
    </main>
  )
}
