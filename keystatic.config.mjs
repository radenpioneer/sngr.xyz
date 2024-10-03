// @ts-check
import { config } from '@keystatic/core'
import { site } from '~/data/cms/site.mjs'
import { projects } from '~/data/cms/projects.mjs'

export default config({
  storage: {
    kind: 'local'
  },

  collections: {
    projects
  },

  singletons: {
    site
  }
})
