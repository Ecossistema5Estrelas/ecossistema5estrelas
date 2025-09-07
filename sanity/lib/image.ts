// @ts-nocheck
import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './env'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Constrói o builder com ID e dataset do projeto
const builder = imageUrlBuilder({
  projectId: projectId!,
  dataset: dataset!,
})

// Função exportável para uso em componentes
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
