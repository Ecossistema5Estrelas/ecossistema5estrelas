'use client'

import BotaoVoltar from '@/components/BotaoVoltar'

export default function SobreContent() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-main text-white px-6 py-20">
      {/* Botão de voltar */}
      <div className="w-full max-w-4xl mb-10 self-start">
        <BotaoVoltar />
      </div>

      {/* Conteúdo */}
      <section className="w-full max-w-4xl space-y-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-400">
            🌟 Sobre o ECOSSISTEMA 5ESTRELAS
          </h1>
          <p className="text-lg md:text-xl text-zinc-100">
            Conectando excelência, inclusão e tecnologia em um só universo.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">🚀 Missão</h2>
          <p className="text-zinc-200 text-lg">
            Democratizar o acesso à reputação, inovação e prosperidade digital por meio de plataformas que elevam pessoas, serviços e negócios com justiça, transparência e impacto social.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">🔭 Visão</h2>
          <p className="text-zinc-200 text-lg">
            Ser o ecossistema digital mais amado, acessível e influente do Brasil e do mundo, promovendo inclusão, tecnologia, educação e sustentabilidade com propósito.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">🧭 Valores</h2>
          <ul className="list-disc list-inside text-zinc-200 text-lg space-y-1">
            <li>Inclusão radical com acessibilidade real</li>
            <li>Transparência, segurança e ética digital</li>
            <li>Foco na excelência e reputação justa</li>
            <li>Inovação com propósito e impacto social</li>
            <li>Colaboração entre humanos e IAs responsáveis</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">🌌 Propósito</h2>
          <p className="text-zinc-200 text-lg">
            Capacitar cada estrela brasileira — seja uma manicure, mecânico, criador de conteúdo ou empresa — a brilhar com autonomia, visibilidade e valorização. Nós não apenas conectamos pessoas, nós iluminamos trajetórias. ✨
          </p>
        </section>
      </section>
    </main>
  )
}