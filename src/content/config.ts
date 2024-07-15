import { defineCollection, z } from 'astro:content'

export const collections = {
  site: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        logo: image(),
        icon: z.string().optional()
      })
  })
}
