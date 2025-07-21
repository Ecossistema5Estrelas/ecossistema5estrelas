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

export default function DesktopView() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    console.log('🖥️ DesktopView carregado.')
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-2">
          <div className="text-6xl animate-pulse">🌐</div>
          <p className="text-lg font-semibold">Carregando a versão Desktop...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white flex flex-col items-center justify-start px-8 py-16 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center"
      >
        💻 Bem-vindo à versão <span className="text-yellow-400">Desktop</span> do
        <br />
        <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-lg text-center max-w-2xl text-gray-300"
      >
        Explore os principais módulos institucionais do nosso portal. Essa experiência é otimizada para tela grande,
        navegando com excelência, estilo e acessibilidade.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-2 gap-6 w-full max-w-3xl"
      >
        {botoesInstitucionais.map((btn) => (
          <Link key={btn.rota} href={btn.rota}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-md shadow-md cursor-pointer"
            >
              <div className="text-5xl mb-2">{btn.emoji}</div>
              <div className="text-xl font-semibold">{btn.nome}</div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-sm text-center text-gray-500 max-w-2xl pt-10"
      >
        🛸 Você está acessando a versão desktop do nosso universo digital. Mais de 90 aplicativos 5ESTRELAS estão em fase
        de ativação. Seja bem-vindo ao futuro! 🚀
      </motion.p>
    </main>
  )
}
