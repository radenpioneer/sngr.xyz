import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sngr.xyz',
  integrations: [react(), ...(process.env.KEYSTATIC ? [keystatic()] : [])],
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  experimental: {
    contentLayer: true
  }
})
