import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './env'

const builder = imageUrlBuilder({
  projectId,
  dataset,
})

export function urlForImage(source: unknown) {
  return builder.image(source as any)
}
