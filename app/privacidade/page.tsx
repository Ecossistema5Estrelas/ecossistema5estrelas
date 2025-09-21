export default function PrivacidadePage() {
  const hoje = "Domingo, 21 de setembro de 2025";
  return (
    <section className="space-y-6">
      <h1 className="text-3xl md:text-5xl mb-4">Política de Privacidade</h1>
      <p><strong>Última atualização:</strong> {hoje}</p>

      <h2 className="text-2xl font-semibold mt-6">1. Informações Coletadas</h2>
      <p>Coletamos dados pessoais (nome, email, telefone e dados de pagamento quando aplicável) e dados de navegação (IP, tipo de navegador, páginas acessadas e tempo de uso).</p>

      <h2 className="text-2xl font-semibold mt-4">2. Uso das Informações</h2>
      <p>Utilizamos essas informações para fornecer e aprimorar nossos serviços, personalizar a experiência no site, processar transações, responder a solicitações de suporte e informar sobre novidades do ecossistema.</p>

      <h2 className="text-2xl font-semibold mt-4">3. Compartilhamento de Dados</h2>
      <p>Não vendemos nem alugamos seus dados. Compartilhamos somente com parceiros necessários para operar a plataforma (pagamentos, infraestrutura) ou quando exigido por lei.</p>

      <h2 className="text-2xl font-semibold mt-4">4. Cookies e Tecnologias Semelhantes</h2>
      <p>Usamos cookies para melhorar a funcionalidade e a experiência. Inclui cookies essenciais (login, carrinho), de desempenho (estatísticas), de funcionalidade (preferências) e de publicidade (AdSense). Você pode gerenciar cookies nas configurações do navegador.</p>

      <h2 className="text-2xl font-semibold mt-4">5. Direitos dos Usuários</h2>
      <p>Em conformidade com a LGPD, você pode acessar, corrigir, eliminar dados desnecessários ou revogar consentimento. Contate-nos para exercer esses direitos.</p>

      <h2 className="text-2xl font-semibold mt-4">6. Armazenamento e Segurança</h2>
      <p>Adotamos medidas de segurança técnicas e administrativas para proteger seus dados. Utilizamos servidores seguros e criptografia para dados sensíveis. Nenhum sistema é 100% seguro; recomendamos proteger suas credenciais.</p>

      <h2 className="text-2xl font-semibold mt-4">7. Retenção de Dados</h2>
      <p>Guardamos seus dados apenas pelo tempo necessário ao cumprimento das finalidades ou de obrigações legais. Dados de conta permanecem enquanto sua conta estiver ativa; dados de transações podem ser retidos para fins fiscais.</p>

      <h2 className="text-2xl font-semibold mt-4">8. Transferência Internacional</h2>
      <p>Alguns dados podem ser processados em servidores fora do Brasil. Quando isso ocorre, garantimos conformidade legal e mecanismos de proteção adequados.</p>

      <h2 className="text-2xl font-semibold mt-4">9. Links Externos</h2>
      <p>Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos por suas políticas de privacidade. Recomenda-se ler atentamente as políticas desses sites.</p>

      <h2 className="text-2xl font-semibold mt-4">10. Atualizações</h2>
      <p>Podemos atualizar esta política periodicamente. Notificaremos mudanças significativas no site ou por email.</p>

      <h2 className="text-2xl font-semibold mt-4">11. Contato</h2>
      <p>Para dúvidas, preocupações ou solicitações relacionadas à privacidade, entre em contato pelo e-mail suporte@ecossistema5estrelas.org.</p>

      <p className="text-sm mt-8">© 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</p>
    </section>
  );
}
