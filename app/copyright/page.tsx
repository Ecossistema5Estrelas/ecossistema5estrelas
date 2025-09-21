import PageHeader from "@/components/PageHeader";

export default function Copyright() {
  return (
    <>
      <PageHeader icon="©️" title="Copyright" />
      <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto p-8">
        <h1>Copyright</h1>
        <p>Salvo indicação em contrário, todo o conteúdo do ecossistema5estrelas.org é de titularidade do ECOSSISTEMA 5ESTRELAS e protegido por direitos autorais e demais leis aplicáveis.</p>
        <h2>Uso permitido</h2>
        <ul>
          <li>Uso pessoal e não comercial, sem remoção de avisos de direitos.</li>
          <li>Proibida a reprodução, distribuição, modificação ou exploração comercial sem autorização expressa.</li>
        </ul>
        <h2>Notificação de infração (DMCA/LGPD)</h2>
        <p>Relate eventuais violações em 📧 <a href="mailto:atendimento@ecossistema5estrelas.org">atendimento@ecossistema5estrelas.org</a> com detalhes e comprovações.</p>
      </section>
    </>
  );
}




