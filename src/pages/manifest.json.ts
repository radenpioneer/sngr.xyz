import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'

const site = await getEntry('site', 'site')

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      name: site.data.title,
      short_name: site.data.title,
      description: site.data.description,
      theme_color: '#ffffff',
      start_url: '/',
      display: 'browser',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }),
    {
      headers: {
        'Content-Type': 'application/manifest+json'
      }
    }
  )
}

export const prerender = true
