import {defineArrayMember, defineField, defineType} from 'sanity'

import SectionsInput from '../components/SectionsInput'

export const template = defineType({
  name: 'template',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Tambahkan modul halaman di sini, lalu susun ulang dengan drag-and-drop.',
      components: {
        input: SectionsInput,
      },
      of: [
        defineArrayMember({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'heroSection',
        }),
        defineArrayMember({
          name: 'featureSection',
          title: 'Feature Section',
          type: 'featureSection',
        }),
        defineArrayMember({
          name: 'testimonialSection',
          title: 'Testimonial Section',
          type: 'testimonialSection',
        }),
      ],
      validation: (rule) => rule.min(1).warning('Sebaiknya tambahkan minimal satu modul.'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
