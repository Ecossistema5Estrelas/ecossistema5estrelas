'use client'

import { motion } from 'framer-motion'

export default function TesteAnimado() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold">🌟 Teste Animado</h1>
        <p className="text-lg text-zinc-400">
          Este é um exemplo de animação suave com Framer Motion.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-zinc-800 px-6 py-3 rounded-xl shadow-lg cursor-pointer"
      >
        <p className="text-white font-semibold">Interaja comigo!</p>
      </motion.div>
    </div>
  )
}

