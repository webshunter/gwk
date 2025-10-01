import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'

// GET - Fetch single page
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const page = await client.fetch(`
      *[_type == "template" && _id == $id][0] {
        _id,
        title,
        slug,
        summary,
        sections[] {
          _type,
          _key,
          preTitle,
          title,
          subtitle,
          description,
          media {
            asset-> {
              _id,
              url
            }
          },
          mapImage {
            asset-> {
              _id,
              url
            }
          },
          markers[] {
            _key,
            number,
            title,
            description,
            image {
              asset-> {
                _id,
                url
              }
            },
            position,
            link
          },
          gallery[] {
            _key,
            title,
            description,
            image {
              asset-> {
                _id,
                url
              }
            },
            cta {
              label,
              link
            }
          },
          flyer {
            asset-> {
              _id,
              url
            }
          },
          items[] {
            _key,
            title,
            description,
            image {
              asset-> {
                _id,
                url
              }
            },
            cta {
              label,
              link
            }
          },
          mainImage {
            asset-> {
              _id,
              url
            }
          },
          mainVideo {
            asset-> {
              _id,
              url
            }
          },
          video {
            asset-> {
              _id,
              url
            }
          },
          cta,
          theme,
          features,
          testimonials
        },
        _createdAt,
        _updatedAt
      }
    `, { id })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}

// PATCH - Update page
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, slug, summary, sections } = body

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check if page exists
    const existingPage = await client.fetch(
      `*[_type == "template" && _id == $id][0]`,
      { id }
    )

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Slug boleh kosong (untuk homepage)
    // Check if slug already exists for a different page
    if (slug && slug.trim()) {
      const slugConflict = await client.fetch(
        `*[_type == "template" && slug.current == $slug && _id != $id][0]`,
        { slug, id }
      )

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A page with this slug already exists' },
          { status: 400 }
        )
      }
    } else {
      // Check if homepage already exists (untuk page lain)
      const homepageConflict = await client.fetch(
        `*[_type == "template" && slug.current == "" && _id != $id][0]`,
        { id }
      )

      if (homepageConflict) {
        return NextResponse.json(
          { error: 'Homepage already exists. Only one homepage allowed.' },
          { status: 400 }
        )
      }
    }


    // Format sections for Sanity
    const formattedSections = (sections || []).map((section: any) => {
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
          const formattedMarkers = (section.markers || []).map((marker: any) => {
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
          const formattedGallery = (section.gallery || []).map((item: any) => {
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
          const formattedItems = (section.items || []).map((item: any) => {
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
          const formattedContentItems2 = (section.items || []).map((item: any) => {
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

    // Update the page document
    const updatedPage = await writeClient
      .patch(id)
      .set({
        title,
        slug: {
          _type: 'slug',
          current: slug || '' // Slug kosong untuk homepage
        },
        summary: summary || '',
        sections: formattedSections
      })
      .commit()

    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

// DELETE - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if page exists
    const existingPage = await client.fetch(
      `*[_type == "template" && _id == $id][0]`,
      { id }
    )

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Delete the page document
    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}