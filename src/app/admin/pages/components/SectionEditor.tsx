"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Image, 
  Type, 
  Link,
  Plus,
  X,
  Upload,
  Copy,
  Check
} from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import "./section-components.css"

// Color palette untuk text color picker
const COLOR_PALETTE = [
  { value: 'black', color: '#000000', label: 'Hitam' },
  { value: 'white', color: '#FFFFFF', label: 'Putih' },
  { value: 'gray', color: '#6B7280', label: 'Abu-abu' },
  { value: 'red', color: '#EF4444', label: 'Merah' },
  { value: 'orange', color: '#F97316', label: 'Orange' },
  { value: 'yellow', color: '#EAB308', label: 'Kuning' },
  { value: 'green', color: '#22C55E', label: 'Hijau' },
  { value: 'teal', color: '#14B8A6', label: 'Teal' },
  { value: 'blue', color: '#3B82F6', label: 'Biru' },
  { value: 'indigo', color: '#6366F1', label: 'Indigo' },
  { value: 'purple', color: '#A855F7', label: 'Ungu' },
  { value: 'pink', color: '#EC4899', label: 'Pink' }
]

// Helper function untuk mendapatkan URL gambar
function getImageUrl(imageData: any): string | null {
  if (!imageData) return null
  
  // Debug log
  console.log('Image data:', imageData)
  
  // Jika sudah ada URL (dari blob local)
  if (imageData.asset?.url && imageData.asset.url.startsWith('blob:')) {
    return imageData.asset.url
  }
  
  // Jika ada URL dari Sanity (sudah resolved)
  if (imageData.asset?.url && !imageData.asset.url.startsWith('blob:')) {
    return imageData.asset.url
  }
  
  // Jika ada asset reference dari Sanity
  if (imageData.asset?._ref || imageData.asset?._id) {
    try {
      return urlFor(imageData).url()
    } catch (error) {
      console.error('Error generating image URL:', error, imageData)
      return null
    }
  }
  
  // Jika imageData.asset adalah null atau tidak valid, return null
  if (!imageData.asset) {
    return null
  }
  
  // Fallback: coba langsung sebagai source (hanya jika ada asset)
  try {
    // Double check sebelum pass ke urlFor
    if (imageData._type === 'image' && imageData.asset) {
      return urlFor(imageData).url()
    }
    return null
  } catch (error) {
    console.error('Failed all URL generation attempts:', error, imageData)
    return null
  }
}

interface Section {
  _type: string
  title?: string
  subtitle?: string
  description?: string
  content?: string
  media?: {
    asset?: {
      url?: string
    }
  }
  cta?: {
    label?: string
    href?: string
  }
  features?: Array<{
    title?: string
    description?: string
    icon?: string
  }>
  [key: string]: any
}

interface SectionEditorProps {
  section: Section
  index: number
  onUpdate: (index: number, field: string, value: any) => void
  onRemove: (index: number) => void
}

const sectionTemplates = {
  heroSection: {
    title: 'Hero Section',
    icon: '🎯',
    fields: [
      { key: 'preTitle', label: 'Pre Title', type: 'text', placeholder: 'Welcome to' },
      { key: 'title', label: 'Judul Utama', type: 'text', required: true, placeholder: 'Garuda Wisnu Kencana' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'The Magnificent Masterpiece of Indonesia', rows: 2 },
      { key: 'media', label: 'Gambar Background', type: 'image', required: true },
      { key: 'cta', label: 'Call to Action', type: 'cta' },
      { key: 'theme', label: 'Theme', type: 'select', options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' }
      ]}
    ]
  },
  heroSection3: {
    title: 'Hero Section',
    icon: '🎯',
    fields: [
      { key: 'preTitle', label: 'Pre Title', type: 'text', placeholder: 'Discover' },
      { key: 'title', label: 'Judul Utama', type: 'text', required: true, placeholder: 'Cultural Heritage' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Experience the Beauty of Balinese Arts', rows: 2 },
      { key: 'media', label: 'Gambar Background', type: 'image', required: true },
      { key: 'cta', label: 'Call to Action', type: 'cta' },
      { key: 'theme', label: 'Theme', type: 'select', options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' }
      ]}
    ]
  },
  featureSection: {
    title: 'Feature Section',
    icon: '⭐',
    fields: [
      { key: 'title', label: 'Judul', type: 'text', required: true },
      { key: 'description', label: 'Deskripsi', type: 'textarea' },
      { key: 'features', label: 'Fitur', type: 'features' }
    ]
  },
  testimonialSection: {
    title: 'Testimonial Section',
    icon: '💬',
    fields: [
      { key: 'title', label: 'Judul', type: 'text', required: true },
      { key: 'description', label: 'Deskripsi', type: 'textarea' },
      { key: 'testimonials', label: 'Testimoni', type: 'testimonials' }
    ]
  },
  mapSection: {
    title: 'Map Section',
    icon: '🗺️',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true, placeholder: 'Cultural Park' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Discover the cultural heart...' },
      { key: 'mapImage', label: 'Map Background Image', type: 'image', required: true },
      { key: 'markers', label: 'Map Markers', type: 'markers' }
    ]
  },
  activitySection: {
    title: 'Activity Section',
    icon: '🎨',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true, placeholder: 'Activities' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2, placeholder: 'Explore the Cultural Richness...' },
      { key: 'gallery', label: 'Activity Gallery', type: 'gallery' },
      { key: 'flyer', label: 'Flyer / Banner Image', type: 'image' }
    ]
  },
  contentSection1: {
    title: 'Content Section 1',
    icon: '📄',
    fields: [
      { key: 'description', label: 'Section Description', type: 'textarea', rows: 3, required: true, placeholder: 'Deskripsi bagian atas section...' },
      { key: 'video', label: 'Section Video', type: 'video' },
      { key: 'items', label: 'Content Items', type: 'contentItems' }
    ]
  },
  contentSection2: {
    title: 'Content Section 2',
    icon: '📑',
    fields: [
      { key: 'description', label: 'Section Description', type: 'textarea', rows: 4, required: true, placeholder: 'Deskripsi untuk bagian atas section.' },
      { 
        key: 'mediaType', 
        label: 'Media Type', 
        type: 'select', 
        options: [
          { value: 'image', label: 'Image' },
          { value: 'video', label: 'Video' }
        ] 
      },
      { key: 'mainImage', label: 'Main Image', type: 'image', condition: (s: Section) => s.mediaType === 'image' },
      { key: 'mainVideo', label: 'Main Video', type: 'video', condition: (s: Section) => s.mediaType === 'video' },
      { key: 'items', label: 'Content Items', type: 'contentItems2' }
    ]
  },
  contentSection3: {
    title: 'Content Section 3',
    icon: '📋',
    fields: [
      { key: 'ctaLinks', label: 'CTA Links', type: 'ctaLinks' },
      { key: 'video', label: 'Video', type: 'video' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Masukkan title section' },
      { key: 'description', label: 'Deskripsi', type: 'textarea', rows: 4, placeholder: 'Deskripsi section' },
      { key: 'gallery', label: 'Gallery Foto', type: 'galleryPhotos' }
    ]
  }
}

export default function SectionEditor({ section, index, onUpdate, onRemove }: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileInfo, setFileInfo] = useState<{name: string, size: number} | null>(null)
  const [copied, setCopied] = useState(false)
  const [colorPickerOpen, setColorPickerOpen] = useState<number | null>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setColorPickerOpen(null)
      }
    }

    if (colorPickerOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [colorPickerOpen])

  // Copy section ID to clipboard
  const handleCopyId = () => {
    const sectionId = section._key || section._id || ''
    if (sectionId) {
      navigator.clipboard.writeText(sectionId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  // Handlers for Content Section 2
  const addContentItem2 = () => {
    const currentItems = section.items || []
    onUpdate(index, 'items', [
      ...currentItems,
      { 
        _key: Math.random().toString(36).substring(2, 11),
        title: '',
        image: null,
        cta: { label: '', link: '' }
      }
    ])
  }

  const updateContentItem2 = (itemIndex: number, field: string, value: any, ctaField?: 'label' | 'link') => {
    const currentItems = section.items || []
    const updatedItems = currentItems.map((item, i) => {
      if (i !== itemIndex) return item
      if (field === 'cta' && ctaField) {
        return { ...item, cta: { ...item.cta, [ctaField]: value } }
      }
      return { ...item, [field]: value }
    })
    onUpdate(index, 'items', updatedItems)
  }

  const removeContentItem2 = (itemIndex: number) => {
    const currentItems = section.items || []
    const updatedItems = currentItems.filter((_, i) => i !== itemIndex)
    onUpdate(index, 'items', updatedItems)
  }

  // Content Items handlers untuk Content Section 1
  const addContentItem = () => {
    const currentItems = section.items || []
    onUpdate(index, 'items', [
      ...currentItems,
      { 
        _key: Math.random().toString(36).substring(2, 11),
        title: '',
        description: '',
        image: null
      }
    ])
  }

  const updateContentItem = (itemIndex: number, field: string, value: any) => {
    const currentItems = section.items || []
    const updatedItems = currentItems.map((item, i) => 
      i === itemIndex ? { ...item, [field]: value } : item
    )
    onUpdate(index, 'items', updatedItems)
  }

  const removeContentItem = (itemIndex: number) => {
    const currentItems = section.items || []
    const updatedItems = currentItems.filter((_, i) => i !== itemIndex)
    onUpdate(index, 'items', updatedItems)
  }

  const template = sectionTemplates[section._type as keyof typeof sectionTemplates]
  
  if (!template) {
    return (
      <div className="admin-section-editor">
        <div className="admin-section-editor-header">
          <div className="admin-section-editor-title">
            <span className="admin-section-editor-icon">❓</span>
            Unknown Section
          </div>
          <div className="admin-section-editor-actions">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="admin-section-editor-remove"
            >
              <Trash2 className="admin-section-editor-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleFieldChange = (field: string, value: any) => {
    onUpdate(index, field, value)
  }

  const handleCtaChange = (ctaField: string, value: string) => {
    const currentCta = section.cta || {}
    onUpdate(index, 'cta', {
      _type: 'object',
      ...currentCta,
      [ctaField]: value
    })
  }

  const addFeature = () => {
    const currentFeatures = section.features || []
    onUpdate(index, 'features', [
      ...currentFeatures,
      { title: '', description: '', icon: '' }
    ])
  }

  const updateFeature = (featureIndex: number, field: string, value: string) => {
    const currentFeatures = section.features || []
    const updatedFeatures = currentFeatures.map((feature, i) => 
      i === featureIndex ? { ...feature, [field]: value } : feature
    )
    onUpdate(index, 'features', updatedFeatures)
  }

  const removeFeature = (featureIndex: number) => {
    const currentFeatures = section.features || []
    const updatedFeatures = currentFeatures.filter((_, i) => i !== featureIndex)
    onUpdate(index, 'features', updatedFeatures)
  }

  // Marker handlers untuk Map Section
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

  // Gallery handlers untuk Activity Section
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

  // Handlers for CTA Links (Content Section 3)
  const addCtaLink = () => {
    const currentLinks = section.ctaLinks || []
    onUpdate(index, 'ctaLinks', [
      ...currentLinks,
      { 
        _key: Math.random().toString(36).substring(2, 11),
        name: '',
        link: '',
        textColor: 'black'
      }
    ])
  }

  const updateCtaLink = (linkIndex: number, field: string, value: any) => {
    const currentLinks = section.ctaLinks || []
    const updatedLinks = currentLinks.map((link: any, i: number) => 
      i === linkIndex ? { ...link, [field]: value } : link
    )
    onUpdate(index, 'ctaLinks', updatedLinks)
  }

  const removeCtaLink = (linkIndex: number) => {
    const currentLinks = section.ctaLinks || []
    const updatedLinks = currentLinks.filter((_: any, i: number) => i !== linkIndex)
    onUpdate(index, 'ctaLinks', updatedLinks)
  }

  // Handlers for Gallery Photos (Content Section 3)
  const addGalleryPhoto = () => {
    const currentPhotos = section.gallery || []
    onUpdate(index, 'gallery', [
      ...currentPhotos,
      { 
        _key: Math.random().toString(36).substring(2, 11),
        title: '',
        image: null
      }
    ])
  }

  const updateGalleryPhoto = (photoIndex: number, field: string, value: any) => {
    const currentPhotos = section.gallery || []
    const updatedPhotos = currentPhotos.map((photo: any, i: number) => 
      i === photoIndex ? { ...photo, [field]: value } : photo
    )
    onUpdate(index, 'gallery', updatedPhotos)
  }

  const removeGalleryPhoto = (photoIndex: number) => {
    const currentPhotos = section.gallery || []
    const updatedPhotos = currentPhotos.filter((_: any, i: number) => i !== photoIndex)
    onUpdate(index, 'gallery', updatedPhotos)
  }

  return (
    <div className="admin-section-editor">
      <div className="admin-section-editor-header">
        <div className="admin-section-editor-title">
          <span className="admin-section-editor-icon">{template.icon}</span>
          {template.title}
          {section.title && (
            <span className="admin-section-editor-subtitle">
              - {section.title}
            </span>
          )}
          {(section._key || section._id) && (
            <button
              type="button"
              onClick={handleCopyId}
              className="admin-section-editor-id-copy"
              title={copied ? "Copied!" : "Copy Section ID"}
            >
              <span className="admin-section-editor-id">
                ID: {section._key || section._id}
              </span>
              {copied ? (
                <Check className="admin-section-editor-icon-small" />
              ) : (
                <Copy className="admin-section-editor-icon-small" />
              )}
            </button>
          )}
        </div>
        <div className="admin-section-editor-actions">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="admin-section-editor-toggle"
          >
            {isExpanded ? (
              <ChevronUp className="admin-section-editor-icon" />
            ) : (
              <ChevronDown className="admin-section-editor-icon" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="admin-section-editor-remove"
          >
            <Trash2 className="admin-section-editor-icon" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="admin-section-editor-content">
          {template.fields.map((field: any) => {
            if (field.condition && !field.condition(section)) {
              return null
            }
            
            return (
              <div key={field.key} className="admin-section-editor-field">
                <label className="admin-section-editor-field-label">
                  {field.label}
                  {field.required && <span className="admin-section-editor-required">*</span>}
                </label>

                {field.type === 'text' && (
                  <input
                    type="text"
                    value={section[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="admin-section-editor-input"
                    placeholder={`Masukkan ${field.label.toLowerCase()}`}
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    value={section[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="admin-section-editor-textarea"
                    rows={field.rows || 3}
                    placeholder={`Masukkan ${field.label.toLowerCase()}`}
                  />
                )}

                {field.type === 'image' && (
                  <div className="admin-section-editor-image">
                    {(() => {
                      const imageUrl = getImageUrl(section[field.key])
                      return imageUrl ? (
                        <div className="admin-section-editor-image-preview">
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="admin-section-editor-image-preview-img"
                            onError={(e) => {
                              console.error('Error loading image:', {
                                url: imageUrl,
                                data: section[field.key]
                              })
                            }}
                          />
                          {fileInfo && (
                            <div className="admin-section-editor-image-info">
                              <span className="admin-section-editor-image-name">{fileInfo.name}</span>
                              <span className="admin-section-editor-image-size">
                                {(fileInfo.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              handleFieldChange(field.key, null)
                              setFileInfo(null)
                            }}
                            className="admin-section-editor-image-remove"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                      ) : (
                        <div className="admin-section-editor-upload">
                          <input
                            type="file"
                            id={`${field.key}-${index}`}
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                // Validate file type
                                if (!file.type.startsWith('image/')) {
                                  alert('Hanya file gambar yang diperbolehkan')
                                  return
                                }
                                
                                // Validate file size (max 5MB)
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('Ukuran file terlalu besar. Maksimal 5MB')
                                  return
                                }
                                
                                setUploading(true)
                                setFileInfo({ name: file.name, size: file.size })
                                const url = URL.createObjectURL(file)
                                handleFieldChange(field.key, {
                                  asset: { url },
                                  file: file
                                })
                                setUploading(false)
                              }
                            }}
                            className="admin-section-editor-file-input"
                          />
                          <label htmlFor={`${field.key}-${index}`} className="admin-section-editor-upload-label">
                            {uploading ? (
                              <>
                                <div className="admin-section-editor-loading">⏳</div>
                                <span>Mengupload gambar...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="admin-section-editor-icon" />
                                <span className="admin-section-editor-upload-title">Klik untuk memilih gambar</span>
                                <span className="admin-section-editor-upload-subtitle">atau drag & drop file di sini</span>
                                <span className="admin-section-editor-upload-hint">Format: JPG, PNG, GIF (Max 5MB)</span>
                              </>
                            )}
                          </label>
                        </div>
                      )
                    })()}
                  </div>
                )}

                {field.type === 'video' && (
                  <div className="admin-section-editor-video">
                    {(() => {
                      const videoData = section[field.key]
                      const videoUrl = videoData?.asset?.url
                      return videoUrl ? (
                        <div className="admin-section-editor-video-preview">
                          <video
                            src={videoUrl}
                            controls
                            className="admin-section-editor-video-player"
                            style={{
                              width: '100%',
                              maxHeight: '400px',
                              borderRadius: '8px',
                              backgroundColor: '#000'
                            }}
                          />
                          {fileInfo && (
                            <div className="admin-section-editor-image-info">
                              <span className="admin-section-editor-image-name">{fileInfo.name}</span>
                              <span className="admin-section-editor-image-size">
                                {(fileInfo.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              handleFieldChange(field.key, null)
                              setFileInfo(null)
                            }}
                            className="admin-section-editor-image-remove"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                      ) : (
                        <div className="admin-section-editor-upload">
                          <input
                            type="file"
                            id={`${field.key}-${index}`}
                            accept="video/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                // Validate file type
                                if (!file.type.startsWith('video/')) {
                                  alert('Hanya file video yang diperbolehkan')
                                  return
                                }
                                
                                // Validate file size (max 100MB)
                                if (file.size > 100 * 1024 * 1024) {
                                  alert('Ukuran file terlalu besar. Maksimal 100MB')
                                  return
                                }
                                
                                setUploading(true)
                                setFileInfo({ name: file.name, size: file.size })
                                const url = URL.createObjectURL(file)
                                handleFieldChange(field.key, {
                                  _type: 'file',
                                  asset: { url },
                                  file: file
                                })
                                setUploading(false)
                              }
                            }}
                            className="admin-section-editor-file-input"
                          />
                          <label htmlFor={`${field.key}-${index}`} className="admin-section-editor-upload-label">
                            {uploading ? (
                              <>
                                <div className="admin-section-editor-loading">⏳</div>
                                <span>Mengupload video...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="admin-section-editor-icon" />
                                <span className="admin-section-editor-upload-title">Klik untuk memilih video</span>
                                <span className="admin-section-editor-upload-subtitle">atau drag & drop file di sini</span>
                                <span className="admin-section-editor-upload-hint">Format: MP4, WebM, MOV (Max 100MB)</span>
                              </>
                            )}
                          </label>
                        </div>
                      )
                    })()}
                  </div>
                )}

                {field.type === 'select' && (
                  <select
                    value={section[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="admin-section-editor-input"
                  >
                    {field.options?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'cta' && (
                  <div className="admin-section-editor-cta">
                    <div className="admin-section-editor-cta-field">
                      <label className="admin-section-editor-cta-label">Label</label>
                      <input
                        type="text"
                        value={section.cta?.label || ''}
                        onChange={(e) => handleCtaChange('label', e.target.value)}
                        className="admin-section-editor-input"
                        placeholder="Masukkan label tombol"
                      />
                    </div>
                    <div className="admin-section-editor-cta-field">
                      <label className="admin-section-editor-cta-label">Link</label>
                      <input
                        type="url"
                        value={section.cta?.href || ''}
                        onChange={(e) => handleCtaChange('href', e.target.value)}
                        className="admin-section-editor-input"
                        placeholder="Masukkan URL"
                      />
                    </div>
                  </div>
                )}

                {/* Features */}
                {field.type === 'features' && (
                  <div className="admin-section-editor-features">
                    <div className="admin-section-editor-features-header">
                      <h4>Daftar Fitur ({(section.features || []).length})</h4>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="admin-section-editor-add-feature"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Fitur
                      </button>
                    </div>
                    {(section.features || []).map((feature: any, featureIndex: number) => (
                      <div key={featureIndex} className="admin-section-editor-feature">
                        <div className="admin-section-editor-feature-header">
                          <h5>⭐ Fitur {featureIndex + 1}</h5>
                          <button
                            type="button"
                            onClick={() => removeFeature(featureIndex)}
                            className="admin-section-editor-remove-feature"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                        <div className="admin-section-editor-feature-fields">
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Judul Fitur</label>
                            <input
                              type="text"
                              value={feature.title || ''}
                              onChange={(e) => updateFeature(featureIndex, 'title', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="Judul fitur"
                            />
                          </div>
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Deskripsi Fitur</label>
                            <textarea
                              value={feature.description || ''}
                              onChange={(e) => updateFeature(featureIndex, 'description', e.target.value)}
                              className="admin-section-editor-textarea"
                              rows={2}
                              placeholder="Deskripsi fitur"
                            />
                          </div>
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Icon (emoji atau class)</label>
                            <input
                              type="text"
                              value={feature.icon || ''}
                              onChange={(e) => updateFeature(featureIndex, 'icon', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="⭐ atau icon-name"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(section.features || []).length === 0 && (
                      <div className="admin-section-editor-empty">
                        <p>Belum ada fitur. Klik "Tambah Fitur" untuk menambahkan.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Testimonials */}
                {field.type === 'testimonials' && (
                  <div className="admin-section-editor-testimonials">
                    <div className="admin-section-editor-testimonials-header">
                      <h4>Daftar Testimoni ({(section.testimonials || []).length})</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const currentTestimonials = section.testimonials || []
                          onUpdate(index, 'testimonials', [
                            ...currentTestimonials,
                            {
                              _key: Math.random().toString(36).substring(2, 11),
                              quote: '',
                              author: '',
                              role: '',
                              avatar: null
                            }
                          ])
                        }}
                        className="admin-section-editor-add-testimonial"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Testimoni
                      </button>
                    </div>
                    {(section.testimonials || []).map((testimonial: any, testimonialIndex: number) => (
                      <div key={testimonial._key || testimonialIndex} className="admin-section-editor-testimonial">
                        <div className="admin-section-editor-testimonial-header">
                          <h5>💬 Testimoni {testimonialIndex + 1}</h5>
                          <button
                            type="button"
                            onClick={() => {
                              const currentTestimonials = section.testimonials || []
                              const updatedTestimonials = currentTestimonials.filter((_: any, i: number) => i !== testimonialIndex)
                              onUpdate(index, 'testimonials', updatedTestimonials)
                            }}
                            className="admin-section-editor-remove-testimonial"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                        <div className="admin-section-editor-testimonial-fields">
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Quote / Testimoni</label>
                            <textarea
                              value={testimonial.quote || ''}
                              onChange={(e) => {
                                const currentTestimonials = section.testimonials || []
                                const updatedTestimonials = currentTestimonials.map((t: any, i: number) =>
                                  i === testimonialIndex ? { ...t, quote: e.target.value } : t
                                )
                                onUpdate(index, 'testimonials', updatedTestimonials)
                              }}
                              className="admin-section-editor-textarea"
                              rows={3}
                              placeholder="Testimoni pelanggan..."
                            />
                          </div>
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Nama Author</label>
                            <input
                              type="text"
                              value={testimonial.author || ''}
                              onChange={(e) => {
                                const currentTestimonials = section.testimonials || []
                                const updatedTestimonials = currentTestimonials.map((t: any, i: number) =>
                                  i === testimonialIndex ? { ...t, author: e.target.value } : t
                                )
                                onUpdate(index, 'testimonials', updatedTestimonials)
                              }}
                              className="admin-section-editor-input"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Role / Jabatan</label>
                            <input
                              type="text"
                              value={testimonial.role || ''}
                              onChange={(e) => {
                                const currentTestimonials = section.testimonials || []
                                const updatedTestimonials = currentTestimonials.map((t: any, i: number) =>
                                  i === testimonialIndex ? { ...t, role: e.target.value } : t
                                )
                                onUpdate(index, 'testimonials', updatedTestimonials)
                              }}
                              className="admin-section-editor-input"
                              placeholder="CEO, Company Name"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(section.testimonials || []).length === 0 && (
                      <div className="admin-section-editor-empty">
                        <p>Belum ada testimoni. Klik "Tambah Testimoni" untuk menambahkan.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Items - Content Section 1 */}
                {field.type === 'contentItems' && (
                  <div className="admin-section-editor-field">
                    <label className="admin-section-editor-field-label">{field.label}</label>
                    <button
                      type="button"
                      onClick={addContentItem}
                      className="admin-section-editor-toggle"
                      style={{ marginBottom: '12px' }}
                    >
                      <Plus size={14} />
                    </button>
                    <div className="admin-section-editor-gallery">
                      {(section.items || []).map((item: any, itemIndex: number) => (
                        <div key={item._key || itemIndex} className="admin-section-editor-gallery-item">
                          <div className="admin-section-editor-marker-header">
                            <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '14px' }}>
                              📄 Content Item #{itemIndex + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeContentItem(itemIndex)}
                              className="admin-section-editor-remove"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <div style={{ display: 'grid', gap: '16px' }}>
                            {/* Image Upload */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Gambar <span style={{color: '#ef4444'}}>*</span></label>
                              {(() => {
                                const imageUrl = getImageUrl(item.image)
                                if (imageUrl) {
                                  return (
                                    <div className="admin-section-editor-image-preview">
                                      <img 
                                        src={imageUrl} 
                                        alt="Preview" 
                                        className="admin-section-editor-preview-image"
                                        onError={(e) => {
                                          console.error('Image failed to load:', imageUrl)
                                          e.currentTarget.style.display = 'none'
                                        }}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => updateContentItem(itemIndex, 'image', null)}
                                        className="admin-section-editor-image-remove"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  )
                                }
                                
                                const inputId = `content-item-image-${index}-${itemIndex}`
                                return (
                                  <div className="admin-section-editor-upload">
                                    <input
                                      id={inputId}
                                      type="file"
                                      accept="image/*"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return

                                        if (!file.type.startsWith('image/')) {
                                          alert('File harus berupa gambar!')
                                          return
                                        }
                                        if (file.size > 5 * 1024 * 1024) {
                                          alert('Ukuran file maksimal 5MB!')
                                          return
                                        }

                                        const blobUrl = URL.createObjectURL(file)
                                        updateContentItem(itemIndex, 'image', {
                                          _type: 'image',
                                          asset: { url: blobUrl },
                                          file
                                        })
                                      }}
                                      style={{ display: 'none' }}
                                    />
                                    <label htmlFor={inputId} className="admin-section-editor-upload-label">
                                      <Upload size={32} />
                                      <span className="admin-section-editor-upload-title">
                                        Klik untuk memilih gambar
                                      </span>
                                      <span className="admin-section-editor-upload-subtitle">
                                        atau drag & drop file di sini
                                      </span>
                                      <span className="admin-section-editor-upload-hint">
                                        Format: JPG, PNG, GIF (Max 5MB)
                                      </span>
                                    </label>
                                  </div>
                                )
                              })()}
                            </div>

                            {/* Title */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Judul <span style={{color: '#ef4444'}}>*</span></label>
                              <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => updateContentItem(itemIndex, 'title', e.target.value)}
                                className="admin-section-editor-input"
                                placeholder="Judul content item..."
                              />
                            </div>

                            {/* Description (Optional) */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Deskripsi (opsional)</label>
                              <textarea
                                value={item.description || ''}
                                onChange={(e) => updateContentItem(itemIndex, 'description', e.target.value)}
                                className="admin-section-editor-textarea"
                                rows={3}
                                placeholder="Deskripsi singkat content item..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(section.items || []).length === 0 && (
                        <div className="admin-section-editor-empty">
                          <p>Belum ada content item. Klik tombol "+" untuk menambahkan.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Map Markers */}
                {field.type === 'markers' && (
                  <div className="admin-section-editor-markers">
                    <div className="admin-section-editor-markers-header">
                      <h4>Map Markers / Pointers ({(section.markers || []).length})</h4>
                      <button
                        type="button"
                        onClick={addMarker}
                        className="admin-section-editor-add-marker"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Marker
                      </button>
                    </div>
                    {(section.markers || []).map((marker: any, markerIndex: number) => (
                      <div key={marker._key || markerIndex} className="admin-section-editor-marker">
                        <div className="admin-section-editor-marker-header">
                          <h5>📍 Marker {marker.number || markerIndex + 1}</h5>
                          <button
                            type="button"
                            onClick={() => removeMarker(markerIndex)}
                            className="admin-section-editor-remove-marker"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                        <div className="admin-section-editor-marker-fields">
                          {/* Number */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Nomor Marker</label>
                            <input
                              type="text"
                              value={marker.number || ''}
                              onChange={(e) => updateMarker(markerIndex, 'number', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="01"
                            />
                          </div>

                          {/* Title */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Nama Lokasi</label>
                            <input
                              type="text"
                              value={marker.title || ''}
                              onChange={(e) => updateMarker(markerIndex, 'title', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="Plaza Kura-Kura"
                            />
                          </div>

                          {/* Description */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Deskripsi</label>
                            <textarea
                              value={marker.description || ''}
                              onChange={(e) => updateMarker(markerIndex, 'description', e.target.value)}
                              className="admin-section-editor-textarea"
                              rows={2}
                              placeholder="Deskripsi lokasi yang muncul di popup"
                            />
                          </div>

                          {/* Image Upload */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Gambar Lokasi</label>
                            {(() => {
                              const imageUrl = getImageUrl(marker.image)
                              return imageUrl ? (
                                <div className="admin-section-editor-image-preview">
                                  <img
                                    src={imageUrl}
                                    alt="Marker Preview"
                                    className="admin-section-editor-image-preview-img"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateMarker(markerIndex, 'image', null)}
                                    className="admin-section-editor-image-remove"
                                  >
                                    <X className="admin-section-editor-icon" />
                                  </button>
                                </div>
                              ) : (
                                <div className="admin-section-editor-upload">
                                  <input
                                    type="file"
                                    id={`marker-image-${index}-${markerIndex}`}
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        if (!file.type.startsWith('image/')) {
                                          alert('Hanya file gambar yang diperbolehkan')
                                          return
                                        }
                                        if (file.size > 5 * 1024 * 1024) {
                                          alert('Ukuran file terlalu besar. Maksimal 5MB')
                                          return
                                        }
                                        const url = URL.createObjectURL(file)
                                        updateMarker(markerIndex, 'image', {
                                          asset: { url },
                                          file: file
                                        })
                                      }
                                    }}
                                    className="admin-section-editor-file-input"
                                  />
                                  <label htmlFor={`marker-image-${index}-${markerIndex}`} className="admin-section-editor-upload-label">
                                    <Upload size={32} className="admin-section-editor-upload-icon" />
                                    <span className="admin-section-editor-upload-title">Pilih Gambar</span>
                                    <span className="admin-section-editor-upload-subtitle">atau drag & drop</span>
                                    <span className="admin-section-editor-upload-hint">JPG, PNG (Max 5MB)</span>
                                  </label>
                                </div>
                              )
                            })()}
                          </div>

                          {/* Position */}
                          <div className="admin-section-editor-position-grid">
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Top (px)</label>
                              <input
                                type="number"
                                value={marker.position?.top || 0}
                                onChange={(e) => updateMarker(markerIndex, 'position', {
                                  ...marker.position,
                                  top: parseInt(e.target.value) || 0
                                })}
                                className="admin-section-editor-input"
                                placeholder="0"
                              />
                            </div>
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Right (px)</label>
                              <input
                                type="number"
                                value={marker.position?.right || 0}
                                onChange={(e) => updateMarker(markerIndex, 'position', {
                                  ...marker.position,
                                  right: parseInt(e.target.value) || 0
                                })}
                                className="admin-section-editor-input"
                                placeholder="0"
                              />
                            </div>
                          </div>

                          {/* Link (Optional) */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Link Detail (opsional)</label>
                            <input
                              type="text"
                              value={marker.link || ''}
                              onChange={(e) => updateMarker(markerIndex, 'link', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="/facility/plaza-kura-kura"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(section.markers || []).length === 0 && (
                      <div className="admin-section-editor-empty">
                        <p>Belum ada marker. Klik "Tambah Marker" untuk menambahkan pointer lokasi pada map.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Activity Gallery */}
                {field.type === 'gallery' && (
                  <div className="admin-section-editor-gallery">
                    <div className="admin-section-editor-gallery-header">
                      <h4>Activity Gallery ({(section.gallery || []).length})</h4>
                      <button
                        type="button"
                        onClick={addGalleryItem}
                        className="admin-section-editor-add-gallery"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Activity
                      </button>
                    </div>
                    {(section.gallery || []).map((item: any, galleryIndex: number) => (
                      <div key={item._key || galleryIndex} className="admin-section-editor-gallery-item">
                        <div className="admin-section-editor-gallery-item-header">
                          <h5>🎨 Activity {galleryIndex + 1}</h5>
                          <button
                            type="button"
                            onClick={() => removeGalleryItem(galleryIndex)}
                            className="admin-section-editor-remove-gallery"
                          >
                            <X className="admin-section-editor-icon" />
                          </button>
                        </div>
                        <div className="admin-section-editor-gallery-item-fields">
                          {/* Title */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Judul Activity</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => updateGalleryItem(galleryIndex, 'title', e.target.value)}
                              className="admin-section-editor-input"
                              placeholder="Top of The Statue Tour"
                            />
                          </div>

                          {/* Image Upload */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Gambar Activity</label>
                            {(() => {
                              const imageUrl = getImageUrl(item.image)
                              return imageUrl ? (
                                <div className="admin-section-editor-image-preview">
                                  <img
                                    src={imageUrl}
                                    alt="Activity Preview"
                                    className="admin-section-editor-image-preview-img"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateGalleryItem(galleryIndex, 'image', null)}
                                    className="admin-section-editor-image-remove"
                                  >
                                    <X className="admin-section-editor-icon" />
                                  </button>
                                </div>
                              ) : (
                                <div className="admin-section-editor-upload">
                                  <input
                                    type="file"
                                    id={`gallery-image-${index}-${galleryIndex}`}
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        if (!file.type.startsWith('image/')) {
                                          alert('Hanya file gambar yang diperbolehkan')
                                          return
                                        }
                                        if (file.size > 5 * 1024 * 1024) {
                                          alert('Ukuran file terlalu besar. Maksimal 5MB')
                                          return
                                        }
                                        const url = URL.createObjectURL(file)
                                        updateGalleryItem(galleryIndex, 'image', {
                                          asset: { url },
                                          file: file
                                        })
                                      }
                                    }}
                                    className="admin-section-editor-file-input"
                                  />
                                  <label htmlFor={`gallery-image-${index}-${galleryIndex}`} className="admin-section-editor-upload-label">
                                    <Upload size={32} className="admin-section-editor-upload-icon" />
                                    <span className="admin-section-editor-upload-title">Pilih Gambar</span>
                                    <span className="admin-section-editor-upload-subtitle">atau drag & drop</span>
                                    <span className="admin-section-editor-upload-hint">JPG, PNG (Max 5MB)</span>
                                  </label>
                                </div>
                              )
                            })()}
                          </div>

                          {/* Description (Optional) */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Deskripsi (opsional)</label>
                            <textarea
                              value={item.description || ''}
                              onChange={(e) => updateGalleryItem(galleryIndex, 'description', e.target.value)}
                              className="admin-section-editor-textarea"
                              rows={2}
                              placeholder="Deskripsi singkat activity..."
                            />
                          </div>

                          {/* CTA (Optional) */}
                          <div className="admin-section-editor-field">
                            <label className="admin-section-editor-field-label">Call to Action (opsional)</label>
                            <div className="admin-section-editor-cta">
                              <div className="admin-section-editor-cta-field">
                                <label className="admin-section-editor-cta-label">Label Button</label>
                                <input
                                  type="text"
                                  value={item.cta?.label || ''}
                                  onChange={(e) => updateGalleryItem(galleryIndex, 'cta', {
                                    ...item.cta,
                                    label: e.target.value
                                  })}
                                  className="admin-section-editor-input"
                                  placeholder="Learn More"
                                />
                              </div>
                              <div className="admin-section-editor-cta-field">
                                <label className="admin-section-editor-cta-label">Link URL</label>
                                <input
                                  type="text"
                                  value={item.cta?.href || ''}
                                  onChange={(e) => updateGalleryItem(galleryIndex, 'cta', {
                                    ...item.cta,
                                    href: e.target.value
                                  })}
                                  className="admin-section-editor-input"
                                  placeholder="/activity/statue-tour"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(section.gallery || []).length === 0 && (
                      <div className="admin-section-editor-empty">
                        <p>Belum ada activity. Klik "Tambah Activity" untuk menambahkan item ke gallery.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Items - Content Section 2 */}
                {field.type === 'contentItems2' && (
                  <div className="admin-section-editor-field">
                    <div className="admin-section-editor-gallery-header" style={{ marginTop: '16px' }}>
                      <h4>{field.label} ({(section.items || []).length})</h4>
                      <button
                        type="button"
                        onClick={addContentItem2}
                        className="admin-section-editor-add-gallery"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Item
                      </button>
                    </div>
                    <div className="admin-section-editor-gallery">
                      {(section.items || []).map((item: any, itemIndex: number) => (
                        <div key={item._key || itemIndex} className="admin-section-editor-gallery-item">
                          <div className="admin-section-editor-gallery-item-header">
                            <h5>Item #{itemIndex + 1}</h5>
                            <button
                              type="button"
                              onClick={() => removeContentItem2(itemIndex)}
                              className="admin-section-editor-remove-gallery"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <div className="admin-section-editor-gallery-item-fields">
                            {/* Image Upload */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">Gambar Item <span className="admin-section-editor-required">*</span></label>
                              {(() => {
                                const imageUrl = getImageUrl(item.image)
                                if (imageUrl) {
                                  return (
                                    <div className="admin-section-editor-image-preview">
                                      <img src={imageUrl} alt="Preview" className="admin-section-editor-image-preview-img" />
                                      <button
                                        type="button"
                                        onClick={() => updateContentItem2(itemIndex, 'image', null)}
                                        className="admin-section-editor-image-remove"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  )
                                }
                                const inputId = `cs2-item-image-${index}-${itemIndex}`
                                return (
                                  <div className="admin-section-editor-upload">
                                    <input
                                      id={inputId}
                                      type="file"
                                      accept="image/*"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return
                                        const blobUrl = URL.createObjectURL(file)
                                        updateContentItem2(itemIndex, 'image', {
                                            _type: 'image',
                                            asset: { url: blobUrl },
                                            file
                                          })
                                        }}
                                        className="admin-section-editor-file-input"
                                      />
                                      <label htmlFor={inputId} className="admin-section-editor-upload-label">
                                        <Upload size={32} />
                                        <span>Pilih Gambar</span>
                                      </label>
                                    </div>
                                  )
                                })()}
                              </div>

                              {/* Title */}
                              <div className="admin-section-editor-field">
                                <label className="admin-section-editor-field-label">Judul Item <span className="admin-section-editor-required">*</span></label>
                                <input
                                  type="text"
                                  value={item.title || ''}
                                  onChange={(e) => updateContentItem2(itemIndex, 'title', e.target.value)}
                                  className="admin-section-editor-input"
                                  placeholder="Judul item..."
                                />
                              </div>

                              {/* CTA */}
                              <div className="admin-section-editor-field">
                                <label className="admin-section-editor-field-label">Call to Action (CTA) <span className="admin-section-editor-required">*</span></label>
                                <div className="admin-section-editor-cta">
                                  <input
                                    type="text"
                                    value={item.cta?.label || ''}
                                    onChange={(e) => updateContentItem2(itemIndex, 'cta', e.target.value, 'label')}
                                    className="admin-section-editor-input"
                                    placeholder="Label Tombol (e.g., 'Lihat Detail')"
                                  />
                                  <input
                                    type="text"
                                    value={item.cta?.link || ''}
                                    onChange={(e) => updateContentItem2(itemIndex, 'cta', e.target.value, 'link')}
                                    className="admin-section-editor-input"
                                    placeholder="Link URL (e.g., '/halaman/detail')"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {(section.items || []).length === 0 && (
                          <div className="admin-section-editor-empty">
                            <p>Belum ada item. Klik "Tambah Item" untuk menambahkan.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* CTA Links - Content Section 3 */}
                {field.type === 'ctaLinks' && (
                  <div className="admin-section-editor-field">
                    <div className="admin-section-editor-cta-header">
                      <h4>{field.label} ({(section.ctaLinks || []).length})</h4>
                      <button
                        type="button"
                        onClick={addCtaLink}
                        className="admin-section-editor-add-cta"
                      >
                        <Plus size={16} />
                        Tambah Link
                      </button>
                    </div>
                    
                    {(section.ctaLinks || []).length > 0 && (
                      <div className="admin-section-editor-cta-table">
                        <div className="admin-section-editor-cta-table-header">
                          <div>Nama Link</div>
                          <div>URL</div>
                          <div>Warna Text</div>
                          <div></div>
                        </div>
                        {(section.ctaLinks || []).map((link: any, linkIndex: number) => {
                          const selectedColor = COLOR_PALETTE.find(c => c.value === (link.textColor || 'black'))
                          return (
                            <div key={link._key || linkIndex} className="admin-section-editor-cta-table-row">
                              <input
                                type="text"
                                value={link.name || ''}
                                onChange={(e) => updateCtaLink(linkIndex, 'name', e.target.value)}
                                className="admin-section-editor-cta-input"
                                placeholder="Buy Ticket"
                              />
                              <input
                                type="text"
                                value={link.link || ''}
                                onChange={(e) => updateCtaLink(linkIndex, 'link', e.target.value)}
                                className="admin-section-editor-cta-input"
                                placeholder="/buy-ticket"
                              />
                              <div className="admin-section-editor-cta-color-wrapper" ref={colorPickerOpen === linkIndex ? colorPickerRef : null}>
                                <button
                                  type="button"
                                  onClick={() => setColorPickerOpen(colorPickerOpen === linkIndex ? null : linkIndex)}
                                  className="admin-section-editor-cta-color-button"
                                >
                                  <span 
                                    className="admin-section-editor-cta-color-preview"
                                    style={{ backgroundColor: selectedColor?.color }}
                                  ></span>
                                  <span>{selectedColor?.label}</span>
                                </button>
                                {colorPickerOpen === linkIndex && (
                                  <div className="admin-section-editor-color-popup">
                                    <div className="admin-section-editor-color-popup-grid">
                                      {COLOR_PALETTE.map((colorOption) => (
                                        <button
                                          key={colorOption.value}
                                          type="button"
                                          onClick={() => {
                                            updateCtaLink(linkIndex, 'textColor', colorOption.value)
                                            setColorPickerOpen(null)
                                          }}
                                          className={`admin-section-editor-color-popup-item ${
                                            (link.textColor || 'black') === colorOption.value ? 'active' : ''
                                          }`}
                                          title={colorOption.label}
                                        >
                                          <span 
                                            className="admin-section-editor-color-popup-box"
                                            style={{ backgroundColor: colorOption.color }}
                                          ></span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCtaLink(linkIndex)}
                                className="admin-section-editor-cta-remove"
                                title="Hapus link"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                    
                    {(section.ctaLinks || []).length === 0 && (
                      <div className="admin-section-editor-empty">
                        <p>Belum ada CTA link. Klik "Tambah Link" untuk menambahkan.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Gallery Photos - Content Section 3 */}
                {field.type === 'galleryPhotos' && (
                  <div className="admin-section-editor-field">
                    <div className="admin-section-editor-gallery-header" style={{ marginTop: '16px' }}>
                      <h4>{field.label} ({(section.gallery || []).length})</h4>
                      <button
                        type="button"
                        onClick={addGalleryPhoto}
                        className="admin-section-editor-add-gallery"
                      >
                        <Plus className="admin-section-editor-icon" />
                        Tambah Foto
                      </button>
                    </div>
                    <div className="admin-section-editor-gallery-grid">
                      {(section.gallery || []).map((photo: any, photoIndex: number) => (
                        <div key={photo._key || photoIndex} className="admin-section-editor-gallery-item">
                          <div className="admin-section-editor-gallery-item-header">
                            <h5>📷 Foto #{photoIndex + 1}</h5>
                            <button
                              type="button"
                              onClick={() => removeGalleryPhoto(photoIndex)}
                              className="admin-section-editor-remove-gallery"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <div className="admin-section-editor-gallery-item-fields">
                            {/* Image Upload */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">
                                Foto <span className="admin-section-editor-required">*</span>
                              </label>
                              {(() => {
                                const imageUrl = getImageUrl(photo.image)
                                if (imageUrl) {
                                  return (
                                    <div className="admin-section-editor-image-preview">
                                      <img src={imageUrl} alt="Preview" className="admin-section-editor-image-preview-img" />
                                      <button
                                        type="button"
                                        onClick={() => updateGalleryPhoto(photoIndex, 'image', null)}
                                        className="admin-section-editor-image-remove"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  )
                                }
                                const inputId = `gallery-photo-${index}-${photoIndex}`
                                return (
                                  <div className="admin-section-editor-upload">
                                    <input
                                      id={inputId}
                                      type="file"
                                      accept="image/*"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return
                                        
                                        // Validate file type
                                        if (!file.type.startsWith('image/')) {
                                          alert('Hanya file gambar yang diperbolehkan')
                                          return
                                        }
                                        
                                        // Validate file size (max 5MB)
                                        if (file.size > 5 * 1024 * 1024) {
                                          alert('Ukuran file terlalu besar. Maksimal 5MB')
                                          return
                                        }
                                        
                                        setUploading(true)
                                        const url = URL.createObjectURL(file)
                                        updateGalleryPhoto(photoIndex, 'image', {
                                          asset: { url },
                                          file: file
                                        })
                                        setUploading(false)
                                      }}
                                      style={{ display: 'none' }}
                                    />
                                    <label htmlFor={inputId} className="admin-section-editor-upload-label">
                                      <Upload className="admin-section-editor-icon" />
                                      <span>{uploading ? 'Uploading...' : 'Upload Foto'}</span>
                                    </label>
                                  </div>
                                )
                              })()}
                            </div>

                            {/* Title Foto */}
                            <div className="admin-section-editor-field">
                              <label className="admin-section-editor-field-label">
                                Nama/Title Foto <span className="admin-section-editor-required">*</span>
                              </label>
                              <input
                                type="text"
                                value={photo.title || ''}
                                onChange={(e) => updateGalleryPhoto(photoIndex, 'title', e.target.value)}
                                className="admin-section-editor-input"
                                placeholder="Contoh: Garuda Wisnu Statue, Traditional Dance"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(section.gallery || []).length === 0 && (
                        <div className="admin-section-editor-empty">
                          <p>Belum ada foto. Klik "Tambah Foto" untuk menambahkan ke gallery.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
