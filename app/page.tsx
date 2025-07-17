import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 1s infinite' }}>🛸</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Ecossistema 5ESTRELAS em movimento!</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen text-white bg-gradient-main">
      <section className="py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Bem-vindo ao <span className="text-purple-400">ECOSSISTEMA 5ESTRELAS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl mx-auto text-lg text-gray-300"
        >
          Conectamos serviços locais com IA, automação e experiência de outro planeta. 🚀🛸
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-ful
