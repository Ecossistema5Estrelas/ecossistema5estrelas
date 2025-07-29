'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'

const botoes = [
  { nome: '📚 Blog', rota: '/blog' },
  { nome: '📬 Contato', rota: '/contato' },
  { nome: 'ℹ️ Sobre', rota: '/sobre' },
  { nome: '👤 Dashboard', rota: '/dashboard' },
]

export default function DesktopView() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white px-8 py-16 flex flex-col items-center justify-center space-y-10 relative">
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center leading-tight text-purple-300"
      >
        🌟 Bem-vindo ao <span className="text-yellow-300">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-xl text-center max-w-3xl text-zinc-200"
      >
        Acesse os módulos principais do nosso portal institucional.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-2 gap-6 max-w-2xl w-full"
      >
        {botoes.map((btn) => {
          const [emoji, ...texto] = btn.nome.split(' ')
          return (
            <Link key={btn.rota} href={btn.rota}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center backdrop-blur-md shadow-lg transition-all cursor-pointer"
              >
                <div className="text-4xl mb-2">{emoji}</div>
                <div className="text-lg font-medium">{texto.join(' ')}</div>
              </motion.div>
            </Link>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pt-8 text-sm text-zinc-400 text-center max-w-xl"
      >
        🌐 Este é o coração institucional do nosso ecossistema. Estamos ativando novos apps com ética, tecnologia e impacto social.
      </motion.div>

      <Link href="/" passHref legacyBehavior>
        <a
          aria-label="Voltar para a página inicial"
          className="fixed bottom-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full px-5 py-3 text-sm flex items-center space-x-2 text-white shadow-lg transition-all z-50"
        >
          <Home size={20} />
          <span>Início</span>
        </a>
      </Link>
    </main>
  )
}