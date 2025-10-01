"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
  FileText,
  Calendar,
  User,
  ArrowLeft
} from "lucide-react"
import "../design/custom-admin.css"

interface Page {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  _createdAt: string
  _updatedAt: string
}

export default function PagesManagement() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      } else {
        console.error('Failed to fetch pages')
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePage = () => {
    router.push('/admin/pages/create')
  }

  const handleEditPage = (pageId: string) => {
    router.push(`/admin/pages/edit/${pageId}`)
  }

  const handleDeletePage = async (pageId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
      try {
        const response = await fetch(`/api/pages/${pageId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setPages(pages.filter(page => page._id !== pageId))
        } else {
          alert('Gagal menghapus halaman')
        }
      } catch (error) {
        console.error('Error deleting page:', error)
        alert('Terjadi kesalahan saat menghapus halaman')
      }
    }
  }

  const handleViewPage = (slug: string) => {
    window.open(`/${slug}`, '_blank')
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="admin-create-page">
      {/* Header */}
      <div className="admin-create-page-header">
        <div className="admin-create-page-title">
          <button
            onClick={() => router.push('/admin')}
            className="admin-button-back"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="admin-button-icon" />
          </button>
          <div>
            <h1>Manajemen Halaman</h1>
            <p>Kelola halaman website GWK Cultural Park</p>
          </div>
        </div>
        <button 
          onClick={handleCreatePage}
          className="admin-button-primary"
        >
          <Plus className="admin-button-icon" />
          Buat Halaman Baru
        </button>
      </div>

      {/* Filters */}
      <div className="admin-form-section">
        <div className="admin-pages-filters">
          <div className="admin-pages-search">
            <Search className="admin-pages-search-icon" />
            <input
              type="text"
              placeholder="Cari halaman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-pages-search-input"
            />
          </div>
          <div className="admin-pages-filter">
            <Filter className="admin-button-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-pages-filter-select"
            >
              <option value="all">Semua Halaman</option>
              <option value="recent">Terbaru</option>
              <option value="updated">Baru Diperbarui</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="admin-form-section">
        {loading ? (
          <div className="admin-form-empty-sections">
            <div className="admin-form-empty-sections-content">
              <div className="admin-form-empty-sections-icon">⏳</div>
              <h3>Memuat halaman...</h3>
              <p>Mohon tunggu sebentar</p>
            </div>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="admin-form-empty-sections">
            <div className="admin-form-empty-sections-content">
              <FileText className="admin-form-empty-sections-icon" />
              <h3>Tidak ada halaman</h3>
              <p>Mulai dengan membuat halaman pertama Anda</p>
              <button 
                onClick={handleCreatePage}
                className="admin-button-primary"
              >
                <Plus className="admin-button-icon" />
                Buat Halaman Pertama
              </button>
            </div>
          </div>
        ) : (
          <div className="admin-pages-grid">
            {filteredPages.map((page) => (
              <div key={page._id} className="admin-page-card">
                <div className="admin-page-card-header">
                  <div className="admin-page-card-placeholder">
                    <FileText className="admin-page-card-placeholder-icon" />
                  </div>
                  <div className="admin-page-card-actions">
                    <button
                      onClick={() => handleViewPage(page.slug.current)}
                      className="admin-page-card-action"
                      title="Lihat Halaman"
                    >
                      <Eye className="admin-button-icon" />
                    </button>
                    <button
                      onClick={() => handleEditPage(page._id)}
                      className="admin-page-card-action"
                      title="Edit Halaman"
                    >
                      <Edit className="admin-button-icon" />
                    </button>
                    <button
                      onClick={() => handleDeletePage(page._id)}
                      className="admin-page-card-action admin-page-card-action-danger"
                      title="Hapus Halaman"
                    >
                      <Trash2 className="admin-button-icon" />
                    </button>
                  </div>
                </div>
                
                <div className="admin-page-card-content">
                  <div className="admin-page-card-title-row">
                    <h3 className="admin-page-card-title">{page.title}</h3>
                    {!page.slug.current && (
                      <span className="admin-page-badge-homepage">🏠 Homepage</span>
                    )}
                  </div>
                  {page.summary && (
                    <p className="admin-page-card-summary">{page.summary}</p>
                  )}
                  <div className="admin-page-card-meta">
                    <div className="admin-page-card-meta-item">
                      <Calendar className="admin-button-icon" />
                      <span>Dibuat: {formatDate(page._createdAt)}</span>
                    </div>
                    <div className="admin-page-card-meta-item">
                      <User className="admin-button-icon" />
                      <span>Diperbarui: {formatDate(page._updatedAt)}</span>
                    </div>
                  </div>
                  <div className="admin-page-card-slug">
                    <span className="admin-page-card-slug-label">URL:</span>
                    <span className="admin-page-card-slug-value">
                      /{page.slug.current || <em style={{color: '#805ad5'}}>homepage</em>}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}