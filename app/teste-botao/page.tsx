// app/teste-botao/page.tsx
'use client'

import Button from '@/components/ui/button' // ✅ Caminho correto com import default

export default function TesteBotaoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-3xl font-bold mb-6">🧪 Teste de Botão</h1>
      <Button onClick={() => alert("⭐ Botão 5ESTRELAS clicado!")}>
        💥 Clique aqui
      </Button>
    </main>
  )
}
