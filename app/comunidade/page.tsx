import PageHeader from "@/components/PageHeader";

export default function Comunidade() {
  return (
    <>
      <PageHeader icon="🤝" title="Comunidade" />
      <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto p-8">
        <h1>Diretrizes da Comunidade</h1>
        <ul>
          <li><strong>Respeito, diversidade e inclusão:</strong> zero tolerância a ódio, assédio ou discriminação.</li>
          <li><strong>Conteúdo legal:</strong> proibido conteúdo ilícito, violento, sexualmente explícito ou que viole direitos.</li>
          <li><strong>Integridade:</strong> não se passar por terceiros, não disseminar desinformação nem golpes.</li>
          <li><strong>Segurança:</strong> reporte abusos em <a href="mailto:atendimento@ecossistema5estrelas.org">atendimento@ecossistema5estrelas.org</a>.</li>
          <li><strong>Moderação:</strong> podemos remover conteúdos e restringir acesso em caso de violação.</li>
        </ul>
      </section>
    </>
  );
}




