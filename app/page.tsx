'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const apps = [
  { nome: 'BELEZA5ESTRELAS', rota: '/beleza' },
  { nome: 'MODA5ESTRELAS', rota: '/moda' },
  { nome: 'MECÂNICA5ESTRELAS', rota: '/mecanica' },
  { nome: 'INFLU5ESTRELAS', rota: '/influ' },
  { nome: 'KIDS5ESTRELAS', rota: '/kids' },
  { nome: 'PET5ESTRELAS', rota: '/pet' },
  { nome: 'CONTATO', rota: '/contato' },
  { nome: 'SOBRE', rota: '/sobre' },
  { nome: 'DASHBOARD', rota: '/dashboard/perfil' },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🛸</div>
          <h1 className="text-xl font-bold">Ecossistema 5ESTRELAS em movimento!</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-main text-white flex flex-col items-center p-6 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-center mt-10"
      >
        🌟 Bem-vindo ao <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-lg text-center max-w-xl text-gray-300"
      >
        Escolha um aplicativo para explorar e transforme sua experiência com inovação e inclusão.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {apps.map((app, index) => (
          <Link key={index} href={app.rota}>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center hover:bg-opacity-20 transition cursor-pointer border border-white/20 shadow-lg">
              <span className="text-xl font-semibold">{app.nome}</span>
            </div>
          </Link>
        ))}
      </motion.div>
    </main>
  )
}
