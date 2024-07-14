import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local'
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/'
            }
          }
        })
      }
    })
  },
  singletons: {
    site: singleton({
      label: 'Site',
      path: 'src/content/site/site',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({
          label: 'Description',
          multiline: true
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true
        })
      }
    })
  }
})
