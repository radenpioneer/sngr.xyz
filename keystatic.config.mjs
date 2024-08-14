import { config, singleton, collection, fields } from '@keystatic/core'

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'radenpioneer/sngr.xyz'
      },

  collections: {
    project: collection({
      label: 'Project',
      format: {
        contentField: 'body'
      },
      path: './src/content/project/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Project Name',
            validation: { isRequired: true, length: { max: 64 } }
          },
          slug: {
            title: 'Permalink'
          }
        }),
        description: fields.text({
          label: 'Description',
          description:
            'Short description for the project, will be used for meta description.',
          multiline: true,
          validation: { length: { max: 160 } }
        }),
        status: fields.select({
          label: 'Project Status',
          description: "Project's current status on the web.",
          options: [
            {
              label: 'Concept',
              value: 'concept'
            },
            {
              label: 'Online',
              value: 'online'
            },
            {
              label: 'Archived',
              value: 'archived'
            },
            {
              label: 'Rejected',
              value: 'rejected'
            }
          ],
          defaultValue: 'concept'
        }),
        image: fields.image({
          label: 'Featured Image',
          description:
            'Featured image of the project. Shown in project header. Required.',
          directory: './src/assets/project',
          publicPath: '~/assets/project',
          schema: true,
          validation: {
            isRequired: true
          }
        }),
        screenshots: fields.array(
          fields.image({
            label: 'Add Screenshot',
            description: 'Add a screenshot image',
            directory: './src/assets/project',
            publicPath: '~/assets/project'
          }),
          {
            label: 'Screenshots',
            description: 'Project screenshots.'
          }
        ),
        body: fields.mdx({
          extension: 'md',
          label: 'Content',
          description:
            'Long description of the project. Will be shown as article. Images welcome.',
          options: {
            image: {
              directory: './src/assets/project',
              publicPath: '~/assets/project',
              schema: true
            }
          }
        })
      }
    })
  },

  singletons: {
    site: singleton({
      label: 'Site',
      format: 'json',
      path: './src/content/site/site',
      schema: {
        name: fields.text({
          label: 'Site Name',
          validation: { isRequired: true, length: { max: 64 } }
        }),
        description: fields.text({
          label: 'Site Description',
          description: 'Used for default meta description.',
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } }
        }),
        logo: fields.image({
          label: 'Logo',
          directory: './src/assets/site',
          publicPath: '~/assets/site',
          validation: {
            isRequired: true
          }
        }),
        icon: fields.image({
          label: 'Icon',
          description:
            'Used for favicons and other application-icon uses. Use SVG if applicable!',
          directory: './public',
          publicPath: '',
          validation: {
            isRequired: true
          }
        }),
        $schema: fields.ignored()
      }
    }),

    menu: singleton({
      label: 'Menu',
      format: 'json',
      path: './src/content/menu/menu',
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true, length: { max: 64 } }
            }),
            path: fields.text({
              label: 'Path',
              description: 'Full URL or path to the page.',
              validation: { isRequired: true }
            })
          }),
          {
            label: 'Menu Items',
            description: 'Menu items.',
            itemLabel: (props) => props.fields.label.value
          }
        ),
        $schema: fields.ignored()
      }
    }),

    liner: singleton({
      label: 'Liner',
      format: 'json',
      path: './src/content/liner/liner',
      schema: {
        liners: fields.array(
          fields.text({
            label: 'Line',
            validation: { isRequired: true }
          }),
          {
            label: 'Liners',
            description: 'Liner texts to display in homepage.',
            itemLabel: (props) => props.value
          }
        ),
        $schema: fields.ignored()
      }
    })
  }
})
