export default function Home() {
  return (
    <section className="grid gap-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Bem-vindo ao <span className="text-yellow-300">ECOSSISTEMA 5ESTRELAS</span>
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Apps integrados, moeda própria, gamificação e conteúdo inteligente — tudo num só portal.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="/blog" className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition">
            📚 Blog Oficial
          </a>
          <a href="/loja" className="px-5 py-3 rounded-2xl bg-yellow-300 text-black hover:bg-yellow-200 transition">
            🛍️ Ir para a Loja
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-2xl">💎</div>
          <h3 className="mt-2 font-semibold">Moeda 5⭐</h3>
          <p className="opacity-90 text-sm">Camadas BASE e RARAS para missões, reputação e recompensas.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-2xl">🎮</div>
          <h3 className="mt-2 font-semibold">Gamificação</h3>
          <p className="opacity-90 text-sm">Leitura que Paga, ranking global e NFTs simbólicos.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-2xl">🏦</div>
          <h3 className="mt-2 font-semibold">Banco Digital</h3>
          <p className="opacity-90 text-sm">Cashback, microcrédito e integrações com os apps do ecossistema.</p>
        </div>
      </div>
    </section>
  );
}
