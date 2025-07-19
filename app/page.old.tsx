'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const botoesInstitucionais = [
  { nome: 'Blog', emoji: '📚', rota: '/blog' },
  { nome: 'Contato', emoji: '📬', rota: '/contato' },
  { nome: 'Sobre', emoji: 'ℹ️', rota: '/sobre' },
  { nome: 'Dashboard', emoji: '👤', rota: '/dashboard' },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  // 🚀 Forçando rebuild para atualizar versão mobile (19/07/2025)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-2">
          <div className="text-6xl animate-spin-slow">🛸</div>
          <h1 className="text-xl font-bold">Carregando o Portal 5ESTRELAS...</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white flex flex-col items-center justify-center px-4 py-12 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-center leading-tight"
      >
        🌟 Bem-vindo ao <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-lg text-center max-w-2xl text-gray-300"
      >
        Uma constelação de aplicativos éticos, acessíveis e revolucionários para transformar o Brasil e o mundo — do local ao global.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {botoesInstitucionais.map((btn, index) => (
          <Link key={index} href={btn.rota}>
            <motion.div
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transition cursor-pointer shadow-lg space-y-2"
            >
              <div className="text-3xl">{btn.emoji}</div>
              <div className="text-lg font-semibold">{btn.nome}</div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="text-sm text-center text-gray-400 max-w-2xl mt-10"
      >
        🚧 Este é o núcleo institucional do portal. Os demais aplicativos estão em fase de ativação progressiva.
        Se você é investidor, parceiro ou visionário: seja bem-vindo à maior constelação digital do Brasil. 💎
      </motion.p>
    </main>
  )
}
