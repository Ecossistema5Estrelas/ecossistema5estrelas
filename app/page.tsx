export default function Home() {
  return (
    <section className="grid gap-8 py-10">
      {/* TESTE: barra vermelha visível */}
      <div className="h-3 bg-red-500 rounded"></div>

      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm bg-white/10 border border-white/15 mb-5">
          <span>🚀</span> <span>Micélio tecnológico 5⭐</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Sites inteligentes que <span className="text-estrela-gold">crescem</span> com seu negócio
        </h1>
        <p className="mt-4 text-base sm:text-lg opacity-90">
          Automação, conteúdo e monetização integrados. Construa seu hub digital no ECOSSISTEMA 5ESTRELAS.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/blog" className="btn-estrela">📚 Ver o Blog</a>
          <a href="/loja" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium bg-white/10 hover:bg-white/15 transition">
            🛍 Ir para a Loja
          </a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-estrela p-5">
          <h3 className="font-semibold mb-1">💳 Pagamentos & Assinaturas</h3>
          <p className="opacity-80 text-sm">Stripe / Mercado Pago, freemium → premium, upgrades e upsell.</p>
        </div>
        <div className="card-estrela p-5">
          <h3 className="font-semibold mb-1">🧠 IA & Conteúdo</h3>
          <p className="opacity-80 text-sm">Blog, rádio, revistas e posts guiados por IA — UGC + curadoria.</p>
        </div>
      </div>
    </section>
  );
}
