// @ts-check
import { config, fields, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local'
  },

  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'src/data/site/site',
      format: 'json',
      schema: {
        title: fields.text({
          label: 'Site Name',
          validation: {
            length: {
              max: 64
            }
          }
        }),
        description: fields.text({
          label: 'Site Description',
          validation: {
            length: {
              max: 160
            }
          }
        })
      }
    })
  }
})
