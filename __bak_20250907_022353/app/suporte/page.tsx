import PageHeader from "@/components/PageHeader";

export default function Suporte() {
  return (
    <>
      <PageHeader icon="🛠" title="Suporte" />
      <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto p-8">
        <h1>Central de Suporte</h1>
        <p>Precisa de ajuda? Fale com a nossa equipe:</p>
        <ul>
          <li>📧 E-mail: <a href="mailto:atendimento@ecossistema5estrelas.org">atendimento@ecossistema5estrelas.org</a></li>
          <li>⏱️ Atendimento comercial: dias úteis, 9h–18h (BRT)</li>
        </ul>
        <p>Inclua o máximo de detalhes possível (URL, prints, passo a passo) para agilizar o atendimento.</p>
      </section>
    </>
  );
}
