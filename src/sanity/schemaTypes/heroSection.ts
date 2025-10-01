import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre Title',
      type: 'string',
      description: 'Text kecil di atas title (contoh: "Welcome to")',
      placeholder: 'Welcome to',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Judul utama hero section',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Text di bawah title (contoh: "The Magnificent Masterpiece of Indonesia")',
      rows: 2,
    }),
    defineField({
      name: 'media',
      title: 'Hero Image / Video',
      type: 'image',
      description: 'Gambar background hero section',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      description: 'Tombol CTA di hero section',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          placeholder: 'Explore GWK',
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'url',
          placeholder: 'https://example.com',
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'dark',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'media',
    },
  },
})
