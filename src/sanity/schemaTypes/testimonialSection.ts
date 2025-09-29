import {defineField, defineType} from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Company',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'author', subtitle: 'quote'},
          },
        },
      ],
      validation: (rule) => rule.min(1).warning('Add at least one testimonial'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'testimonials.0.author',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Testimonial Section',
        subtitle: subtitle ? `First testimonial: ${subtitle}` : 'Testimonials',
      }
    },
  },
})
