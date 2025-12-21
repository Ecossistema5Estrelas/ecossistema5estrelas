'use client'

import Link from 'next/link'
import Button from '@/components/ui/button'

export default function TesteBotaoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white px-4 py-12">
      <div className="text-5xl mb-4">ðŸ§ª</div>
      <h1 className="text-3xl font-bold mb-6">Teste de BotÃ£o</h1>

      <Button onClick={() => alert('BotÃ£o funcionando! ðŸš€')} className="mb-6">
        Clique aqui para testar
      </Button>

      <Link href="/" className="text-sm underline opacity-75 hover:opacity-100 transition">
        â¬…ï¸ Voltar para InÃ­cio
      </Link>
    </main>
  )
}
