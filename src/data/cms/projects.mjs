// @ts-check
import { fields, collection } from '@keystatic/core'

export const projects = collection({
  label: 'Projects',
  path: 'src/data/projects/*',
  slugField: 'title',
  format: 'json',
  schema: {
    title: fields.slug({
      name: {
        label: 'Title',
        validation: {
          isRequired: true,
          length: {
            max: 64
          }
        }
      }
    }),
    description: fields.text({
      label: 'Description',
      validation: {
        length: {
          max: 160
        }
      }
    }),
    image: fields.image({
      label: 'Image',
      directory: 'src/assets/projects',
      publicPath: '~/assets/projects'
    }),
    date: fields.date({
      label: 'Project Date',
      defaultValue: {
        kind: 'today'
      },
      validation: {
        isRequired: false
      }
    }),
    status: fields.select({
      label: 'Project Status',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'On Progress', value: 'progress' },
        { label: 'Concept', value: 'concept' },
        { label: 'Rejected', value: 'rejected' }
      ],
      defaultValue: 'live'
    }),
    madeFor: fields.text({
      label: 'Made For',
      validation: {
        length: {
          max: 160
        }
      }
    }),
    builtWith: fields.array(
      fields.slug({
        name: {
          label: 'Framework or Tool',
          validation: {
            length: {
              max: 160
            }
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
        url: fields.url({
          label: 'URL'
        }),
        category: fields.select({
          label: 'Link Category',
          options: [
            { label: 'Live Url', value: 'live' },
            { label: 'Github Repository', value: 'github' }
          ],
          defaultValue: 'live'
        })
      }),
      {
        label: 'URLs of the project',
        itemLabel: (props) => props.fields.category.value
      }
    )
  }
})
