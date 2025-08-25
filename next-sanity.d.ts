// next-sanity.d.ts

declare module 'next-sanity' {
  import type { ClientConfig } from 'sanity'

  export const createClient: (config: ClientConfig) => any
  export const groq: (strings: TemplateStringsArray, ...placeholders: any[]) => string
}