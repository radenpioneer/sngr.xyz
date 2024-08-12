import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import icons from 'unplugin-icons/vite'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sngr.xyz',
  integrations: [react(), ...(process.env.KEYSTATIC ? [keystatic()] : [])],
  output: 'hybrid',
  adapter: cloudflare(),
  vite: {
    plugins: [icons({ compiler: 'jsx', jsx: 'react' }), tailwindcss()]
  },
  experimental: {
    contentCollectionCache: true,
    directRenderScript: true
  }
})
