"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  ShoppingCart,
  BarChart3,
  User,
  Lock,
  Bell,
  HelpCircle,
  Sun,
  Search,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Flag,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  PieChart,
  Menu,
  X,
  Edit,
  Eye
} from "lucide-react"

// Component for Recent Pages Table
function RecentPagesTable() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages')
        if (response.ok) {
          const data = await response.json()
          // Sort by update date and take first 5
          const sortedPages = data.sort((a: any, b: any) => 
            new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime()
          ).slice(0, 5)
          setPages(sortedPages)
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPages()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
        Loading...
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <FileText size={48} style={{ color: '#6b7280', margin: '0 auto 16px' }} />
        <p style={{ color: '#9ca3af' }}>Belum ada halaman. Buat halaman pertama Anda!</p>
      </div>
    )
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>PAGE TITLE</th>
          <th>URL SLUG</th>
          <th>LAST UPDATED</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <tr key={page._id}>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} style={{ color: '#6366f1' }} />
                <span style={{ fontWeight: '500' }}>{page.title}</span>
              </div>
            </td>
            <td>
              <code style={{ 
                fontSize: '12px', 
                padding: '4px 8px', 
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '4px',
                color: '#6366f1'
              }}>
                /{page.slug?.current || 'homepage'}
              </code>
            </td>
            <td style={{ color: '#9ca3af', fontSize: '14px' }}>
              {formatDate(page._updatedAt)}
            </td>
            <td>
              <span className="admin-status-badge active">Published</span>
            </td>
            <td>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => router.push(`/admin/pages/edit/${page._id}`)}
                  className="admin-header-btn"
                  style={{ padding: '6px 12px' }}
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => window.open(`/${page.slug?.current || ''}`, '_blank')}
                  className="admin-header-btn"
                  style={{ padding: '6px 12px' }}
                  title="View"
                >
                  <Eye size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const [stats, setStats] = useState([
    { name: "Total Pages", value: "0", icon: FileText, color: "blue", change: "Loading..." },
    { name: "Published Pages", value: "0", icon: CheckCircle, color: "green", change: "Loading..." },
    { name: "Draft Pages", value: "0", icon: Flag, color: "orange", change: "Loading..." },
    { name: "Last Updated", value: "-", icon: Calendar, color: "purple", change: "Loading..." },
  ])

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home, current: true },
    { name: "Content Pages", href: "/admin/pages", icon: FileText, current: false },
  ]

  useEffect(() => {
    // Fetch stats dari API
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/pages')
        if (response.ok) {
          const pages = await response.json()
          const totalPages = pages.length
          const publishedPages = pages.length // Semua page dianggap published
          const draftPages = 0 // Placeholder untuk draft
          
          // Cari page terakhir yang diupdate
          const lastUpdated = pages.length > 0 
            ? new Date(Math.max(...pages.map((p: any) => new Date(p._updatedAt).getTime())))
            : new Date()
          
          const formatDate = (date: Date) => {
            return date.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          }

          setStats([
            { name: "Total Pages", value: totalPages.toString(), icon: FileText, color: "blue", change: `${totalPages} halaman terdaftar` },
            { name: "Published Pages", value: publishedPages.toString(), icon: CheckCircle, color: "green", change: "Semua halaman aktif" },
            { name: "Draft Pages", value: draftPages.toString(), icon: Flag, color: "orange", change: "Tidak ada draft" },
            { name: "Last Updated", value: formatDate(lastUpdated), icon: Calendar, color: "purple", change: "Update terakhir" },
          ])
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="admin-dashboard">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <div className="admin-logo-icon">G</div>
          <div className="admin-logo-text">
            <h1>GWK ADMIN</h1>
            <p>Cultural Park CMS</p>
          </div>
        </div>

        <nav className="admin-nav">
          <ul className="admin-nav-list">
            {navigation.map((item) => (
              <li key={item.name} className="admin-nav-item">
                <a
                  href={item.href}
                  className={`admin-nav-link ${item.current ? 'active' : ''}`}
                >
                  <item.icon className="admin-nav-icon" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-upgrade-card">
          <div className="admin-upgrade-icon">📄</div>
          <h3 className="admin-upgrade-title">Content Management</h3>
          <p className="admin-upgrade-desc">
            Kelola semua konten website GWK Cultural Park dengan mudah dan efisien.
          </p>
          <button 
            onClick={() => router.push('/admin/pages')}
            className="admin-upgrade-btn"
          >
            Manage Pages
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-header-btn mobile-only"
          >
            <Menu className="admin-nav-icon" />
          </button>

          <div className="admin-breadcrumb">
            GWK Cultural Park / Dashboard
          </div>

          <div className="admin-search">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="admin-search-input"
            />
          </div>

          <div className="admin-header-actions">
            <button className="admin-header-btn">
              <Bell className="admin-nav-icon" />
            </button>
            <button className="admin-header-btn">
              <HelpCircle className="admin-nav-icon" />
            </button>
            <button className="admin-header-btn">
              <Sun className="admin-nav-icon" />
            </button>
            <div className="admin-avatar">GW</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="admin-content">
          {/* Stats Grid */}
          <div className="admin-stats-grid">
            {stats.map((stat) => (
              <div key={stat.name} className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>{stat.name}</h3>
                  <div className="admin-stat-value">{stat.value}</div>
                  {stat.change && (
                    <p className="admin-stat-change">{stat.change}</p>
                  )}
                </div>
                <div className={`admin-stat-icon ${stat.color}`}>
                  <stat.icon className="admin-nav-icon" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="admin-charts">
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div>
                  <h3 className="admin-chart-title">Quick Actions</h3>
                  <p className="admin-chart-subtitle">Aksi cepat untuk manajemen konten</p>
                </div>
                <FileText className="admin-nav-icon" />
              </div>

              <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
                <button 
                  onClick={() => router.push('/admin/pages/create')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <FileText size={20} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600' }}>Buat Halaman Baru</div>
                    <div style={{ fontSize: '12px', opacity: '0.9' }}>Tambah konten website baru</div>
                  </div>
                </button>

                <button 
                  onClick={() => router.push('/admin/pages')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <FileText size={20} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600' }}>Kelola Halaman</div>
                    <div style={{ fontSize: '12px', opacity: '0.9' }}>Edit atau hapus halaman existing</div>
                  </div>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '8px' }}>
                <CheckCircle className="admin-nav-icon" style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>System Operational</span>
              </div>
            </div>

            {/* Content Statistics */}
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <h3 className="admin-chart-title">Content Overview</h3>
                <PieChart className="admin-nav-icon" />
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-around',
                  padding: '20px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#6366f1' }}>
                      {stats[0].value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Total Pages</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>
                      {stats[1].value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Published</div>
                  </div>
                </div>

                <div style={{ 
                  padding: '16px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>All Content Published</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    Semua halaman dalam status published dan dapat diakses publik
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Pages Table */}
          <div className="admin-tables">
            <div className="admin-table-card" style={{ gridColumn: '1 / -1' }}>
              <div className="admin-table-header">
                <h3 className="admin-table-title">Recent Pages</h3>
                <button 
                  onClick={() => router.push('/admin/pages')}
                  className="admin-header-btn"
                  style={{ 
                    padding: '8px 16px', 
                    background: '#6366f1',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  View All
                </button>
              </div>

              <RecentPagesTable />
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .admin-sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }
        
        @media (min-width: 1024px) {
          .mobile-only {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}