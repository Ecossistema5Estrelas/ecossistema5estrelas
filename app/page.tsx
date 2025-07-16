'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4 animate-bounce">🛸</div>
          <h1 className="text-2xl font-bold">Ecossistema 5ESTRELAS em movimento!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🛸</span>
              <h1 className="text-2xl font-bold text-white">ECOSSISTEMA 5ESTRELAS</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#agentes" className="text-white hover:text-purple-300 transition-colors">Agentes IA</a>
              <a href="#redes" className="text-white hover:text-purple-300 transition-colors">Redes Sociais</a>
              <a href="#verticais" className="text-white hover:text-purple-300 transition-colors">Verticais</a>
              <a href="#recursos" className="text-white hover:text-purple-300 transition-colors">Recursos</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              O Futuro dos
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {' '}Serviços Locais
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Conectamos profissionais e clientes através de tecnologia avançada, 
              IA e automação para criar experiências 5 estrelas em todos os setores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
                Começar Agora
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Saiba Mais
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Profissionais' },
              { number: '50K+', label: 'Clientes' },
              { number: '94%', label: 'Satisfação' },
              { number: '1.247%', label: 'ROI' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agentes IA Section */}
      <section id="agentes" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            6 Agentes IA Especializados
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'IA Prospectora', desc: 'Identifica leads qualificados automaticamente', icon: '🎯', efficiency: '94%' },
              { name: 'IA Conversacional', desc: 'Chatbots especializados por setor', icon: '💬', efficiency: '89%' },
              { name: 'IA Nutrição', desc: 'Sequências automatizadas de follow-up', icon: '🌱', efficiency: '92%' },
              { name: 'IA Upselling', desc: 'Maximiza valor do cliente', icon: '📈', efficiency: '87%' },
              { name: 'IA Retenção', desc: 'Previne churn e aumenta fidelidade', icon: '🛡️', efficiency: '91%' },
              { name: 'IA Analytics', desc: 'Inteligência de negócios avançada', icon: '📊', efficiency: '96%' }
            ].map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{agent.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{agent.name}</h4>
                <p className="text-gray-300 mb-3">{agent.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Eficiência:</span>
                  <span className="text-green-400 font-semibold">{agent.efficiency}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticais Section */}
      <section id="verticais" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Verticais do Ecossistema
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'BELEZA5ESTRELAS', desc: 'Salões, cabeleireiros, estética', icon: '💄', color: 'from-pink-500 to-rose-500' },
              { name: 'MECÂNICA5ESTRELAS', desc: 'Oficinas e serviços automotivos', icon: '🔧', color: 'from-blue-500 to-cyan-500' },
              { name: 'MODA5ESTRELAS', desc: 'Fashion e personal styling', icon: '👗', color: 'from-purple-500 to-indigo-500' },
              { name: 'PET5ESTRELAS', desc: 'Veterinários e pet shops', icon: '🐕', color: 'from-green-500 to-emerald-500' },
              { name: 'EDUCAÇÃO5ESTRELAS', desc: 'Cursos e capacitação', icon: '📚', color: 'from-yellow-500 to-orange-500' },
              { name: 'NEWS5ESTRELAS', desc: 'Jornalismo e mídia', icon: '📰', color: 'from-red-500 to-pink-500' }
            ].map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${vertical.color} rounded-xl p-6 text-white hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{vertical.icon}</div>
                <h4 className="text-xl font-bold mb-2">{vertical.name}</h4>
                <p className="text-white/90">{vertical.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section id="recursos" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Recursos Principais
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sistema 5 Estrelas', desc: 'Avaliações e qualidade', icon: '⭐' },
              { name: 'IA Avançada', desc: '6 agentes especializados', icon: '🤖' },
              { name: 'Redes Sociais', desc: 'Automação completa', icon: '📱' },
              { name: 'Monetização', desc: 'ROI de 1.247%', icon: '💰' }
            ].map((recurso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{recurso.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{recurso.name}</h4>
                <p className="text-gray-300">{recurso.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-3xl">🛸</span>
            <h1 className="text-2xl font-bold text-white">ECOSSISTEMA 5ESTRELAS</h1>
          </div>
          <p className="text-gray-400 mb-6">
            O futuro dos serviços locais com IA avançada
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">TikTok</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 ECOSSISTEMA 5ESTRELAS. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}