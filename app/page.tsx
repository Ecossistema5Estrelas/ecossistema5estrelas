'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-main text-white px-6 py-20 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-400 drop-shadow-lg">
        🌟 ECOSSISTEMA 5ESTRELAS
      </h1>

      <p className="text-lg md:text-xl text-zinc-200 max-w-2xl text-center">
        Estamos construindo um universo digital que vai transformar vidas com{' '}
        <span className="text-purple-300 font-semibold">acessibilidade</span>,{' '}
        <span className="text-pink-400 font-semibold">inovação</span> e{' '}
        <span className="text-green-400 font-semibold">impacto real</span>. 🌐✨
      </p>

      <p className="text-md md:text-lg text-zinc-400 text-center italic">
        🚀 Em breve você poderá explorar todos os nossos aplicativos e experiências digitais interconectadas.
      </p>

      {/* Botões padronizados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
        <Botao emoji="📚" texto="Blog Oficial" href="/blog" bg="bg-yellow-500" text="text-black" />
        <Botao emoji="🚀" texto="Sobre o Projeto" href="/sobre" bg="bg-purple-600" text="text-white" />
        <Botao emoji="📬" texto="Fale com a gente" href="/contato" bg="bg-blue-500" text="text-white" />
        <Botao emoji="🛠️" texto="Área do Usuário" href="/dashboard" bg="bg-green-600" text="text-white" />
      </div>
    </main>
  )
}

// Componente de botão reutilizável com emoji em cima
function Botao({ emoji, texto, href, bg, text }: { emoji: string; texto: string; href: string; bg: string; text: string }) {
  return (
    <Link
      href={href}
      className={`${bg} ${text} px-4 py-5 rounded-xl text-center font-bold transition hover:scale-105 shadow-lg flex flex-col items-center space-y-1`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-sm sm:text-base">{texto}</span>
    </Link>
  )
}