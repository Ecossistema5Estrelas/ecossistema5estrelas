"use client"

import { motion } from "framer-motion"

export default function Sobre() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <a href="/" className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-4xl">🛸</span>
            <h1 className="text-4xl md:text-5xl font-bold">ECOSSISTEMA 5ESTRELAS</h1>
          </a>
          <p className="text-lg md:text-xl text-gray-300">
            O <strong>ECOSSISTEMA 5ESTRELAS</strong> é um universo digital que conecta profissionais, empresas e clientes em mais de <strong>90 apps inteligentes</strong>, com gamificação, IA, acessibilidade e inclusão.
          </p>
        </header>

        <section className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-yellow-400"
          >
            🚀 Nossa Missão
          </motion.h2>
          <p>
            Democratizar o acesso à tecnologia de ponta em todos os setores — do salão de beleza ao trator no campo, passando por moda, pets, saúde, mecânica, turismo, cannabis, educação, eventos e muito mais.
          </p>
        </section>

        <section className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-semibold text-yellow-400"
          >
            🧠 Tecnologias
          </motion.h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>IA Conversacional e Prospectora</li>
            <li>Gamificação com moedas, selos e NFTs</li>
            <li>Acessibilidade total (voz, leitura fácil, botões grandes)</li>
            <li>Banco Digital Integrado</li>
            <li>Recompensas, cupons, prêmios e cursos</li>
          </ul>
        </section>

        <section className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl font-semibold text-yellow-400"
          >
            🌐 Inclusão Total
          </motion.h2>
          <p>
            Atendemos desde analfabetos digitais até investidores internacionais. Nossos apps são segmentados por setor e adaptados para cada público, com linguagem acessível, emojis, e navegação inclusiva.
          </p>
        </section>

        <section className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl font-semibold text-yellow-400"
          >
            🌌 Visão de Futuro
          </motion.h2>
          <p>
            Com IA, blockchain, PWA, SEO, CRM e microserviços, seremos o maior hub de serviços locais, cursos e interações da América Latina. E o universo? Ainda é só o começo.
          </p>
        </section>

        <footer className="text-center mt-12 text-sm text-gray-400">
          <p>© 2025 ECOSSISTEMA 5ESTRELAS. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  )
}
