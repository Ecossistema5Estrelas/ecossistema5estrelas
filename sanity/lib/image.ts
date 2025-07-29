import imageUrlBuilder from '@sanity/image-url'
import { client } from './clients'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Constrói URLs de imagens com base no cliente Sanity já configurado
const builder = imageUrlBuilder(client)

// Função para uso em componentes do tipo PortableText (ex: imagens, galeria)
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
