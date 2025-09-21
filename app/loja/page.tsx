export default function LojaPage() {
  return (
    <section>
      <h1 className="text-3xl md:text-5xl mb-6">Loja</h1>
      <div className="card-estrela space-y-3">
        <p>Explore softwares, APIs, cursos e assinaturas premium do ECOSSISTEMA 5ESTRELAS.</p>
        <ul className="list-disc pl-6">
          <li>Softwares de IA com otimizações fractais (eficiência e menor custo computacional).</li>
          <li>APIs: visão computacional, PLN e análise preditiva.</li>
          <li>Cursos do básico ao avançado, com certificação.</li>
          <li>Assinaturas premium com suporte prioritário.</li>
        </ul>
        <p className="opacity-80 text-sm">Dúvidas sobre itens ou compra: <strong>suporte@ecossistema5estrelas.org</strong></p>
      </div>
    </section>
  );
}
