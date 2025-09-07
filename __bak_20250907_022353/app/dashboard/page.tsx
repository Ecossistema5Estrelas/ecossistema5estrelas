export default function Page(){
  const Card = ({title,value}:{title:string;value:string}) => (
    <div className='rounded-2xl p-4 ring-1 ring-white/15 bg-white/10'>
      <p className='text-sm opacity-80'>{title}</p>
      <p className='text-3xl font-bold mt-1'>{value}</p>
    </div>
  );
  return (
    <section className='space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card title='Leads (Zoho CRM)' value='0' />
        <Card title='Tickets (Zoho Desk)' value='0' />
        <Card title='Vendas (Loja)' value='R$ 0' />
        <Card title='Visitantes (SalesIQ)' value='0' />
      </div>
      <div className='rounded-2xl p-4 ring-1 ring-white/15 bg-white/10'>
        <p className='text-sm opacity-80'>Próximo passo: puxar dados via APIs/embeds.</p>
      </div>
    </section>
  );
}



