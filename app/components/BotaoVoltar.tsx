'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function BotaoVoltar() {
  return (
    <Link
      href="/"
      aria-label="Voltar para a página inicial"
      className="fixed bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full px-5 py-3 text-sm flex items-center space-x-2 text-white shadow-lg transition-all"
    >
      <Home size={20} />
      <span>Início</span>
    </Link>
  )
}