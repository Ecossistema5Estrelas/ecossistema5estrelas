// /lib/appsDisponiveis.ts

// 🔐 Define os apps visíveis (true) ou ocultos (false)
export const appsDisponiveis = {
  BELEZA5ESTRELAS: false,
  MECANICA5ESTRELAS: false,
  MODA5ESTRELAS: false,
  PET5ESTRELAS: false, // 🔧 Corrigido aqui (era PETS5ESTRELAS)
  EDUCA5ESTRELAS: false, // 🔧 Corrigido aqui (era EDUCACAO5ESTRELAS)
  SAUDE5ESTRELAS: false,
  BLOG: true,
  DASHBOARD: true,
  CONTATO: true,
  SOBRE: true,
} as const

// 🔠 Tipo automático com as chaves possíveis
export type AppChave = keyof typeof appsDisponiveis

// 📦 Metadados de cada app (nome, emoji, link etc.)
export const appsMeta: {
  chave: AppChave
  titulo: string
  descricao: string
  emoji: string
  href: string
}[] = [
  {
    chave: 'BELEZA5ESTRELAS',
    titulo: 'BELEZA5ESTRELAS',
    descricao: 'Salões, estética, cuidados pessoais e muito mais com agendamento inteligente.',
    emoji: '💇‍♀️',
    href: '/app/beleza',
  },
  {
    chave: 'MECANICA5ESTRELAS',
    titulo: 'MECÂNICA5ESTRELAS',
    descricao: 'Oficinas e serviços automotivos com transparência, agilidade e avaliações reais.',
    emoji: '🔧',
    href: '/app/mecanica',
  },
  {
    chave: 'MODA5ESTRELAS',
    titulo: 'MODA5ESTRELAS',
    descricao: 'Explore lojas, brechós, estilistas e tendências com impacto positivo.',
    emoji: '👗',
    href: '/app/moda',
  },
  {
    chave: 'PET5ESTRELAS',
    titulo: 'PET5ESTRELAS',
    descricao: 'Veterinários, banho e tosa, e tudo que seu pet precisa em um só lugar!',
    emoji: '🐶',
    href: '/app/pet',
  },
  {
    chave: 'EDUCA5ESTRELAS',
    titulo: 'EDUCA5ESTRELAS',
    descricao: 'Educação interativa, professores IA e conteúdos para todas as idades.',
    emoji: '🎓',
    href: '/app/educa',
  },
  {
    chave: 'SAUDE5ESTRELAS',
    titulo: 'SAÚDE5ESTRELAS',
    descricao: 'Cuidados médicos, terapias, IA de saúde emocional e muito mais.',
    emoji: '🩺',
    href: '/app/saude',
  },
]