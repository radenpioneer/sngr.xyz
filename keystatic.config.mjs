// @ts-check
import { config } from '@keystatic/core'
import { site } from '~/data/cms/site.mjs'

export default config({
  storage: {
    kind: 'local'
  },

  singletons: {
    site
  }
})
