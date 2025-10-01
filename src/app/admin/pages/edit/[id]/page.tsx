"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Plus } from 'lucide-react'
import SectionBuilder from '../../components/SectionBuilder'
import '../../../design/custom-admin.css'

interface Section {
  _type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  media?: {
    asset?: {
      url?: string;
    };
  };
  cta?: {
    label?: string;
    href?: string;
  };
  features?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  [key: string]: any;
}

interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  heroImage?: {
    asset: {
      url: string;
    };
  };
  sections?: Section[];
  content?: string;
  _createdAt: string;
  _updatedAt: string;
}

export default function EditPage() {
  const [page, setPage] = useState<Page | null>(null)
  const [currentStep, setCurrentStep] = useState<'info' | 'sections'>('info') // Step flow
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [summary, setSummary] = useState('')
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string

  useEffect(() => {
    if (pageId) {
      fetchPage()
    }
  }, [pageId])

  const fetchPage = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/pages/${pageId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch page')
      }
      const data = await response.json()
      setPage(data)
      setTitle(data.title || '')
      setSlug(data.slug?.current || '')
      setSummary(data.summary || '')
      setSections(data.sections || [])
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }


  const handleSectionsUpdate = useCallback((updater: (prevSections: Section[]) => Section[]) => {
    setSections(prevSections => updater(prevSections))
  }, [])

  const validateBasicInfo = () => {
    // Validate required fields
    if (!title.trim()) {
      setError('Judul halaman wajib diisi')
      return false
    }

    // Slug boleh kosong (untuk homepage)
    if (slug.trim() && !/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung')
      return false
    }

    setError(null)
    return true
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
    setSaving(true)
    setError(null)

    if (!validateBasicInfo()) {
      setCurrentStep('info')
      setSaving(false)
      return
    }

    // Validate sections
    if (sections.length === 0) {
      setError('Minimal harus ada satu section')
      setSaving(false)
      return
    }

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          summary,
          sections
        }),
      })

      if (response.ok) {
        alert('Halaman berhasil diperbarui!')
        router.push('/admin/pages')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Gagal memperbarui halaman')
      }
    } catch (err: any) {
      console.error('Error updating page:', err)
      setError('Terjadi kesalahan saat memperbarui halaman')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-create-page">
        <div className="admin-create-page-header">
          <h1 className="admin-create-page-title">Loading...</h1>
        </div>
      </div>
    )
  }

  if (error && !page) {
    return (
      <div className="admin-create-page">
        <div className="admin-create-page-header">
          <button onClick={() => router.back()} className="admin-button-secondary">
            <ArrowLeft className="admin-button-icon" />
            Kembali ke Halaman
          </button>
          <h1 className="admin-create-page-title">Error</h1>
        </div>
        <div className="admin-form-error">{error}</div>
      </div>
    )
  }

  // Step 1: Informasi Dasar
  if (currentStep === 'info') {
    return (
      <div className="admin-create-page">
        <div className="admin-create-page-header">
          <button onClick={() => router.back()} className="admin-button-secondary">
            <ArrowLeft className="admin-button-icon" />
            Kembali
          </button>
          <div className="admin-create-page-title">
            <h1>Edit Halaman: {page?.title}</h1>
            <p>Langkah 1: Informasi Dasar</p>
          </div>
        </div>

        {error && <div className="admin-form-error">{error}</div>}

        <div className="admin-create-page-form">
          <div className="admin-create-page-content">
            <div className="admin-form-section">
              <h2 className="admin-form-section-title">Informasi Dasar</h2>
              
              <div className="admin-form-group">
                <label htmlFor="title" className="admin-form-label">Judul Halaman *</label>
                <input
                  type="text"
                  id="title"
                  className="admin-form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul halaman"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="slug" className="admin-form-label">URL Slug</label>
                <div className="admin-form-slug">
                  <span className="admin-form-slug-prefix">gwkbali.com/</span>
                  <input
                    type="text"
                    id="slug"
                    className="admin-form-input admin-form-slug-input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-halaman (kosongkan untuk homepage)"
                  />
                </div>
                {!slug.trim() && (
                  <span className="admin-form-help">
                    💡 Slug kosong = Homepage (route: /)
                  </span>
                )}
              </div>

              <div className="admin-form-group">
                <label htmlFor="summary" className="admin-form-label">Ringkasan</label>
                <textarea
                  id="summary"
                  className="admin-form-textarea"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="Deskripsi singkat tentang halaman ini"
                ></textarea>
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

  // Step 2: Fullscreen Section Builder
  return (
    <div className="admin-create-page-fullscreen">
      {/* Header Compact dengan Save Button */}
      <div className="admin-fullscreen-header">
        <button onClick={handleBack} className="admin-button-secondary">
          <ArrowLeft className="admin-button-icon" />
          Kembali
        </button>
        <div className="admin-fullscreen-header-title">
          <h2>{title || 'Edit Halaman'}</h2>
          <span>Langkah 2: Bagian Halaman</span>
        </div>
        <button
          onClick={() => handleSubmit()}
          disabled={saving}
          className="admin-button-primary"
        >
          <Save className="admin-button-icon" />
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      {error && <div className="admin-form-error" style={{margin: '16px 24px'}}>{error}</div>}

      {/* Section Builder Fullscreen */}
      <div className="admin-fullscreen-content">
        <SectionBuilder
          sections={sections}
          onUpdateSections={handleSectionsUpdate}
        />
      </div>
    </div>
  )
}