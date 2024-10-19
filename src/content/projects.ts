import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const projects = defineCollection({
  type: 'content_layer',
  loader: glob({ pattern: '**/*.json', base: 'src/data/projects' }),
  schema: z.object({
    title: z.string().max(160),
    description: z.string().max(160).optional(),
    dateCompleted: z.coerce.date().optional(),
    madeAt: z.string().optional(),
    builtWith: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string()
        })
      )
      .optional(),
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          type: z.enum(['public-url', 'repository'])
        })
      )
      .optional()
  })
})
