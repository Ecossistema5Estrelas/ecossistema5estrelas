'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-main text-white px-6 py-20 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-400 drop-shadow-lg">
        🌟 ECOSSISTEMA 5ESTRELAS
      </h1>

      <p className="text-lg md:text-xl text-zinc-200 max-w-2xl text-center">
        Uma nova era digital começa aqui. Explore os primeiros portais abertos e prepare-se para o que está por vir. 🚀
      </p>

      {/* Botões visíveis */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
        <Botao
          emoji="📚"
          texto="Blog"
          href="/blog"
          bg="bg-yellow-500"
          text="text-black"
        />
        <Botao
          emoji="📬"
          texto="Contato"
          href="/contato"
          bg="bg-blue-500"
          text="text-white"
        />
        <Botao
          emoji="ℹ️"
          texto="Sobre"
          href="/sobre"
          bg="bg-purple-600"
          text="text-white"
        />
        <Botao
          emoji="👤"
          texto="Dashboard"
          href="/dashboard"
          bg="bg-green-600"
          text="text-white"
        />
      </div>
    </main>
  )
}

function Botao({
  emoji,
  texto,
  href,
  bg,
  text,
}: {
  emoji: string
  texto: string
  href: string
  bg: string
  text: string
}) {
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