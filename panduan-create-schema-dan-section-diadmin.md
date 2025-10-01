# 📘 Panduan Lengkap: Membuat Schema & Section Baru di Admin

Dokumen ini adalah panduan step-by-step untuk membuat section baru di GWK Admin Panel, menggunakan **Map Section** dan **Activity Section** sebagai contoh.

---

## 📋 Table of Contents

1. [Analisis Component Frontend](#1-analisis-component-frontend)
2. [Membuat Sanity Schema](#2-membuat-sanity-schema)
3. [Register Schema](#3-register-schema)
4. [Membuat Type Definition](#4-membuat-type-definition)
5. [Tambahkan ke Section Editor](#5-tambahkan-ke-section-editor)
6. [Tambahkan ke Section Selector](#6-tambahkan-to-section-selector)
7. [Update Section Builder](#7-update-section-builder)
8. [Update API Routes](#8-update-api-routes)
9. [Tambahkan CSS Styling](#9-tambahkan-css-styling)
10. [Testing](#10-testing)

---

## 1. Analisis Component Frontend

**Tujuan:** Memahami kebutuhan data dari component yang sudah ada.

### Contoh: Map Section

**File:** `src/components/pages/homepage/CulturePark.tsx`

**Data yang dibutuhkan:**
```typescript
{
  title: "Cultural Park",
  description: "Discover the cultural heart...",
  mapImage: "/images/homepage/map-gwk.png",
  markers: [
    {
      number: "01",
      title: "Plaza Kura-Kura",
      description: "Lorem ipsum...",
      image: "/images/homepage/image.png",
      position: { top: 222, right: 462 },
      link: "/facility/plaza"
    }
  ]
}
```

### Contoh: Activity Section

**File:** `src/components/pages/homepage/Activities.tsx`

**Data yang dibutuhkan:**
```typescript
{
  title: "Activities",
  description: "Explore the Cultural Richness...",
  gallery: [
    {
      title: "Top of The Statue Tour",
      image: "/images/homepage/activities/image-1.png"
    }
  ],
  flyer: "/images/homepage/banner.png"
}
```

---

## 2. Membuat Sanity Schema

**Location:** `src/sanity/schemaTypes/`

### Template Schema Structure

```typescript
import {defineField, defineType} from 'sanity'

export const [sectionName] = defineType({
  name: '[sectionName]',
  title: '[Section Title]',
  type: 'object',
  fields: [
    // Field definitions here
  ],
  preview: {
    select: {
      title: 'title',
      media: 'imageField',
    },
    prepare({title, media}) {
      return {
        title: title || 'Section Name',
        subtitle: 'Section description',
        media: media,
      }
    },
  },
})
```

### Contoh: Map Section

**File:** `src/sanity/schemaTypes/mapSection.ts`

```typescript
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
      placeholder: 'Cultural Park',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mapImage',
      title: 'Map Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'markers',
      title: 'Map Markers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'marker',
          fields: [
            defineField({
              name: 'number',
              title: 'Marker Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Location Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Location Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'position',
              title: 'Position on Map',
              type: 'object',
              fields: [
                defineField({
                  name: 'top',
                  title: 'Top (px)',
                  type: 'number',
                  initialValue: 0,
                }),
                defineField({
                  name: 'right',
                  title: 'Right (px)',
                  type: 'number',
                  initialValue: 0,
                }),
              ],
            }),
            defineField({
              name: 'link',
              title: 'Detail Link',
              type: 'string',
              placeholder: '/facility/plaza',
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
})
```

### ⚠️ PENTING: Nested Objects

Untuk nested objects (seperti `position`, array items), **HARUS** menggunakan `defineField()`:

```typescript
// ❌ SALAH - akan error "read-only document"
{
  name: 'position',
  type: 'object',
  fields: [
    { name: 'top', type: 'number' }
  ]
}

// ✅ BENAR
defineField({
  name: 'position',
  type: 'object',
  fields: [
    defineField({ name: 'top', type: 'number', initialValue: 0 })
  ]
})
```

---

## 3. Register Schema

### Step 1: Export Schema

**File:** `src/sanity/schemaTypes/index.ts`

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { template } from './template'
import { heroSection } from './heroSection'
import { mapSection } from './mapSection'        // Import schema baru
import { activitySection } from './activitySection' // Import schema baru

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    template, 
    heroSection, 
    mapSection,        // Tambahkan di sini
    activitySection,   // Tambahkan di sini
  ],
}
```

### Step 2: Add to Template

**File:** `src/sanity/schemaTypes/template.ts`

```typescript
import {defineArrayMember, defineField, defineType} from 'sanity'

export const template = defineType({
  name: 'template',
  title: 'Pages',
  type: 'document',
  fields: [
    // ... fields lain
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'heroSection',
        }),
        defineArrayMember({
          name: 'mapSection',        // Tambahkan section baru
          title: 'Map Section',
          type: 'mapSection',
        }),
        defineArrayMember({
          name: 'activitySection',   // Tambahkan section baru
          title: 'Activity Section',
          type: 'activitySection',
        }),
      ],
    }),
  ],
})
```

---

## 4. Membuat Type Definition

**File:** `src/app/admin/sectionPresets.ts`

### Step 1: Update SectionType

```typescript
export type SectionType = 
  | "heroSection" 
  | "featureSection" 
  | "mapSection"        // Tambahkan type baru
  | "activitySection"   // Tambahkan type baru
```

### Step 2: Define Type Interface

```typescript
export type MapSection = {
  _type: "mapSection"
  _key: string
  title: string
  description: string
  mapImage?: SanityImageValue | null
  markers: Array<{
    _key: string
    number: string
    title: string
    description: string
    image?: SanityImageValue | null
    position: {
      top: number
      right: number
    }
    link?: string
  }>
}

export type ActivitySection = {
  _type: "activitySection"
  _key: string
  title: string
  description: string
  gallery: Array<{
    _key: string
    title: string
    description?: string
    image?: SanityImageValue | null
  }>
  flyer?: SanityImageValue | null
}
```

### Step 3: Add to SectionMap

```typescript
export type SectionMap = {
  heroSection: HeroSection
  featureSection: FeatureSection
  mapSection: MapSection           // Tambahkan di sini
  activitySection: ActivitySection // Tambahkan di sini
}
```

### Step 4: Create Factory Function

```typescript
export const sectionFactories: Record<SectionType, () => SectionPayload> = {
  heroSection: () => ({ /* ... */ }),
  
  mapSection: () => ({
    _type: "mapSection",
    _key: nanoid(),
    title: "Cultural Park",
    description: "Discover the cultural heart of Bali",
    mapImage: null,
    markers: [],
  }),
  
  activitySection: () => ({
    _type: "activitySection",
    _key: nanoid(),
    title: "Activities",
    description: "Explore the Cultural Richness of Bali",
    gallery: [],
    flyer: null,
  }),
}
```

### Step 5: Add to Section Palette

```typescript
export const sectionPalette = [
  // ... sections lain
  {
    type: "mapSection",
    title: "Map Section",
    description: "Interactive map with markers",
    icon: null,
    defaultData: {
      title: "Cultural Park",
      description: "Discover the cultural heart...",
      markers: []
    }
  },
  {
    type: "activitySection",
    title: "Activity Section",
    description: "Gallery of activities with flyer",
    icon: null,
    defaultData: {
      title: "Activities",
      description: "Explore the Cultural Richness...",
      gallery: []
    }
  }
]
```

---

## 5. Tambahkan ke Section Editor

**File:** `src/app/admin/pages/components/SectionEditor.tsx`

### Step 1: Add Template Configuration

```typescript
const sectionTemplates = {
  heroSection: { /* ... */ },
  
  mapSection: {
    title: 'Map Section',
    icon: '🗺️',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'mapImage', label: 'Map Background', type: 'image', required: true },
      { key: 'markers', label: 'Map Markers', type: 'markers' } // Custom type
    ]
  },
  
  activitySection: {
    title: 'Activity Section',
    icon: '🎨',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
      { key: 'gallery', label: 'Activity Gallery', type: 'gallery' }, // Custom type
      { key: 'flyer', label: 'Flyer Image', type: 'image' }
    ]
  }
}
```

### Step 2: Create Handler Functions (untuk custom types)

```typescript
// Contoh: Markers handlers
const addMarker = () => {
  const currentMarkers = section.markers || []
  onUpdate(index, 'markers', [
    ...currentMarkers,
    { 
      _key: Math.random().toString(36).substring(2, 11),
      number: String(currentMarkers.length + 1).padStart(2, '0'),
      title: '',
      description: '',
      image: null,
      position: { top: 0, right: 0 },
      link: ''
    }
  ])
}

const updateMarker = (markerIndex: number, field: string, value: any) => {
  const currentMarkers = section.markers || []
  const updatedMarkers = currentMarkers.map((marker, i) => 
    i === markerIndex ? { ...marker, [field]: value } : marker
  )
  onUpdate(index, 'markers', updatedMarkers)
}

const removeMarker = (markerIndex: number) => {
  const currentMarkers = section.markers || []
  const updatedMarkers = currentMarkers.filter((_, i) => i !== markerIndex)
  onUpdate(index, 'markers', updatedMarkers)
}

// Contoh: Gallery handlers
const addGalleryItem = () => {
  const currentGallery = section.gallery || []
  onUpdate(index, 'gallery', [
    ...currentGallery,
    { 
      _key: Math.random().toString(36).substring(2, 11),
      title: '',
      description: '',
      image: null
    }
  ])
}

const updateGalleryItem = (galleryIndex: number, field: string, value: any) => {
  const currentGallery = section.gallery || []
  const updatedGallery = currentGallery.map((item, i) => 
    i === galleryIndex ? { ...item, [field]: value } : item
  )
  onUpdate(index, 'gallery', updatedGallery)
}

const removeGalleryItem = (galleryIndex: number) => {
  const currentGallery = section.gallery || []
  const updatedGallery = currentGallery.filter((_, i) => i !== galleryIndex)
  onUpdate(index, 'gallery', updatedGallery)
}
```

### Step 3: Add UI Rendering (setelah field.type === 'features')

```typescript
{field.type === 'markers' && (
  <div className="admin-section-editor-markers">
    <div className="admin-section-editor-markers-header">
      <h4>Map Markers ({(section.markers || []).length})</h4>
      <button type="button" onClick={addMarker}>
        <Plus /> Tambah Marker
      </button>
    </div>
    {(section.markers || []).map((marker: any, markerIndex: number) => (
      <div key={marker._key} className="admin-section-editor-marker">
        <div className="admin-section-editor-marker-header">
          <h5>📍 Marker {marker.number}</h5>
          <button onClick={() => removeMarker(markerIndex)}>
            <X />
          </button>
        </div>
        <div className="admin-section-editor-marker-fields">
          {/* Number */}
          <input
            value={marker.number || ''}
            onChange={(e) => updateMarker(markerIndex, 'number', e.target.value)}
            placeholder="01"
          />
          
          {/* Title */}
          <input
            value={marker.title || ''}
            onChange={(e) => updateMarker(markerIndex, 'title', e.target.value)}
            placeholder="Location Name"
          />
          
          {/* Image Upload */}
          <div className="admin-section-editor-field">
            {getImageUrl(marker.image) ? (
              <div className="admin-section-editor-image-preview">
                <img src={getImageUrl(marker.image)} alt="Preview" />
                <button onClick={() => updateMarker(markerIndex, 'image', null)}>
                  <X />
                </button>
              </div>
            ) : (
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    updateMarker(markerIndex, 'image', {
                      asset: { url },
                      file: file
                    })
                  }
                }}
              />
            )}
          </div>
          
          {/* Position */}
          <div className="admin-section-editor-position-grid">
            <input
              type="number"
              value={marker.position?.top || 0}
              onChange={(e) => updateMarker(markerIndex, 'position', {
                ...marker.position,
                top: parseInt(e.target.value) || 0
              })}
              placeholder="Top (px)"
            />
            <input
              type="number"
              value={marker.position?.right || 0}
              onChange={(e) => updateMarker(markerIndex, 'position', {
                ...marker.position,
                right: parseInt(e.target.value) || 0
              })}
              placeholder="Right (px)"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}

{field.type === 'gallery' && (
  <div className="admin-section-editor-gallery">
    <div className="admin-section-editor-gallery-header">
      <h4>Activity Gallery ({(section.gallery || []).length})</h4>
      <button type="button" onClick={addGalleryItem}>
        <Plus /> Tambah Activity
      </button>
    </div>
    {(section.gallery || []).map((item: any, galleryIndex: number) => (
      <div key={item._key} className="admin-section-editor-gallery-item">
        <div className="admin-section-editor-gallery-item-header">
          <h5>🎨 Activity {galleryIndex + 1}</h5>
          <button onClick={() => removeGalleryItem(galleryIndex)}>
            <X />
          </button>
        </div>
        <div className="admin-section-editor-gallery-item-fields">
          {/* Title */}
          <input
            value={item.title || ''}
            onChange={(e) => updateGalleryItem(galleryIndex, 'title', e.target.value)}
            placeholder="Activity Name"
          />
          
          {/* Image Upload */}
          <div className="admin-section-editor-field">
            {getImageUrl(item.image) ? (
              <div className="admin-section-editor-image-preview">
                <img src={getImageUrl(item.image)} alt="Preview" />
                <button onClick={() => updateGalleryItem(galleryIndex, 'image', null)}>
                  <X />
                </button>
              </div>
            ) : (
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    updateGalleryItem(galleryIndex, 'image', {
                      asset: { url },
                      file: file
                    })
                  }
                }}
              />
            )}
          </div>
          
          {/* Description (Optional) */}
          <textarea
            value={item.description || ''}
            onChange={(e) => updateGalleryItem(galleryIndex, 'description', e.target.value)}
            placeholder="Description..."
            rows={2}
          />
        </div>
      </div>
    ))}
  </div>
)}
```

---

## 6. Tambahkan ke Section Selector

**File:** `src/app/admin/pages/components/SectionSelector.tsx`

```typescript
const availableSections = [
  {
    type: 'heroSection',
    title: 'Hero Section',
    description: 'Large banner with image and CTA',
    icon: '🎯',
    color: 'blue'
  },
  {
    type: 'mapSection',
    title: 'Map Section',
    description: 'Interactive map dengan markers dan popup',
    icon: '🗺️',
    color: 'teal'
  },
  {
    type: 'activitySection',
    title: 'Activity Section',
    description: 'Gallery aktivitas dengan flyer/banner',
    icon: '🎨',
    color: 'orange'
  },
  // ... sections lain
]
```

---

## 7. Update Section Builder

**File:** `src/app/admin/pages/components/SectionBuilder.tsx`

### Step 1: Add to Icon/Name Mappings

```typescript
const sectionIcons: Record<string, string> = {
  heroSection: '🎯',
  mapSection: '🗺️',
  activitySection: '🎨',
}

const sectionNames: Record<string, string> = {
  heroSection: 'Hero Section',
  mapSection: 'Map Section',
  activitySection: 'Activity Section',
}
```

### Step 2: Update Image Upload Logic

```typescript
const updateSection = async (index: number, field: string, value: any) => {
  // Helper function untuk upload
  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', { method: 'POST', body: formData })
    if (response.ok) {
      const result = await response.json()
      return {
        _type: 'image',
        asset: { _type: 'reference', _ref: result.asset._id }
      }
    }
    throw new Error('Upload failed')
  }

  // Upload single image fields
  if ((field === 'media' || field === 'image' || field === 'mapImage' || field === 'flyer') && value?.file) {
    try {
      value = await uploadImage(value.file)
    } catch (error) {
      alert('Gagal mengupload gambar')
      return
    }
  }

  // Upload markers array
  if (field === 'markers' && Array.isArray(value)) {
    try {
      const uploadedMarkers = await Promise.all(
        value.map(async (marker: any) => {
          if (marker.image?.file) {
            const uploadedImage = await uploadImage(marker.image.file)
            return { ...marker, image: uploadedImage }
          }
          return marker
        })
      )
      value = uploadedMarkers
    } catch (error) {
      alert('Gagal mengupload gambar marker')
      return
    }
  }

  // Upload gallery array
  if (field === 'gallery' && Array.isArray(value)) {
    try {
      const uploadedGallery = await Promise.all(
        value.map(async (item: any) => {
          if (item.image?.file) {
            const uploadedImage = await uploadImage(item.image.file)
            return { ...item, image: uploadedImage }
          }
          return item
        })
      )
      value = uploadedGallery
    } catch (error) {
      alert('Gagal mengupload gambar gallery')
      return
    }
  }

  // Update section
  const updatedSections = sections.map((section, i) => 
    i === index ? { ...section, [field]: value } : section
  )
  onUpdateSections(updatedSections)
}
```

---

## 8. Update API Routes

### POST: Create Page

**File:** `src/app/api/pages/route.ts`

```typescript
// Format sections for Sanity
const formattedSections = (sections || []).map((section: any) => {
  const baseSection = {
    _type: section._type,
    _key: section._id || Math.random().toString(36).substring(2, 11)
  }

  switch (section._type) {
    case 'heroSection':
      // ... hero logic
      
    case 'mapSection':
      // Format mapImage
      let formattedMapImage = null
      if (section.mapImage) {
        if (section.mapImage.asset?._ref) {
          formattedMapImage = {
            _type: 'image',
            asset: { _type: 'reference', _ref: section.mapImage.asset._ref }
          }
        } else if (section.mapImage.asset?._id) {
          formattedMapImage = {
            _type: 'image',
            asset: { _type: 'reference', _ref: section.mapImage.asset._id }
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
              asset: { _type: 'reference', _ref: marker.image.asset._ref }
            }
          } else if (marker.image.asset?._id) {
            markerImage = {
              _type: 'image',
              asset: { _type: 'reference', _ref: marker.image.asset._id }
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
      // Format flyer
      let formattedFlyer = null
      if (section.flyer) {
        if (section.flyer.asset?._ref) {
          formattedFlyer = {
            _type: 'image',
            asset: { _type: 'reference', _ref: section.flyer.asset._ref }
          }
        } else if (section.flyer.asset?._id) {
          formattedFlyer = {
            _type: 'image',
            asset: { _type: 'reference', _ref: section.flyer.asset._id }
          }
        }
      }

      // Format gallery
      const formattedGallery = (section.gallery || []).map((item: any) => {
        let itemImage = null
        if (item.image) {
          if (item.image.asset?._ref) {
            itemImage = {
              _type: 'image',
              asset: { _type: 'reference', _ref: item.image.asset._ref }
            }
          } else if (item.image.asset?._id) {
            itemImage = {
              _type: 'image',
              asset: { _type: 'reference', _ref: item.image.asset._id }
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
        title: section.title || '',
        description: section.description || '',
        gallery: formattedGallery,
        flyer: formattedFlyer
      }
      
    default:
      return baseSection
  }
})
```

### PATCH: Update Page

**File:** `src/app/api/pages/[id]/route.ts`

Copy logic yang sama dari POST ke PATCH endpoint.

### GET: Fetch Page

**File:** `src/app/api/pages/[id]/route.ts`

```typescript
const page = await client.fetch(`
  *[_type == "template" && _id == $id][0] {
    _id,
    title,
    slug,
    summary,
    sections[] {
      _type,
      _key,
      title,
      subtitle,
      description,
      
      // Hero Section
      preTitle,
      media { asset-> { _id, url } },
      cta,
      theme,
      
      // Map Section
      mapImage { asset-> { _id, url } },
      markers[] {
        _key,
        number,
        title,
        description,
        image { asset-> { _id, url } },
        position,
        link
      },
      
      // Activity Section
      gallery[] {
        _key,
        title,
        description,
        image { asset-> { _id, url } }
      },
      flyer { asset-> { _id, url } },
      
      // Other sections
      features,
      testimonials
    }
  }
`, { id })
```

---

## 9. Tambahkan CSS Styling

**File:** `src/app/admin/pages/components/section-components.css`

```css
/* ============================================
   MAP MARKERS EDITOR
   ============================================ */

.admin-section-editor-markers {
  margin-top: 10px;
}

.admin-section-editor-markers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #4a5568;
}

.admin-section-editor-add-marker {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #805ad5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-section-editor-marker {
  background: #1e293b;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.admin-section-editor-position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* ============================================
   ACTIVITY GALLERY EDITOR
   ============================================ */

.admin-section-editor-gallery {
  margin-top: 10px;
}

.admin-section-editor-add-gallery {
  background: #f59e0b;
  color: white;
  /* ... similar styles */
}

.admin-section-editor-gallery-item {
  background: #1e293b;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-section-editor-position-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 10. Testing

### Checklist Testing

- [ ] **Create New Section**
  - [ ] Section muncul di selector dengan icon & description
  - [ ] Klik add section → form muncul dengan fields yang benar
  - [ ] Default values terisi dengan benar

- [ ] **Upload Images**
  - [ ] Upload single image (mapImage, flyer) → preview muncul
  - [ ] Upload array images (markers, gallery) → preview muncul
  - [ ] Remove image → preview hilang

- [ ] **Array Management**
  - [ ] Add item → new item card muncul
  - [ ] Edit item → data tersimpan
  - [ ] Remove item → item terhapus
  - [ ] Empty state muncul saat array kosong

- [ ] **Save Page**
  - [ ] Save → tidak ada error
  - [ ] Check Sanity Studio → data tersimpan dengan benar
  - [ ] Images tersimpan dengan asset._ref

- [ ] **Edit Page**
  - [ ] Fetch page → data loaded dengan benar
  - [ ] Images muncul di preview
  - [ ] Edit data → perubahan tersimpan
  - [ ] Add/remove items → tersimpan

- [ ] **Validation**
  - [ ] Required fields → error jika kosong
  - [ ] File size limit → error jika >5MB
  - [ ] File type → error jika bukan image

---

## 📚 Referensi

### File Contoh
- **Map Section**: Contoh section dengan nested array & position
- **Activity Section**: Contoh section dengan gallery & flyer

### Key Concepts

1. **Always use `defineField()`** untuk semua fields, termasuk nested
2. **Add `_key`** untuk semua array items (auto-generate dengan nanoid)
3. **Upload logic** harus handle:
   - Single images (media, image, mapImage, flyer)
   - Array images (markers, gallery)
4. **API formatting** harus convert:
   - `asset._id` → `asset._ref` saat save
   - Fetch dengan `asset->{_id, url}` untuk load
5. **CSS naming** konsisten: `admin-section-editor-[nama]`

---

## 🎯 Summary Workflow

```
1. Analisis Frontend Component
   ↓
2. Buat Sanity Schema (dengan defineField)
   ↓
3. Register Schema (index.ts + template.ts)
   ↓
4. Buat Type Definition (sectionPresets.ts)
   ↓
5. Tambahkan Template & UI (SectionEditor.tsx)
   ↓
6. Tambahkan ke Selector (SectionSelector.tsx)
   ↓
7. Update Upload Logic (SectionBuilder.tsx)
   ↓
8. Update API (route.ts + [id]/route.ts)
   ↓
9. Tambahkan CSS (section-components.css)
   ↓
10. Testing & Verification
```

---

## ✅ Checklist Lengkap

**Sanity Schema:**
- [ ] Create schema file di `src/sanity/schemaTypes/`
- [ ] Semua fields pakai `defineField()`
- [ ] Nested objects pakai `defineField()` + `initialValue`
- [ ] Add preview configuration

**Registration:**
- [ ] Export di `index.ts`
- [ ] Add to `template.ts` sections array

**Type Definitions:**
- [ ] Add to `SectionType` union
- [ ] Create type interface
- [ ] Add to `SectionMap`
- [ ] Create factory function
- [ ] Add to section palette

**Admin UI:**
- [ ] Add template ke `SectionEditor.tsx`
- [ ] Create handler functions (add, update, remove)
- [ ] Add UI rendering untuk fields
- [ ] Add to `SectionSelector.tsx`
- [ ] Update `SectionBuilder.tsx` icons & names
- [ ] Update upload logic di `SectionBuilder.tsx`

**API:**
- [ ] Add case di POST endpoint
- [ ] Add case di PATCH endpoint
- [ ] Update GET query
- [ ] Handle image formatting (\_ref conversion)

**Styling:**
- [ ] Create CSS classes
- [ ] Add responsive styles
- [ ] Consistent naming

**Testing:**
- [ ] Create section test
- [ ] Upload images test
- [ ] Array management test
- [ ] Save & fetch test
- [ ] Validation test

---

**Created:** 2024-01-15  
**Version:** 1.0  
**Maintainer:** GWK Development Team