import {defineField, defineType} from 'sanity'

export const activitySection = defineType({
  name: 'activitySection',
  title: 'Activity Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Judul section (e.g., "Activities")',
      placeholder: 'Activities',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Deskripsi section',
      placeholder: 'Explore the Cultural Richness of Bali at GWK',
    }),
    defineField({
      name: 'gallery',
      title: 'Activity Gallery',
      type: 'array',
      description: 'Daftar aktivitas dalam gallery',
      of: [
        {
          type: 'object',
          name: 'activityItem',
          title: 'Activity Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Activity Title',
              type: 'string',
              description: 'Nama aktivitas',
              placeholder: 'Top of The Statue Tour',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Activity Image',
              type: 'image',
              description: 'Gambar aktivitas',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Activity Description',
              type: 'text',
              rows: 2,
              description: 'Deskripsi singkat aktivitas (optional)',
            }),
            defineField({
              name: 'cta',
              title: 'Call to Action',
              type: 'object',
              description: 'Tombol CTA untuk activity (optional)',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Button Label',
                  type: 'string',
                  placeholder: 'Learn More',
                }),
                defineField({
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  placeholder: '/activity/statue-tour',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              subtitle: 'description',
            },
            prepare({title, media, subtitle}) {
              return {
                title: title || 'Untitled Activity',
                subtitle: subtitle || 'No description',
                media: media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'flyer',
      title: 'Flyer / Banner Image',
      type: 'image',
      description: 'Gambar banner/flyer di bagian bawah',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      galleryCount: 'gallery.length',
      flyer: 'flyer',
    },
    prepare({title, galleryCount, flyer}) {
      return {
        title: title || 'Activity Section',
        subtitle: `${galleryCount || 0} activities`,
        media: flyer,
      }
    },
  },
})