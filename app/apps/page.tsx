import Hero from "../../components/hero";
import { AppCard } from "../../components/app-card";

export const metadata = { title: "Apps — ECOSSISTEMA 5ESTRELAS" };

export default function AppsPage() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <Hero />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AppCard app={{ title: "Exemplo 1", description: "Card de exemplo." }} />
        <AppCard app={{ title: "Exemplo 2", description: "Outro card." }} />
        <AppCard app={{ title: "Exemplo 3", description: "Mais um card." }} />
      </section>
    </main>
  );
}




