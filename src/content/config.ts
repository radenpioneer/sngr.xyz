import { defineCollection, z } from 'astro:content'

export const collections = {
  project: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string().max(64),
        description: z.string().max(160).optional(),
        deployedAt: z.date().optional(),
        url: z.string().url().optional(),
        repo: z.string().url().optional(),
        status: z.enum(['concept', 'online', 'archived', 'rejected']),
        technologies: z
          .array(
            z.object({
              name: z.string(),
              slug: z.string()
            })
          )
          .optional(),
        image: image(),
        screenshots: z.array(image()).optional()
      })
  }),

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

  menu: defineCollection({
    type: 'data',
    schema: () =>
      z.object({
        items: z.array(
          z.object({
            label: z.string().max(64),
            path: z.string()
          })
        )
      })
  }),

  liner: defineCollection({
    type: 'data',
    schema: () =>
      z.object({
        liners: z.array(z.string())
      })
  })
}
