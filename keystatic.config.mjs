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
      columns: ['title', 'dateCompleted'],
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
        status: fields.select({
          label: 'Project Status',
          options: [
            { label: 'Completed', value: 'completed' },
            { label: 'Archived', value: 'archived' },
            { label: 'In-Progress', value: 'in-progress' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Concept', value: 'concept' }
          ],
          defaultValue: 'completed'
        }),
        madeFor: fields.text({
          label: 'Made for'
        }),
        featured: fields.checkbox({
          label: 'Featured Project'
        }),
        page: fields.checkbox({
          label: 'Project Page',
          defaultValue: false
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
        logo: fields.image({
          label: 'Project Logo',
          directory: 'src/assets/projects',
          publicPath: '~/assets/projects'
        }),
        image: fields.image({
          label: 'Project Image',
          directory: 'src/assets/projects',
          publicPath: '~/assets/projects'
        }),
        content: fields.mdx({
          label: 'Project Long Description',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/projects',
              publicPath: '~/assets/projects'
            }
          }
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
        }),
        repo: fields.url({
          label: "Site's Repository URL"
        })
      }
    }),

    author: singleton({
      label: "Author's Bio",
      path: 'src/data/bio/bio',
      format: {
        contentField: 'content'
      },
      entryLayout: 'content',
      schema: {
        image: fields.image({
          label: 'Image',
          directory: 'src/assets/bio',
          publicPath: '~/assets/bio',
          validation: {
            isRequired: true
          }
        }),
        content: fields.mdx({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/bio',
              publicPath: '~/assets/bio'
            }
          }
        })
      }
    })
  }
})
