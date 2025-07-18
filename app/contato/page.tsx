'use client'

export default function Contato() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-main text-white p-4">
      <form
        action="https://formsubmit.co/contato@ecossistema5estrelas.com"
        method="POST"
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg w-full max-w-md shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">📬 Entre em Contato</h1>

        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://www.ecossistema5estrelas.org/obrigado" />

        <input
          type="text"
          name="name"
          required
          placeholder="Seu nome"
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Seu e-mail"
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          name="message"
          required
          placeholder="Sua mensagem"
          rows={4}
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold transition duration-300"
        >
          Enviar
        </button>
      </form>
    </main>
  )
}
