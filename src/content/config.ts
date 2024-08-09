import { defineCollection, z } from 'astro:content'

export const collections = {
  site: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        name: z.string().max(64),
        description: z.string().max(160),
        logo: image(),
        icon: z.string()
      })
  }),

  project: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string().max(64),
        description: z.string().max(160).optional(),
        status: z.enum(['concept', 'online', 'archived', 'rejected']),
        image: image(),
        screenshots: z.array(image()).optional()
      })
  })
}
