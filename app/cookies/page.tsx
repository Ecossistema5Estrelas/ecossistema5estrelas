export default function Cookies() {
  const hoje = new Date().toLocaleDateString("pt-BR");
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold">🍪 Política de Cookies</h1>
      <p className="mt-2 opacity-80">
        <strong>Última atualização:</strong> {hoje}
      </p>
      <div className="mt-6 space-y-3 opacity-90">
        <p>Usamos cookies para melhorar sua experiência e entender o uso do portal.</p>
        <p>Você pode gerenciar cookies nas configurações do seu navegador.</p>
      </div>
    </>
  );
}
