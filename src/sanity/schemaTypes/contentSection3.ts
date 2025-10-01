import { defineField, defineType } from 'sanity'

export const contentSection3 = defineType({
  name: 'contentSection3',
  title: 'Content Section 3',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaLinks',
      title: 'CTA Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nama Link',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'textColor',
      title: 'Warna Text Link',
      type: 'string',
      options: {
        list: [
          { title: 'Hitam', value: 'black' },
          { title: 'Putih', value: 'white' },
          { title: 'Abu-abu', value: 'gray' },
          { title: 'Ungu', value: 'purple' },
          { title: 'Biru', value: 'blue' }
        ]
      },
      initialValue: 'black'
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Foto',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'title',
              title: 'Nama/Title Foto',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Content Section 3',
        subtitle: 'Content Section 3'
      }
    }
  }
})
