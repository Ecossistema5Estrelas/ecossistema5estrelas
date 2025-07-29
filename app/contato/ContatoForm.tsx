'use client'

import BotaoVoltar from '@/components/BotaoVoltar'

export default function ContatoForm() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-main text-white px-4 py-20">
      {/* Botão de voltar */}
      <div className="w-full max-w-4xl mb-8 self-start">
        <BotaoVoltar />
      </div>

      {/* Formulário */}
      <form
        action="https://formsubmit.co/contato@ecossistema5estrelas.com"
        method="POST"
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 space-y-5"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-300 mb-4">
          📬 Fale com a gente
        </h1>

        {/* Configurações extras do FormSubmit */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://www.ecossistema5estrelas.org/obrigado" />

        {/* Nome */}
        <input
          type="text"
          name="name"
          required
          placeholder="Seu nome"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Seu nome"
        />

        {/* E-mail */}
        <input
          type="email"
          name="email"
          required
          placeholder="Seu e-mail"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Seu e-mail"
        />

        {/* Mensagem */}
        <textarea
          name="message"
          required
          placeholder="Sua mensagem"
          rows={4}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Sua mensagem"
        />

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition duration-300"
        >
          Enviar mensagem
        </button>
      </form>
    </main>
  )
}