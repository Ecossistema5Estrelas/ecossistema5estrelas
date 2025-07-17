export default function ContatoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Entre em Contato</h1>
      <form
        action="https://formsubmit.co/contato@ecossistema5estrelas.com"
        method="POST"
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-black"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://www.ecossistema5estrelas.org/obrigado" />
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nome</label>
          <input type="text" name="name" required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Mensagem</label>
          <textarea name="message" rows={4} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">
          Enviar
        </button>
      </form>
    </main>
  )
}
