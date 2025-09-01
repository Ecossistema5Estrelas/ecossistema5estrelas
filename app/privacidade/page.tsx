import PageHeader from "@/components/PageHeader";

export default function Privacidade() {
  return (
    <>
      <PageHeader icon="🔒" title="Privacidade" />
      <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto p-8">
        <p>
          O ecossistema5estrelas.org respeita sua privacidade e trata seus
          dados pessoais em conformidade com a <strong>LGPD (Lei 13.709/2018)</strong>, 
          o <strong>GDPR</strong> e demais normas aplicáveis.
        </p>
        {/* resto do conteúdo aqui */}
      </section>
    </>
  );
}



