import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const bio = defineCollection({
  type: 'content_layer',
  loader: glob({ pattern: '**/*.md', base: 'src/data/bio' }),
  schema: ({ image }) =>
    z.object({
      image: image()
    })
})
