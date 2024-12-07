import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const projects = defineCollection({
  type: 'content_layer',
  loader: glob({ pattern: '**/*.md', base: 'src/data/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(160),
      description: z.string().max(160).optional(),
      dateCompleted: z.coerce.date().optional(),
      status: z.enum([
        'completed',
        'archived',
        'in-progress',
        'rejected',
        'concept'
      ]),
      madeFor: z.string().optional(),
      featured: z.boolean().optional(),
      page: z.boolean().optional(),
      draft: z.boolean().optional(),
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
        .optional(),
      logo: image().optional(),
      image: image().optional()
    })
})
