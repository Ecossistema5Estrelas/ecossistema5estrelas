'use client'

import Button from '@/components/ui/button'

export default function TesteBotaoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold">🚀 Teste de Botão</h1>
        <Button onClick={() => alert("⭐ Botão 5ESTRELAS clicado!")}>
          Clique aqui 😎
        </Button>
      </div>
    </main>
  )
}
