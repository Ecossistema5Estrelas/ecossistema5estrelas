export default function Hero5S() {
  return (
    <section className="relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
             style={{background:"conic-gradient(from 180deg, #f59e0b, #db2777, #34d399, #f59e0b)"}}/>
      </div>
      <div className="max-w-3xl relative">
        <div className="display-5s">ECOSSISTEMA5ESTRELAS</div>
        <p className="mt-4 text-lg md:text-xl opacity-90">
          Apps 5⭐, conteúdo e monetização integrados — simples e bonitos.
        </p>
      </div>
    </section>
  );
}



