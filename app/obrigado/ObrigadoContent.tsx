'use client'

import BotaoVoltar from '@/components/BotaoVoltar'

export default function ObrigadoContent() {
  return (
    <main className="min-h-screen bg-gradient-main text-white px-6 py-20 flex flex-col items-center">
      {/* Botão de voltar */}
      <div className="w-full max-w-4xl mb-8 self-start">
        <BotaoVoltar />
      </div>

      {/* Cartão de agradecimento */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-white/20 space-y-6">
        <h1 className="text-3xl font-extrabold text-emerald-400">🎉 Mensagem Enviada!</h1>

        <p className="text-lg text-zinc-100">
          Agradecemos por entrar em contato com o <strong className="text-yellow-300">Ecossistema 5ESTRELAS</strong>. 💌
        </p>

        <p className="text-zinc-400">
          Em breve retornaremos com carinho, atenção e eficiência. ✨
        </p>
      </div>
    </main>
  )
}