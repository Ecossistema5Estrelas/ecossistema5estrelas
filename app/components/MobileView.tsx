'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'

const botoes = [
  { nome: '📚 Blog', rota: '/blog' },
  { nome: '📬 Contato', rota: '/contato' },
  { nome: 'ℹ️ Sobre', rota: '/sobre' },
  { nome: '👤 Dashboard', rota: '/dashboard' },
]

export default function MobileView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-indigo-950 text-white px-4 py-12 flex flex-col items-center justify-start space-y-8"
    >
      <h1 className="text-3xl font-extrabold text-purple-300 text-center">
        🌟 ECOSSISTEMA <span className="text-yellow-300">5ESTRELAS</span>
      </h1>
      <p className="text-zinc-200 text-center max-w-xs">
        Acesse os módulos principais do nosso portal institucional.
      </p>

      <div className="w-full max-w-xs space-y-4">
        {botoes.map((btn) => {
          const [emoji, ...texto] = btn.nome.split(' ')
          return (
            <Link key={btn.rota} href={btn.rota}>
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md p-4 rounded-xl text-center shadow-md transition-all"
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-md font-medium">{texto.join(' ')}</div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <p className="text-xs text-center text-zinc-400 max-w-sm pt-6">
        🌌 Este é o coração institucional do nosso ecossistema. Estamos ativando novos apps com ética e inovação. ✨
      </p>

      <Link href="/" passHref legacyBehavior>
        <a
          aria-label="Voltar para a página inicial"
          className="fixed bottom-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full px-5 py-3 text-sm flex items-center space-x-2 text-white shadow-lg transition-all z-50"
        >
          <Home size={20} />
          <span>Início</span>
        </a>
      </Link>
    </motion.div>
  )
}