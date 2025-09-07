function Card({title,desc}:{title:string;desc:string}) {
  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-bold">{title}</h3>
      <p className="opacity-90 mt-1 text-base">{desc}</p>
    </div>
  );
}
export default function Recursos5S(){
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card title="⭐ Reputação fácil" desc="Estrelas e ranking claro para todos entenderem." />
      <Card title="💳 Pagamento simples" desc="Carteira digital 5⭐ sem complicação." />
      <Card title="🤖 IA ajudando" desc="Sugestões e atalhos para economizar tempo." />
    </section>
  );
}
