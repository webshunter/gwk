"use client"

import { useState } from "react"
import { Plus, Search, X, Layout } from "lucide-react"
import "./section-components.css"

interface SectionSelectorProps {
  onAddSection: (sectionType: string) => void
  onClose: () => void
}

// Template configurations
const pageTemplates = [
  {
    id: 'template-1',
    name: 'Template 1',
    description: 'Homepage Complete',
    icon: '🏠',
    sections: ['heroSection', 'mapSection', 'activitySection']
  },
  {
    id: 'template-2',
    name: 'Template 2',
    description: 'Landing Page',
    icon: '📄',
    sections: ['heroSection', 'contentSection1']
  },
  {
    id: 'template-3',
    name: 'Template 3',
    description: 'Hero Section 3 + Content Section 2',
    icon: '⭐',
    sections: ['heroSection3', 'contentSection2']
  },
  {
    id: 'template-4',
    name: 'Template 4',
    description: 'Content Page',
    icon: '📝',
    sections: ['heroSection', 'textSection', 'imageSection']
  }
]

const availableSections = [
  {
    type: 'heroSection',
    title: 'Hero Section',
    description: 'Bagian utama dengan judul besar, deskripsi, dan call-to-action',
    icon: '🎯',
    color: 'blue'
  },
  {
    type: 'heroSection3',
    title: 'Hero Section',
    description: 'Alternative hero layout dengan background image dan CTA',
    icon: '🎯',
    color: 'blue'
  },
  {
    type: 'featureSection',
    title: 'Feature Section',
    description: 'Menampilkan daftar fitur atau keunggulan dengan ikon',
    icon: '⭐',
    color: 'green'
  },
  {
    type: 'testimonialSection',
    title: 'Testimonial Section',
    description: 'Menampilkan testimoni atau review dari pengunjung',
    icon: '💬',
    color: 'purple'
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
  {
    type: 'contentSection1',
    title: 'Content Section 1',
    description: 'Content items dengan gambar, title, dan deskripsi',
    icon: '📄',
    color: 'gray'
  },
  {
    type: 'contentSection2',
    title: 'Content Section 2',
    description: 'Deskripsi, media utama (gambar/video), dan daftar item dengan CTA.',
    icon: '📑',
    color: 'yellow'
  },
  {
    type: 'contentSection3',
    title: 'Content Section 3',
    description: 'CTA links dengan warna custom, video, title, deskripsi, dan gallery foto',
    icon: '📋',
    color: 'indigo'
  },
  {
    type: 'textSection',
    title: 'Text Section',
    description: 'Bagian teks sederhana dengan judul dan konten',
    icon: '📝',
    color: 'gray'
  },
  {
    type: 'imageSection',
    title: 'Image Section',
    description: 'Menampilkan gambar dengan caption atau deskripsi',
    icon: '🖼️',
    color: 'orange'
  },
  {
    type: 'videoSection',
    title: 'Video Section',
    description: 'Menampilkan video dengan judul dan deskripsi',
    icon: '🎥',
    color: 'red'
  },
  {
    type: 'gallerySection',
    title: 'Gallery Section',
    description: 'Menampilkan galeri gambar dalam grid atau carousel',
    icon: '🖼️',
    color: 'indigo'
  },
  {
    type: 'contactSection',
    title: 'Contact Section',
    description: 'Informasi kontak dan form kontak',
    icon: '📞',
    color: 'teal'
  }
]

export default function SectionSelector({ onAddSection, onClose }: SectionSelectorProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'sections'>('templates')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSections = availableSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTemplate = (template: typeof pageTemplates[0]) => {
    console.log('🟢 [SectionSelector] Template clicked:', template.name, '(', template.id, ')')
    console.log('🟢 [SectionSelector] Template sections:', template.sections)
    
    template.sections.forEach((sectionType, index) => {
      setTimeout(() => {
        console.log(`🟢 [SectionSelector] Executing onAddSection for: ${sectionType} (index ${index})`)
        onAddSection(sectionType)
      }, index * 100) // Small delay to ensure each section is properly initialized
    })
    
    const totalDelay = template.sections.length * 100 + 200 // Tambah buffer 200ms
    setTimeout(() => {
      console.log('🟢 [SectionSelector] Closing modal')
      onClose()
    }, totalDelay)
  }

  const getColorClass = (color: string) => {
    const colorMap = {
      blue: 'admin-section-selector-blue',
      green: 'admin-section-selector-green',
      purple: 'admin-section-selector-purple',
      gray: 'admin-section-selector-gray',
      orange: 'admin-section-selector-orange',
      red: 'admin-section-selector-red',
      indigo: 'admin-section-selector-indigo',
      teal: 'admin-section-selector-teal',
      yellow: 'admin-section-selector-yellow'
    }
    return colorMap[color as keyof typeof colorMap] || 'admin-section-selector-gray'
  }

  return (
    <div className="admin-section-selector">
      <div className="admin-section-selector-overlay" onClick={onClose}></div>
      <div className="admin-section-selector-modal">
        <div className="admin-section-selector-header">
          <h2 className="admin-section-selector-title">Pilih Template atau Section</h2>
          <button
            type="button"
            onClick={onClose}
            className="admin-section-selector-close"
          >
            <X className="admin-section-selector-icon" />
          </button>
        </div>

        {/* Tabs */}
        <div className="admin-section-selector-tabs">
          <button
            type="button"
            className={`admin-section-selector-tab ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <Layout size={16} />
            <span>Page Templates</span>
          </button>
          <button
            type="button"
            className={`admin-section-selector-tab ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            <Plus size={16} />
            <span>Individual Sections</span>
          </button>
        </div>

        {/* Search - only show for sections tab */}
        {activeTab === 'sections' && (
          <div className="admin-section-selector-search">
            <div className="admin-section-selector-search-input">
              <Search className="admin-section-selector-search-icon" />
              <input
                type="text"
                placeholder="Cari jenis section..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-section-selector-search-field"
              />
            </div>
          </div>
        )}

        <div className="admin-section-selector-content">
          {activeTab === 'templates' ? (
            /* Templates View */
            <div className="admin-section-selector-templates">
              {pageTemplates.map((template) => (
                <div
                  key={template.id}
                  className="admin-section-selector-template-card"
                  onClick={() => handleAddTemplate(template)}
                >
                  <div className="admin-section-selector-template-icon">
                    {template.icon}
                  </div>
                  <div className="admin-section-selector-template-content">
                    <h3 className="admin-section-selector-template-name">
                      {template.name}
                    </h3>
                    <p className="admin-section-selector-template-description">
                      {template.description}
                    </p>
                    <div className="admin-section-selector-template-sections">
                      {template.sections.map((sectionType) => {
                        const section = availableSections.find(s => s.type === sectionType)
                        return section ? (
                          <span key={sectionType} className="admin-section-selector-template-badge">
                            {section.icon} {section.title}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                  <div className="admin-section-selector-template-action">
                    <Plus size={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Sections View */
            filteredSections.length === 0 ? (
              <div className="admin-section-selector-empty">
                <p>Tidak ada section yang ditemukan untuk "{searchTerm}"</p>
              </div>
            ) : (
              <div className="admin-section-selector-grid">
                {filteredSections.map((section) => (
                  <div
                    key={section.type}
                    className={`admin-section-selector-item ${getColorClass(section.color)}`}
                    onClick={() => {
                      onAddSection(section.type)
                      onClose()
                    }}
                  >
                    <div className="admin-section-selector-item-icon">
                      {section.icon}
                    </div>
                    <div className="admin-section-selector-item-content">
                      <h3 className="admin-section-selector-item-title">
                        {section.title}
                      </h3>
                      <p className="admin-section-selector-item-description">
                        {section.description}
                      </p>
                    </div>
                    <div className="admin-section-selector-item-action">
                      <Plus className="admin-section-selector-icon" />
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}