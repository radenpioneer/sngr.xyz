import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sngr.xyz',
  integrations: [react(), ...(process.env.KEYSTATIC ? [keystatic()] : [])],
  output: 'hybrid',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()]
  }
})
