// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'

// GET - Fetch all pages
export async function GET() {
  try {
    const pages = await client.fetch(`
      *[_type == "template"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        summary,
        sections,
        content,
        _createdAt,
        _updatedAt
      }
    `)

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

// POST - Create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, summary, sections } = body

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Slug boleh kosong (untuk homepage)
    // Jika slug ada, check apakah sudah exists
    if (slug && slug.trim()) {
      const existingPage = await client.fetch(
        `*[_type == "template" && slug.current == $slug][0]`,
        { slug }
      )

      if (existingPage) {
        return NextResponse.json(
          { error: 'A page with this slug already exists' },
          { status: 400 }
        )
      }
    } else {
      // Check if homepage already exists (slug kosong)
      const existingHomepage = await client.fetch(
        `*[_type == "template" && slug.current == ""][0]`
      )

      if (existingHomepage) {
        return NextResponse.json(
          { error: 'Homepage already exists. Only one homepage allowed.' },
          { status: 400 }
        )
      }
    }


    // Format sections for Sanity
    const formattedSections = (sections || []).map((section: unknown) => {
      const baseSection = {
        _type: section._type,
        _key: section._id || Math.random().toString(36).substring(2, 11)
      }

      // Handle different section types
      switch (section._type) {
        case 'heroSection':
        case 'heroSection3':
          // Format media untuk Sanity
          let formattedMedia = null
          if (section.media) {
            // Jika sudah ada asset._ref (dari upload baru atau sudah valid)
            if (section.media.asset?._ref) {
              formattedMedia = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.media.asset._ref
                }
              }
            }
            // Jika ada asset._id (dari fetch Sanity), convert ke _ref
            else if (section.media.asset?._id) {
              formattedMedia = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.media.asset._id
                }
              }
            }
          }
          
          return {
            ...baseSection,
            preTitle: section.preTitle || '',
            title: section.title || '',
            subtitle: section.subtitle || '',
            media: formattedMedia,
            cta: section.cta ? {
              _type: 'object',
              label: section.cta.label || '',
              href: section.cta.href || ''
            } : null,
            theme: section.theme || 'dark'
          }
        case 'featureSection':
          return {
            ...baseSection,
            title: section.title || '',
            subtitle: section.subtitle || '',
            features: section.features || []
          }
        case 'testimonialSection':
          return {
            ...baseSection,
            title: section.title || '',
            subtitle: section.subtitle || '',
            testimonials: section.testimonials || []
          }
        case 'mapSection':
          // Format mapImage untuk Sanity
          let formattedMapImage = null
          if (section.mapImage) {
            if (section.mapImage.asset?._ref) {
              formattedMapImage = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.mapImage.asset._ref
                }
              }
            } else if (section.mapImage.asset?._id) {
              formattedMapImage = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.mapImage.asset._id
                }
              }
            }
          }

          // Format markers
          const formattedMarkers = (section.markers || []).map((marker: unknown) => {
            let markerImage = null
            if (marker.image) {
              if (marker.image.asset?._ref) {
                markerImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: marker.image.asset._ref
                  }
                }
              } else if (marker.image.asset?._id) {
                markerImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: marker.image.asset._id
                  }
                }
              }
            }

            return {
              _key: marker._key || Math.random().toString(36).substring(2, 11),
              number: marker.number || '',
              title: marker.title || '',
              description: marker.description || '',
              image: markerImage,
              position: {
                top: marker.position?.top || 0,
                right: marker.position?.right || 0
              },
              link: marker.link || ''
            }
          })

          return {
            ...baseSection,
            title: section.title || '',
            description: section.description || '',
            mapImage: formattedMapImage,
            markers: formattedMarkers
          }
        case 'activitySection':
          // Format flyer image
          let formattedFlyer = null
          if (section.flyer) {
            if (section.flyer.asset?._ref) {
              formattedFlyer = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.flyer.asset._ref
                }
              }
            } else if (section.flyer.asset?._id) {
              formattedFlyer = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: section.flyer.asset._id
                }
              }
            }
          }

          // Format gallery items
          const formattedGallery = (section.gallery || []).map((item: unknown) => {
            let itemImage = null
            if (item.image) {
              if (item.image.asset?._ref) {
                itemImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: item.image.asset._ref
                  }
                }
              } else if (item.image.asset?._id) {
                itemImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: item.image.asset._id
                  }
                }
              }
            }

            return {
              _key: item._key || Math.random().toString(36).substring(2, 11),
              title: item.title || '',
              description: item.description || '',
              image: itemImage,
              cta: item.cta ? {
                label: item.cta.label || '',
                href: item.cta.href || ''
              } : null
            }
          })

          return {
            ...baseSection,
            title: section.title || '',
            description: section.description || '',
            gallery: formattedGallery,
            flyer: formattedFlyer
          }
        case 'contentSection1':
          // Format video
          let formattedVideo = null
          if (section.video) {
            if (section.video.asset?._ref) {
              formattedVideo = {
                _type: 'file',
                asset: {
                  _type: 'reference',
                  _ref: section.video.asset._ref
                }
              }
            } else if (section.video.asset?._id) {
              formattedVideo = {
                _type: 'file',
                asset: {
                  _type: 'reference',
                  _ref: section.video.asset._id
                }
              }
            }
          }

          // Format content items
          const formattedItems = (section.items || []).map((item: unknown) => {
            let itemImage = null
            if (item.image) {
              if (item.image.asset?._ref) {
                itemImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: item.image.asset._ref
                  }
                }
              } else if (item.image.asset?._id) {
                itemImage = {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: item.image.asset._id
                  }
                }
              }
            }

            return {
              _key: item._key || Math.random().toString(36).substring(2, 11),
              title: item.title || '',
              description: item.description || '',
              image: itemImage
            }
          })

          return {
            ...baseSection,
            description: section.description || '',
            video: formattedVideo,
            items: formattedItems
          }
        case 'contentSection2':
          // Format mainImage
          let formattedMainImage = null
          if (section.mainImage?.asset?._ref) {
            formattedMainImage = { _type: 'image', asset: { _type: 'reference', _ref: section.mainImage.asset._ref } }
          } else if (section.mainImage?.asset?._id) {
            formattedMainImage = { _type: 'image', asset: { _type: 'reference', _ref: section.mainImage.asset._id } }
          }

          // Format mainVideo
          let formattedMainVideo = null
          if (section.mainVideo?.asset?._ref) {
            formattedMainVideo = { _type: 'file', asset: { _type: 'reference', _ref: section.mainVideo.asset._ref } }
          } else if (section.mainVideo?.asset?._id) {
            formattedMainVideo = { _type: 'file', asset: { _type: 'reference', _ref: section.mainVideo.asset._id } }
          }

          // Format items
          const formattedContentItems2 = (section.items || []).map((item: unknown) => {
            let itemImage = null
            if (item.image?.asset?._ref) {
              itemImage = { _type: 'image', asset: { _type: 'reference', _ref: item.image.asset._ref } }
            } else if (item.image?.asset?._id) {
              itemImage = { _type: 'image', asset: { _type: 'reference', _ref: item.image.asset._id } }
            }

            return {
              _key: item._key || Math.random().toString(36).substring(2, 11),
              title: item.title || '',
              image: itemImage,
              cta: item.cta ? {
                _type: 'object',
                label: item.cta.label || '',
                link: item.cta.link || ''
              } : null,
            }
          })

          return {
            ...baseSection,
            description: section.description || '',
            mainImage: formattedMainImage,
            mainVideo: formattedMainVideo,
            items: formattedContentItems2,
          }
        default:
          return baseSection
      }
    })

    // Create the page document
    const page = await writeClient.create({
      _type: 'template',
      title,
      slug: {
        _type: 'slug',
        current: slug || '' // Slug kosong untuk homepage
      },
      summary: summary || '',
      sections: formattedSections
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}