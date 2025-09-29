import {defineField, defineType} from 'sanity'

export const featureSection = defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      validation: (rule) => rule.min(1).warning('Add at least one feature item'),
      of: [
        {
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'icon',
              title: 'Icon / Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'body'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'features.0.heading',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Feature Section',
        subtitle: subtitle ? `First feature: ${subtitle}` : 'Feature grid',
      }
    },
  },
})
