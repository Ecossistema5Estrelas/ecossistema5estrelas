export default function Page() {
  const dados = {
    nome: 'Cezar Braga da Silva',
    email: 'contato@ecossistema5estrelas.org',
    genero: 'Masculino',
    pais: 'Brasil',
    idioma: 'pt-BR',
    fuso: '(GMT -03:00) America/Bahia',
    telefones: ['+55 61 99564-8045'],
    emails: ['contato@ecossistema5estrelas.org','bragadasilvacezar@gmail.com'],
  };
  return (
    <section className='max-w-3xl space-y-6'>
      <h1 className='text-3xl font-bold'>Perfil</h1>
      <div className='rounded-2xl p-4 ring-1 ring-white/15 bg-white/10 space-y-3'>
        <p><b>Nome completo</b><br/>{dados.nome}</p>
        <p><b>E-mail principal</b><br/>{dados.email}</p>
        <p><b>Gênero</b><br/>{dados.genero}</p>
        <p><b>País/Região</b><br/>{dados.pais}</p>
        <p><b>Idioma</b><br/>{dados.idioma}</p>
        <p><b>Fuso horário</b><br/>{dados.fuso}</p>
        <p><b>Meus e-mails</b><br/>{dados.emails.join(', ')}</p>
        <p><b>Meus celulares</b><br/>{dados.telefones.join(', ')}</p>
      </div>
    </section>
  );
}



