import {defineField, defineType} from 'sanity'

export const mapSection = defineType({
  name: 'mapSection',
  title: 'Map Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Judul section (e.g., "Cultural Park")',
      placeholder: 'Cultural Park',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Deskripsi section',
      placeholder: 'Discover the cultural heart of Bali...',
    }),
    defineField({
      name: 'mapImage',
      title: 'Map Background Image',
      type: 'image',
      description: 'Gambar map sebagai background',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'markers',
      title: 'Map Markers / Pointers',
      type: 'array',
      description: 'Daftar marker/pointer pada map',
      of: [
        {
          type: 'object',
          name: 'marker',
          title: 'Marker',
          fields: [
            defineField({
              name: 'number',
              title: 'Marker Number',
              type: 'string',
              description: 'Nomor marker (e.g., "01", "02")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Location Title',
              type: 'string',
              description: 'Nama lokasi',
              placeholder: 'Plaza Kura-Kura',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Deskripsi lokasi yang muncul di popup',
            }),
            defineField({
              name: 'image',
              title: 'Location Image',
              type: 'image',
              description: 'Gambar lokasi yang muncul di popup',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'position',
              title: 'Position on Map',
              type: 'object',
              description: 'Posisi marker pada map (CSS position)',
              fields: [
                defineField({
                  name: 'top',
                  title: 'Top (px)',
                  type: 'number',
                  description: 'Jarak dari atas dalam pixel',
                  initialValue: 0,
                }),
                defineField({
                  name: 'right',
                  title: 'Right (px)',
                  type: 'number',
                  description: 'Jarak dari kanan dalam pixel',
                  initialValue: 0,
                }),
              ],
            }),
            defineField({
              name: 'link',
              title: 'Detail Link',
              type: 'string',
              description: 'Link untuk "SEE DETAILS" button (optional)',
              placeholder: '/facility/plaza-kura-kura',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              number: 'number',
              media: 'image',
            },
            prepare({title, number, media}) {
              return {
                title: `${number}. ${title}`,
                media: media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mapImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Map Section',
        subtitle: 'Interactive Map dengan Markers',
        media: media,
      }
    },
  },
})