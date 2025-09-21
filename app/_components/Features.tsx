type CardProps = { title: string; desc: string; badge?: string };
function Card({ title, desc, badge }: CardProps) {
  return (
    <div className="card bg-white/60 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
        {badge && <span className="text-xs px-2 py-0.5 rounded-full border">{badge}</span>}
      </div>
      <p className="opacity-80 mt-1 text-sm">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card title="⭐ Reputação & Gamificação" desc="Níveis, ranking global, NFTs simbólicos e recompensas." badge="Core" />
      <Card title="🏦 Banco 5⭐" desc="Carteira digital, moeda própria e pagamentos integrados." badge="Finanças" />
      <Card title="🤖 IA em Tudo" desc="Curadoria de conteúdo, roteiros, assistants e automação." badge="IA" />
      <Card title="📚 Blog / Revistas / Rádio" desc="Conteúdo multimídia com UGC e monetização." />
      <Card title="🛍 Loja Integrada" desc="Produtos e serviços 5⭐ com avaliações cruzadas." />
      <Card title="🌐 Multiapps" desc="Beleza, Moda, Agro, Educação, Cultura e mais." />
    </section>
  );
}



