// @types/modules.d.ts

// SANITY
declare module '@/sanity/lib/queries'
declare module '@/sanity/lib/image'
declare module '@/sanity/lib/clients'
declare module '@/sanity/lib/env'
declare module '@portabletext/react'

// LIB
declare module '@/lib/types'
declare module '@/lib/firebase'

// COMPONENTES
declare module '@/components/BotaoVoltar'
declare module '@/components/SocialShare'
declare module '@components/blog/FiltroCategoriaMultiplo'
declare module '@components/blog/PostCard'
declare module '@components/blog/PostList'
declare module '@components/blog/FiltroCategorias'

// OPÃ‡Ã•ES DE IMAGEM
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.webp'
declare module '*.svg'

// EVITA ERRO DE ALIAS GENÃ‰RICO
declare module '@/*'

// Corrige uso de namespaces incorretos
import type * as React from 'react'
type ReactNodeFix = React.ReactNode
type FCFix<Props = {}> = React.FC<Props>




