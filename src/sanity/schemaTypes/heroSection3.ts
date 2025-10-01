import {defineArrayMember, defineField, defineType} from 'sanity'

export const heroSection3 = defineType({
  name: 'heroSection3',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre Title',
      type: 'string',
      description: 'Teks kecil di atas judul utama',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      description: 'Deskripsi di bawah judul utama',
    }),
    defineField({
      name: 'media',
      title: 'Background Media',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
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
        }),
        defineField({
          name: 'href',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'media',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'No subtitle',
        media: media,
      }
    },
  },
})
