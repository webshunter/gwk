"use client"

import { useState } from "react"
import { 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Image, 
  Type, 
  Link,
  Plus,
  X,
  Upload
} from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import "./section-components.css"

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
  }
}

export default function SectionEditor({ section, index, onUpdate, onRemove }: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileInfo, setFileInfo] = useState<{name: string, size: number} | null>(null)
  
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
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
