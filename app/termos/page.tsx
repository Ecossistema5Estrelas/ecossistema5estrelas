export default function TermosPage() {
  const hoje = "Domingo, 21 de setembro de 2025";
  return (
    <section className="space-y-6">
      <h1 className="text-3xl md:text-5xl mb-4">Termos de Serviço</h1>
      <p><strong>Última atualização:</strong> {hoje}</p>

      <h2 className="text-2xl font-semibold mt-6">1. Aceitação</h2>
      <p>Ao usar o site, produtos e serviços do ECOSSISTEMA 5ESTRELAS, você concorda com estes termos. Podemos atualizá-los ocasionalmente; o uso contínuo representa aceitação.</p>

      <h2 className="text-2xl font-semibold mt-4">2. Elegibilidade</h2>
      <p>A plataforma é destinada a maiores de 18 anos ou menores emancipados com capacidade legal. Contas automatizadas sem autorização são proibidas.</p>

      <h2 className="text-2xl font-semibold mt-4">3. Cadastro e Segurança</h2>
      <p>Ao criar uma conta, forneça informações verdadeiras. Você é responsável por manter suas credenciais em sigilo e nos notificar sobre uso indevido.</p>

      <h2 className="text-2xl font-semibold mt-4">4. Conduta do Usuário</h2>
      <p>É proibido publicar conteúdo ilícito, ofensivo ou que viole direitos de terceiros. A engenharia reversa do software e ataques maliciosos também são proibidos.</p>

      <h2 className="text-2xl font-semibold mt-4">5. Uso dos Serviços de IA</h2>
      <p>Os serviços de IA são fornecidos “como estão”. Podem ocorrer imprecisões; você é responsável pelo uso do conteúdo gerado. Não utilize para fins ilegais ou prejudiciais.</p>

      <h2 className="text-2xl font-semibold mt-4">6. Propriedade Intelectual</h2>
      <p>Todo conteúdo (textos, imagens, software) é de nossa propriedade ou licenciadores. É proibido copiar ou explorar comercialmente sem autorização.</p>

      <h2 className="text-2xl font-semibold mt-4">7. Pagamentos e Assinaturas</h2>
      <p>Alguns serviços exigem pagamento. Assinaturas renovam automaticamente. Cancelamentos não geram reembolso proporcional, salvo previsto em lei.</p>

      <h2 className="text-2xl font-semibold mt-4">8. Garantias e Limitações</h2>
      <p>Não garantimos disponibilidade contínua. Limite de responsabilidade conforme a lei; não nos responsabilizamos por danos indiretos.</p>

      <h2 className="text-2xl font-semibold mt-4">9. Indenização</h2>
      <p>Você concorda em indenizar o ECOSSISTEMA 5ESTRELAS por danos decorrentes do uso indevido da plataforma.</p>

      <h2 className="text-2xl font-semibold mt-4">10. Rescisão</h2>
      <p>Podemos suspender ou encerrar contas que violem estes termos. Você também pode encerrar sua conta a qualquer momento; dados serão eliminados conforme a lei.</p>

      <h2 className="text-2xl font-semibold mt-4">11. Foro</h2>
      <p>Fica eleito o foro da Circunscrição Judiciária de Brasília – DF para dirimir quaisquer controvérsias.</p>

      <h2 className="text-2xl font-semibold mt-4">Dúvidas</h2>
      <p>Qualquer dúvida sobre estes termos: suporte@ecossistema5estrelas.org.</p>

      <p className="text-sm mt-8">© 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</p>
    </section>
  );
}
