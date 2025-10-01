"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Eye,
  Plus
} from "lucide-react"
import SectionBuilder from "../components/SectionBuilder"
import "../../design/custom-admin.css"
import { useCallback } from "react"

interface Section {
  _type: string
  title?: string
  content?: string
  [key: string]: any
}

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<'info' | 'sections'>('info') // Step flow
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    sections: [] as Section[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSectionsUpdate = useCallback((updater: (prevSections: Section[]) => Section[]) => {
    setFormData(prev => ({
      ...prev,
      sections: updater(prev.sections)
    }))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }


  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Judul halaman wajib diisi'
    }

    // Slug boleh kosong (untuk homepage)
    if (formData.slug.trim() && !/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateBasicInfo()) {
      setCurrentStep('sections')
    }
  }

  const handleBack = () => {
    setCurrentStep('info')
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!validateBasicInfo()) {
      setCurrentStep('info')
      return
    }

    // Validate sections
    if (formData.sections.length === 0) {
      alert('Minimal harus ada satu section')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          summary: formData.summary,
          sections: formData.sections
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert('Halaman berhasil dibuat!')
        router.push('/admin/pages')
      } else {
        const error = await response.json()
        console.error('Error creating page:', error)
        alert(`Gagal membuat halaman: ${error.error || 'Silakan coba lagi.'}`)
      }
    } catch (error) {
      console.error('Error creating page:', error)
      alert('Terjadi kesalahan saat membuat halaman')
    } finally {
      setLoading(false)
    }
  }

  // Jika di step 1: tampilkan form informasi dasar
  if (currentStep === 'info') {
    return (
      <div className="admin-create-page">
        {/* Header */}
        <div className="admin-create-page-header">
          <button
            onClick={() => router.back()}
            className="admin-button-secondary"
          >
            <ArrowLeft className="admin-button-icon" />
            Kembali
          </button>
          <div className="admin-create-page-title">
            <h1>Buat Halaman Baru</h1>
            <p>Langkah 1: Informasi Dasar</p>
          </div>
        </div>

        {/* Form Informasi Dasar */}
        <div className="admin-create-page-form">
          <div className="admin-create-page-content">
            <div className="admin-form-section">
              <h2 className="admin-form-section-title">Informasi Dasar</h2>
              
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Judul Halaman *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`admin-form-input ${errors.title ? 'admin-form-input-error' : ''}`}
                  placeholder="Masukkan judul halaman"
                />
                {errors.title && (
                  <span className="admin-form-error">{errors.title}</span>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  URL Slug
                </label>
                <div className="admin-form-slug">
                  <span className="admin-form-slug-prefix">gwkbali.com/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className={`admin-form-input admin-form-slug-input ${errors.slug ? 'admin-form-input-error' : ''}`}
                    placeholder="url-halaman (kosongkan untuk homepage)"
                  />
                </div>
                {errors.slug && (
                  <span className="admin-form-error">{errors.slug}</span>
                )}
                {!formData.slug.trim() && (
                  <span className="admin-form-help">
                    💡 Slug kosong = Homepage (route: /)
                  </span>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  Ringkasan
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="admin-form-textarea"
                  rows={3}
                  placeholder="Deskripsi singkat tentang halaman ini"
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  onClick={handleNext}
                  className="admin-button-primary admin-button-large"
                >
                  Lanjut ke Bagian Halaman
                  <ArrowLeft className="admin-button-icon" style={{transform: 'rotate(180deg)'}} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Fullscreen section builder
  return (
    <div className="admin-create-page-fullscreen">
      {/* Header Compact dengan Save Button */}
      <div className="admin-fullscreen-header">
        <button
          onClick={handleBack}
          className="admin-button-secondary"
        >
          <ArrowLeft className="admin-button-icon" />
          Kembali
        </button>
        <div className="admin-fullscreen-header-title">
          <h2>{formData.title || 'Halaman Baru'}</h2>
          <span>Langkah 2: Bagian Halaman</span>
        </div>
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className="admin-button-primary"
        >
          <Save className="admin-button-icon" />
          {loading ? 'Menyimpan...' : 'Simpan Halaman'}
        </button>
      </div>

      {/* Section Builder Fullscreen */}
      <div className="admin-fullscreen-content">
        <SectionBuilder
          sections={formData.sections}
          onUpdateSections={handleSectionsUpdate}
        />
      </div>
    </div>
  )
}