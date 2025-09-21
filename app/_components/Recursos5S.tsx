function Card({title,desc}:{title:string;desc:string}) {
  return (
    <div className="card">
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="opacity-90 mt-1 text-base">{desc}</p>
    </div>
  );
}
export default function Recursos5S(){
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card title="⭐ Reputação 5⭐" desc="Ranking, níveis e recompensas." />
      <Card title="🏦 Banco integrado" desc="Carteira digital e moedas." />
      <Card title="🤖 IA em todo lugar" desc="Assistentes e automação." />
    </section>
  );
}



