'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const botoesInstitucionais = [
  { nome: 'Blog', emoji: '📚', rota: '/blog' },
  { nome: 'Contato', emoji: '📬', rota: '/contato' },
  { nome: 'Sobre', emoji: 'ℹ️', rota: '/sobre' },
  { nome: 'Dashboard', emoji: '👤', rota: '/dashboard' },
]

export default function MobileView() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    console.log('✅ MobileView carregado.')
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-2">
          <div className="text-5xl animate-spin-slow">🛸</div>
          <p className="text-lg font-semibold">Carregando o Portal 5ESTRELAS...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white flex flex-col items-center justify-start px-5 py-10 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center leading-snug"
      >
        🌟 Bem-vindo ao <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-base text-center max-w-md text-gray-300"
      >
        Acesse os módulos principais do nosso portal institucional.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col space-y-4 w-full max-w-xs"
      >
        {botoesInstitucionais.map((btn) => (
          <Link key={btn.rota} href={btn.rota}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-5 text-center backdrop-blur-md shadow-md"
            >
              <div className="text-4xl mb-2">{btn.emoji}</div>
              <div className="text-lg font-medium">{btn.nome}</div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-xs text-center text-gray-400 max-w-sm pt-6"
      >
        🌌 Este é o coração institucional do nosso ecossistema. Estamos ativando novos apps com responsabilidade, ética e inovação. ✨
      </motion.p>
    </main>
  )
}
