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
      <div style={{minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{color: '#fff', textAlign: 'center'}}>
          <div style={{fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 1s infinite'}}>🛸</div>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Ecossistema 5ESTRELAS em movimento!</h1>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
      color: '#fff'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span style={{fontSize: '2rem', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))'}}>🛸</span>
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
              <span style={{
                background: 'linear-gradient(45deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {' '}Serviços Locais
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Conectamos profissionais e clientes através de tecnologia avançada, 
              IA e automação para criar experiências 5 estrelas em todos os setores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button style={{
                background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                color: '#fff',
                padding: '12px 32px',
                borderRadius: '50px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Começar Agora
              </button>
              <button style={{
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '12px 32px',
                borderRadius: '50px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
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
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }}
                className="hover:bg-white/20 group"
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
      <section id="verticais" style={{padding: '80px 16px', background: 'rgba(0,0,0,0.2)'}}>
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Verticais do Ecossistema
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'BELEZA5ESTRELAS', desc: 'Salões, cabeleireiros, estética', icon: '💄', color: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
              { name: 'MECÂNICA5ESTRELAS', desc: 'Oficinas e serviços automotivos', icon: '🔧', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
              { name: 'MODA5ESTRELAS', desc: 'Fashion e personal styling', icon: '👗', color: 'linear-gradient(135deg, #8b5cf6, #6366f1)' },
              { name: 'PET5ESTRELAS', desc: 'Veterinários e pet shops', icon: '🐕', color: 'linear-gradient(135deg, #10b981, #059669)' },
              { name: 'EDUCAÇÃO5ESTRELAS', desc: 'Cursos e capacitação', icon: '📚', color: 'linear-gradient(135deg, #eab308, #f97316)' },
              { name: 'NEWS5ESTRELAS', desc: 'Jornalismo e mídia', icon: '📰', color: 'linear-gradient(135deg, #ef4444, #ec4899)' }
            ].map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  background: vertical.color,
                  borderRadius: '12px',
                  padding: '24px',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
                className="hover:scale-105 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{vertical.icon}</div>
                <h4 className="text-xl font-bold mb-2">{vertical.name}</h4>
                <p style={{color: 'rgba(255,255,255,0.9)'}}>{vertical.desc}</p>
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
      <footer style={{background: 'rgba(0,0,0,0.4)', padding: '48px 16px'}}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span style={{fontSize: '2rem', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))'}}>🛸</span>
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