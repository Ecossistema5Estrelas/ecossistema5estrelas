'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Lista de botões institucionais
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
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🛸</div>
          <h1 className="text-xl font-bold">Carregando o portal 5ESTRELAS...</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white flex flex-col items-center justify-center px-4 py-10 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-center"
      >
        🌟 Bem-vindo ao <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-lg text-center max-w-xl text-gray-300"
      >
        Estamos construindo uma rede de aplicativos éticos, inclusivos e inteligentes para transformar o Brasil.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {botoesInstitucionais.map((btn) => (
          <Link key={btn.rota} href={btn.rota}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg p-6 text-center transition cursor-pointer shadow-lg space-y-2"
            >
              <div className="text-3xl">{btn.emoji}</div>
              <div className="text-xl font-semibold">{btn.nome}</div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="text-sm text-center text-gray-400 max-w-2xl mt-8"
      >
        ✨ Muitos outros aplicativos já estão prontos nos bastidores. Iremos liberá-los aos poucos, conforme a demanda,
        parceria de investidores e evolução da nossa comunidade. Nossa prioridade é: qualidade, ética, acessibilidade e impacto real. 💫
      </motion.p>
    </main>
  )
}
