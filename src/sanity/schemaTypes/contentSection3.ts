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
            },
            {
              name: 'textColor',
              title: 'Warna Text Link',
              type: 'string',
              options: {
                list: [
                  { title: 'Hitam', value: 'black' },
                  { title: 'Putih', value: 'white' },
                  { title: 'Abu-abu', value: 'gray' },
                  { title: 'Merah', value: 'red' },
                  { title: 'Orange', value: 'orange' },
                  { title: 'Kuning', value: 'yellow' },
                  { title: 'Hijau', value: 'green' },
                  { title: 'Teal', value: 'teal' },
                  { title: 'Biru', value: 'blue' },
                  { title: 'Indigo', value: 'indigo' },
                  { title: 'Ungu', value: 'purple' },
                  { title: 'Pink', value: 'pink' }
                ]
              },
              initialValue: 'black'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link',
              color: 'textColor'
            },
            prepare({ title, subtitle, color }) {
              return {
                title: title || 'Untitled Link',
                subtitle: `${subtitle} • ${color}`
              }
            }
          }
        }
      ]
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
