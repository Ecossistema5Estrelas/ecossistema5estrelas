// ✅ app/obrigado/page.tsx
'use client'

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-lime-700 text-white p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">✅ Mensagem Enviada com Sucesso!</h1>
        <p className="text-lg mb-6">
          Obrigado por entrar em contato com o <strong>ECOSSISTEMA 5ESTRELAS</strong>. Em breve responderemos sua mensagem por e-mail ou WhatsApp.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded hover:bg-green-100 transition"
        >
          🌐 Voltar à Página Inicial
        </a>
      </div>
    </main>
  )
}
