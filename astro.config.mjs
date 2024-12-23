import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import pwa from '@vite-pwa/astro'
import keystatic from '@keystatic/astro'
import icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sngr.xyz',
  integrations: [
    react(),
    tailwind(),
    pwa({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        maximumFileSizeToCacheInBytes: 3145728
      }
    }),
    ...(process.env.KEYSTATIC ? [keystatic()] : [])
  ],
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  image: {
    domains: ['astro.badg.es']
  },
  vite: {
    plugins: [icons({ compiler: 'jsx', jsx: 'react' })]
  },
  experimental: {
    contentLayer: true,
    serverIslands: true
  }
})
