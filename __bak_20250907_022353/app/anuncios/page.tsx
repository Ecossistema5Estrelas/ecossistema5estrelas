import PageHeader from "@/components/PageHeader";

export default function Anuncios() {
  return (
    <>
      <PageHeader icon="📢" title="Anúncios" />
      <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto p-8">
        <h1>Política de Anúncios</h1>
        <p>Exibimos anúncios conforme princípios de transparência, conformidade legal e experiência do usuário.</p>
        <h2>Diretrizes</h2>
        <ul>
          <li>Identificação clara de conteúdo publicitário e parcerias.</li>
          <li>Proibição de anúncios enganosos, ilegais ou de alto risco.</li>
          <li>Respeito à privacidade e às preferências de consentimento de cookies.</li>
        </ul>
        <h2>Contato comercial</h2>
        <p>📧 <a href="mailto:atendimento@ecossistema5estrelas.org">atendimento@ecossistema5estrelas.org</a></p>
      </section>
    </>
  );
}
