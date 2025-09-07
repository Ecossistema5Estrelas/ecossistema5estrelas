import Hero5S from "./_components/Hero5S";
import CTAButtons from "./_components/CTAButtons";
import Recursos5S from "./_components/Recursos5S";

export default function Home(){
  return (
    <main className="container grid gap-6">
      <Hero5S />
      <CTAButtons />
      <section aria-label="Informações rápidas" className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h2 className="text-lg md:text-xl font-bold">Texto grande e claro</h2>
          <p className="opacity-90 text-base">Tudo pensado para quem enxerga pouco ou lê devagar.</p>
        </div>
        <div className="card">
          <h2 className="text-lg md:text-xl font-bold">Botões coloridos</h2>
          <p className="opacity-90 text-base">Cada ação tem cor e emoji em cima do nome.</p>
        </div>
        <div className="card">
          <h2 className="text-lg md:text-xl font-bold">Acessibilidade</h2>
          <p className="opacity-90 text-base">Foco visível, alto contraste e navegação simples.</p>
        </div>
      </section>
      <Recursos5S />
    </main>
  );
}
