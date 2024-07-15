import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
const { KEYSTATIC } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: 'https://sngr.xyz',
  integrations: [
    react(),
    markdoc(),
    tailwind(),
    ...(KEYSTATIC ? [keystatic()] : [])
  ],
  output: 'hybrid',
  adapter: cloudflare()
})
