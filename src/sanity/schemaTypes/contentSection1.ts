import { defineType, defineField } from 'sanity'

export const contentSection1 = defineType({
  name: 'contentSection1',
  title: 'Content Section 1',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      description: 'Deskripsi bagian atas section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Section Video',
      type: 'file',
      description: 'Video untuk section (optional)',
      options: {
        accept: 'video/*'
      },
    }),
    defineField({
      name: 'items',
      title: 'Content Items',
      type: 'array',
      description: 'Daftar content items (gambar, title, deskripsi)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Gambar untuk content item',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Judul content item',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Deskripsi content item',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              subtitle: 'description',
            },
          },
        },
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
        title: 'Content Section 1',
        subtitle: `${description?.substring(0, 50)}... (${itemCount} items)`,
      }
    },
  },
})
