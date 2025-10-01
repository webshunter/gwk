"use client"

import { useState } from "react"
import "../admin/design/custom-admin.css"
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
  X
} from "lucide-react"

export default function AdminDesignPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "#", icon: Home, current: true },
    { name: "Content Pages", href: "#", icon: FileText, current: false },
    { name: "Events & Shows", href: "#", icon: Calendar, current: false },
    { name: "Tickets & Booking", href: "#", icon: ShoppingCart, current: false },
    { name: "Visitors", href: "#", icon: Users, current: false },
    { name: "Analytics", href: "#", icon: BarChart3, current: false },
    { name: "Settings", href: "#", icon: Lock, current: false },
  ]

  const stats = [
    { name: "Today's Visitors", value: "1,234", icon: Users, color: "blue", change: "+12% from yesterday" },
    { name: "Revenue Today", value: "Rp 15.2M", icon: DollarSign, color: "orange", change: "+8% from yesterday" },
    { name: "Active Events", value: "8", icon: Calendar, color: "purple", change: "+2 this week" },
    { name: "Tickets Sold", value: "1,456", icon: TrendingUp, color: "green", change: "+15% this month" },
    { name: "Cultural Shows", value: "24", icon: CheckCircle, color: "blue" },
    { name: "Total Pages", value: "12", icon: FileText, color: "orange" },
  ]

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
          <div className="admin-upgrade-icon">★</div>
          <h3 className="admin-upgrade-title">Upgrade to PRO</h3>
          <p className="admin-upgrade-desc">
            Improve your development process and start doing more with GWK UI PRO!
          </p>
          <button className="admin-upgrade-btn">
            Upgrade to PRO
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

          {/* Charts Row */}
          <div className="admin-charts">
            {/* Monthly Revenue Chart */}
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div>
                  <h3 className="admin-chart-title">Monthly Revenue</h3>
                  <div className="admin-chart-value">Rp 2.4M</div>
                  <span className="admin-stat-change">+8.3%</span>
                  <p className="admin-chart-subtitle">Total Revenue</p>
                </div>
                <BarChart3 className="admin-nav-icon" />
              </div>

              <div className="admin-chart-placeholder">
                <BarChart3 className="admin-chart-icon" />
                <p>Line Chart Placeholder</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <CheckCircle className="admin-nav-icon" style={{ color: '#10b981', marginRight: '8px' }} />
                <span style={{ color: '#10b981', fontSize: '14px' }}>On track</span>
              </div>
            </div>

            {/* Cultural Events Chart */}
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <h3 className="admin-chart-title">Cultural Events</h3>
                <Calendar className="admin-nav-icon" />
              </div>

              <div className="admin-chart-placeholder">
                <BarChart3 className="admin-chart-icon" />
                <p>Bar Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="admin-tables">
            {/* Recent Events Table */}
            <div className="admin-table-card">
              <div className="admin-table-header">
                <h3 className="admin-table-title">Recent Events</h3>
                <button className="admin-header-btn">
                  <MoreVertical className="admin-nav-icon" />
                </button>
              </div>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>EVENT NAME</th>
                    <th>STATUS</th>
                    <th>ATTENDEES</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kecak Dance Performance</td>
                    <td>
                      <span className="admin-status-badge active">Active</span>
                    </td>
                    <td>150</td>
                    <td>15/01/24</td>
                  </tr>
                  <tr>
                    <td>Cultural Workshop</td>
                    <td>
                      <span className="admin-status-badge pending">Pending</span>
                    </td>
                    <td>45</td>
                    <td>16/01/24</td>
                  </tr>
                  <tr>
                    <td>Garuda Wisnu Kencana Tour</td>
                    <td>
                      <span className="admin-status-badge cancelled">Cancelled</span>
                    </td>
                    <td>89</td>
                    <td>17/01/24</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Daily Visitors & Revenue Breakdown */}
            <div className="admin-table-card">
              <div className="admin-daily-stats">
                <div className="admin-daily-card">
                  <h3 className="admin-table-title" style={{ marginBottom: '16px' }}>Daily Visitors</h3>
                  <div className="admin-daily-value">1,234</div>
                  <p className="admin-daily-label">Visitors Today</p>
                  <span className="admin-daily-change">+12%</span>
                </div>

                <div className="admin-daily-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 className="admin-table-title" style={{ margin: 0 }}>Revenue Breakdown</h3>
                    <select style={{
                      fontSize: '14px',
                      borderRadius: '8px',
                      padding: '4px 12px',
                      background: '#374151',
                      color: 'white',
                      border: '1px solid #4b5563',
                      outline: 'none'
                    }}>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="admin-chart-placeholder" style={{ height: '128px' }}>
                    <PieChart className="admin-nav-icon" />
                    <p style={{ fontSize: '12px' }}>Pie Chart</p>
                  </div>
                </div>
              </div>
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