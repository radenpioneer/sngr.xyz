// @ts-check
import { config, fields, singleton, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local'
  },

  collections: {
    project: collection({
      label: 'Projects',
      path: 'src/data/projects/*',
      slugField: 'title',
      format: {
        contentField: 'content'
      },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Project Title',
            validation: {
              isRequired: true,
              length: {
                max: 160
              }
            }
          },
          slug: {
            label: 'Permalink'
          }
        }),
        description: fields.text({
          label: 'Project Description',
          multiline: true,
          validation: {
            length: {
              max: 160
            }
          }
        }),
        dateCompleted: fields.date({
          label: 'Date Completed'
        }),
        madeAt: fields.text({
          label: 'Made at'
        }),
        builtWith: fields.array(
          fields.slug({
            name: {
              label: 'Technology',
              validation: {
                isRequired: true
              }
            }
          }),
          {
            label: 'Built With',
            itemLabel: (props) => props.value.name
          }
        ),
        links: fields.array(
          fields.object({
            title: fields.text({
              label: 'Title',
              validation: {
                isRequired: true
              }
            }),
            url: fields.url({
              label: 'URL',
              validation: {
                isRequired: true
              }
            }),
            type: fields.select({
              label: 'Link Type',
              options: [
                { label: 'Public URL', value: 'public-url' },
                { label: 'Repository', value: 'repository' }
              ],
              defaultValue: 'public-url'
            })
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.title.value
          }
        ),
        content: fields.mdx({
          label: 'Project Long Description',
          extension: 'md'
        })
      }
    })
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
            isRequired: true,
            length: {
              max: 64
            }
          }
        }),
        description: fields.text({
          label: 'Site Description',
          multiline: true,
          validation: {
            isRequired: true,
            length: {
              max: 160
            }
          }
        }),
        logo: fields.image({
          label: 'Site Logo',
          directory: 'src/assets/site',
          publicPath: '~/assets/site',
          validation: {
            isRequired: true
          }
        }),
        favicon: fields.image({
          label: 'Site Icon',
          directory: 'public',
          publicPath: '',
          validation: {
            isRequired: true
          }
        })
      }
    })
  }
})
