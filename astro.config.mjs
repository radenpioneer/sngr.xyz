import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import icons from 'unplugin-icons/vite'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sngr.xyz',
  integrations: [react(), keystatic()],
  output: 'hybrid',
  adapter: cloudflare(),
  vite: {
    plugins: [icons({ compiler: 'jsx', jsx: 'react' }), tailwindcss()],
    define: {
      'process.env': process.env
    }
  },
  experimental: {
    contentCollectionCache: true,
    directRenderScript: true
  }
})
