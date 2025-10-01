import { defineType, defineField } from 'sanity'

export const contentSection2 = defineType({
  name: 'contentSection2',
  title: 'Content Section 2',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 4,
      description: 'Deskripsi untuk bagian atas section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      description: 'Pilih jenis media yang akan ditampilkan.',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Upload gambar utama untuk section ini.',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'mainVideo',
      title: 'Main Video',
      type: 'file',
      description: 'Upload video utama untuk section ini.',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'items',
      title: 'Content Items',
      type: 'array',
      description: 'Daftar item yang berisi gambar, judul, dan tombol CTA.',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'cta',
              title: 'Call to Action',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Button Label',
                  type: 'string',
                  placeholder: 'Learn More',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Link URL',
                  type: 'string',
                  placeholder: '/example-page',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'No title',
                media: media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      description: 'description',
      items: 'items',
    },
    prepare({ description, items }) {
      const itemCount = items?.length || 0
      return {
        title: 'Content Section 2',
        subtitle: `${description?.substring(0, 50) || 'No description'}... (${itemCount} items)`,
      }
    },
  },
})
