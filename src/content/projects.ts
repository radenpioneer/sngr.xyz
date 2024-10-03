import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const projects = defineCollection({
  type: 'content_layer',
  loader: glob({ pattern: '**/*.json', base: 'src/data/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(64),
      description: z.string().max(160).optional(),
      image: image().optional(),
      date: z.coerce.date(),
      status: z.enum(['live', 'progress', 'concept', 'rejected']),
      madeFor: z.string().max(160).optional(),
      builtWith: z
        .array(
          z.object({
            name: z.string().max(160),
            slug: z.string().max(160)
          })
        )
        .optional(),
      links: z
        .array(
          z.object({
            url: z.string().url(),
            category: z.enum(['live', 'github'])
          })
        )
        .optional()
    })
})
