"use client"

import { useState, useCallback } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { 
  GripVertical, 
  Plus, 
  Trash2
} from "lucide-react"
import SectionEditor from "./SectionEditor"
import SectionSelector from "./SectionSelector"
import "./section-components.css"

interface Section {
  _type: string
  _id?: string
  _key?: string
  title?: string
  subtitle?: string
  description?: string
  content?: string
  media?: {
    asset?: {
      url?: string
      _ref?: string
    }
    file?: File
  } | null
  cta?: {
    label?: string
    href?: string
  }
  features?: Array<{
    _type?: string
    _key?: string
    title?: string
    heading?: string
    description?: string
    body?: string
    icon?: string | null | unknown
  }>
  [key: string]: unknown
}

interface SectionBuilderProps {
  sections: Section[]
  onUpdateSections: (sections: Section[]) => void
}

// Mapping icon untuk tiap section type
const sectionIcons: Record<string, string> = {
  heroSection: '🎯',
  heroSection3: '🎯',
  featureSection: '⭐',
  testimonialSection: '💬',
  mapSection: '🗺️',
  activitySection: '🎨',
  contentSection1: '📄',
  contentSection2: '📑',
  contentSection3: '📋',
}

// Mapping nama untuk tiap section type
const sectionNames: Record<string, string> = {
  heroSection: 'Hero Section',
  heroSection3: 'Hero Section',
  featureSection: 'Feature Section',
  testimonialSection: 'Testimonial Section',
  mapSection: 'Map Section',
  activitySection: 'Activity Section',
  contentSection1: 'Content Section 1',
  contentSection2: 'Content Section 2',
  contentSection3: 'Content Section 3',
}

interface SortableSectionItemProps {
  section: Section
  index: number
  isActive: boolean
  onClick: () => void
  onRemove: (index: number) => void
}

// Component untuk item di sidebar (draggable)
function SortableSectionItem({ section, index, isActive, onClick, onRemove }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id || `section-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const sectionName = sectionNames[section._type] || section._type
  const sectionIcon = sectionIcons[section._type] || '📄'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`admin-section-sidebar-item ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
    >
      <div className="admin-section-sidebar-item-drag" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="admin-section-sidebar-item-content">
        <span className="admin-section-sidebar-item-icon">{sectionIcon}</span>
        <span className="admin-section-sidebar-item-name">{sectionName}</span>
        {section.title && <span className="admin-section-sidebar-item-title">{section.title}</span>}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (confirm('Hapus section ini?')) {
            onRemove(index)
          }
        }}
        className="admin-section-sidebar-item-remove"
        title="Hapus section"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

export default function SectionBuilder({ sections, onUpdateSections }: SectionBuilderProps) {
  const [showSectionSelector, setShowSectionSelector] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0) // Index section yang sedang di-edit

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Helper function untuk upload file (gambar atau video)
  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return {
      _type: file.type.startsWith('image/') ? 'image' : 'file',
      asset: {
        _type: 'reference',
        _ref: data.asset._id,
        url: data.asset.url // Simpan URL untuk preview instan
      }
    }
  }, [])

  const addSection = useCallback(async (type: string) => {
    console.log('🔵 [SectionBuilder] addSection called with type:', type)
    
    const { sectionFactories } = await import('@/app/admin/sectionPresets')
    
    let newSection: Section
    if (sectionFactories[type as keyof typeof sectionFactories]) {
      newSection = sectionFactories[type as keyof typeof sectionFactories]()
      console.log('🔵 [SectionBuilder] Section created from factory:', newSection._type)
    } else {
      newSection = {
        _type: type,
        _id: Math.random().toString(36).substring(2, 11),
        _key: Math.random().toString(36).substring(2, 11),
        title: '',
        content: ''
      }
      console.log('🔵 [SectionBuilder] Section created (fallback):', newSection._type)
    }
    
    if (!newSection._id) {
      newSection._id = Math.random().toString(36).substring(2, 11)
    }
    
    const updated = [...sections, newSection]
    console.log('🔵 [SectionBuilder] Sections updated. New total:', updated.length)
    console.log('🔵 [SectionBuilder] Added section type:', newSection._type)
    setActiveIndex(updated.length - 1)
    onUpdateSections(updated)
    
    setShowSectionSelector(false)
  }, [onUpdateSections])

  const updateSection = useCallback(async (index: number, field: string, value: unknown) => {
    console.log(`🔵 [SectionBuilder] updateSection called for index ${index}, field: ${field}`)
    // If it's an image or video field with a file, upload it first
    if ((field === 'media' || field === 'image' || field === 'mapImage' || field === 'flyer' || field === 'video' || field === 'mainImage' || field === 'mainVideo') && value && typeof value === 'object' && 'file' in value && value.file) {
      try {
        value = await uploadFile((value as { file: File }).file)
      } catch (error) {
        console.error(`Error uploading ${field} file:`, error)
        alert(`Gagal mengupload ${field} file. Silakan coba lagi.`) // Lebih spesifik
        return
      }
    }

    // Handle nested array items (markers, gallery, contentItems)
    // Markers
    if (field === 'markers' && Array.isArray(value)) {
      try {
        const uploadedMarkers = await Promise.all(
          value.map(async (marker: unknown) => {
            if (marker && typeof marker === 'object' && 'image' in marker && marker.image && typeof marker.image === 'object' && 'file' in marker.image && marker.image.file) {
              return { ...marker, image: await uploadFile((marker.image as { file: File }).file) }
            }
            return marker
          })
        )
        value = uploadedMarkers
      } catch (error) {
        console.error('Error uploading marker images:', error)
        alert('Gagal mengupload gambar marker. Silakan coba lagi.')
        return
      }
    }

    // Gallery
    if (field === 'gallery' && Array.isArray(value)) {
      try {
        const uploadedGallery = await Promise.all(
          value.map(async (item: unknown) => {
            if (item && typeof item === 'object' && 'image' in item && item.image && typeof item.image === 'object' && 'file' in item.image && item.image.file) {
              return { ...item, image: await uploadFile((item.image as { file: File }).file) }
            }
            return item
          })
        )
        value = uploadedGallery
      } catch (error) {
        console.error('Error uploading gallery images:', error)
        alert('Gagal mengupload gambar gallery. Silakan coba lagi.')
        return
      }
    }

    // Content Items
    if (field === 'items' && Array.isArray(value)) {
      try {
        const uploadedItems = await Promise.all(
          value.map(async (item: unknown) => {
            if (item && typeof item === 'object' && 'image' in item && item.image && typeof item.image === 'object' && 'file' in item.image && item.image.file) {
              return { ...item, image: await uploadFile((item.image as { file: File }).file) }
            }
            return item
          })
        )
        value = uploadedItems
      } catch (error) {
        console.error('Error uploading content item images:', error)
        alert('Gagal mengupload gambar content item. Silakan coba lagi.')
        return
      }
    }

    const newSections = sections.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    )
    onUpdateSections(newSections)
  }, [onUpdateSections, uploadFile])

  const removeSection = useCallback((indexToRemove: number) => {
    const updatedSections = sections.filter((_, i) => i !== indexToRemove)
    // Sesuaikan activeIndex jika section yang aktif dihapus atau section sebelumnya dihapus
    if (activeIndex === indexToRemove) {
      setActiveIndex(Math.max(0, indexToRemove - 1)); // Pindah ke sebelumnya atau 0
    } else if (activeIndex > indexToRemove) {
      setActiveIndex(prev => prev - 1);
    }
    onUpdateSections(updatedSections)
  }, [onUpdateSections, activeIndex])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(s => s._id === active.id || `section-${sections.indexOf(s)}` === active.id)
      const newIndex = sections.findIndex(s => s._id === over?.id || `section-${sections.indexOf(s)}` === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(sections, oldIndex, newIndex)
        
        // Update active index jika section yang aktif dipindah
        if (activeIndex === oldIndex) {
          setActiveIndex(newIndex)
        } else if (activeIndex === newIndex) {
          setActiveIndex(oldIndex)
        }
        onUpdateSections(reordered)
      }
    }
  }, [onUpdateSections, activeIndex])

  return (
    <div className="admin-section-builder">
      <div className="admin-section-builder-header">
        <h3 className="admin-section-builder-title">Bagian Halaman ({sections.length})</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => {
              console.log('🔍 ===== DEBUG STATE =====')
              console.log('🔍 Sections:', sections)
              console.log('🔍 Count:', sections.length)
              console.log('🔍 Types:', sections.map(s => s._type))
              console.log('🔍 Active:', activeIndex)
              alert(`Sections: ${sections.length}\nTypes: ${sections.map(s => s._type).join(', ')}\nActive: ${activeIndex}`)
            }}
            style={{
              padding: '8px 12px',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            🔍 Debug
          </button>
          <button
            type="button"
            onClick={() => setShowSectionSelector(true)}
            className="admin-button-secondary"
          >
            <Plus className="admin-button-icon" />
            Tambah Section
          </button>
        </div>
      </div>

      {sections.length === 0 ? (
        /* Empty state */
        <div className="admin-form-empty-sections">
          <div className="admin-form-empty-sections-content">
            <div className="admin-form-empty-sections-icon">📄</div>
            <h3>Belum ada section</h3>
            <p>Tambahkan section untuk membangun halaman yang menarik</p>
            <button
              type="button"
              onClick={() => setShowSectionSelector(true)}
              className="admin-button-primary"
            >
              <Plus className="admin-button-icon" />
              Tambah Section Pertama
            </button>
          </div>
        </div>
      ) : (
        /* Grid Layout: Sidebar Kiri + Form Kanan */
        <div className="admin-section-builder-grid">
          {/* Sidebar Kiri - List sections (draggable) */}
          <div className="admin-section-builder-sidebar">
            <div className="admin-section-builder-sidebar-header">
              <span className="admin-section-builder-sidebar-count">
                {sections.length} Section{sections.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s, i) => s._id || `section-${i}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="admin-section-builder-sidebar-list">
                  {sections.map((section, index) => (
                    <SortableSectionItem
                      key={section._id || `section-${index}`}
                      section={section}
                      index={index}
                      isActive={activeIndex === index}
                      onClick={() => setActiveIndex(index)}
                      onRemove={removeSection}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Form Kanan - Edit section yang aktif */}
          <div className="admin-section-builder-form">
            {sections[activeIndex] && (
              <SectionEditor
                section={sections[activeIndex]}
                index={activeIndex}
                onUpdate={updateSection}
                onRemove={removeSection}
              />
            )}
          </div>
        </div>
      )}

      {/* Section Selector Modal */}
      {showSectionSelector && (
        <SectionSelector
          onAddSection={(type) => {
            addSection(type)
            // Set active ke section yang baru ditambah
            setActiveIndex(sections.length)
          }}
          onClose={() => setShowSectionSelector(false)}
        />
      )}
    </div>
  )
}