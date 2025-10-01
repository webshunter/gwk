"use client"

import { useState } from "react"
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

export default function AdminDesignDemoPage() {
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
    { name: "Today's Visitors", value: "1,234", icon: Users, color: "bg-tropical-teal", change: "+12% from yesterday" },
    { name: "Revenue Today", value: "Rp 15.2M", icon: DollarSign, color: "bg-golden-amber", change: "+8% from yesterday" },
    { name: "Active Events", value: "8", icon: Calendar, color: "bg-blue-sky", change: "+2 this week" },
    { name: "Tickets Sold", value: "1,456", icon: TrendingUp, color: "bg-lime-moss", change: "+15% this month" },
    { name: "Cultural Shows", value: "24", icon: CheckCircle, color: "bg-tropical-teal" },
    { name: "Total Pages", value: "12", icon: FileText, color: "bg-golden-amber" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-white">GWK ADMIN</h1>
                <p className="text-xs text-gray-400">Cultural Park CMS</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.current
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Upgrade to PRO Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-4 text-white text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">N</span>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Upgrade to PRO</h3>
              <p className="text-sm text-purple-100 mb-4">
                Improve your development process and start doing more with GWK UI PRO!
              </p>
              <button className="w-full py-2 bg-purple-700 hover:bg-purple-800 rounded-lg text-sm font-medium transition-colors">
                Upgrade to PRO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Breadcrumb */}
            <div className="flex items-center">
              <span className="text-gray-400 text-sm">GWK Cultural Park / Dashboard</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-gray-700 text-white placeholder-gray-400 border-gray-600 border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Sun className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-tropical-teal rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">GW</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-900">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={stat.name} className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    {stat.change && (
                      <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                    )}
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* This Month Chart */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Monthly Revenue
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-3xl font-bold text-white">
                      Rp 2.4M
                    </span>
                    <span className="text-green-400 text-sm ml-2">+8.3%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Total Revenue
                  </p>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              {/* Chart placeholder */}
              <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Chart Placeholder</p>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400 text-sm">On track</span>
              </div>
            </div>

            {/* Cultural Events Chart */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Cultural Events
                </h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              
              {/* Chart placeholder */}
              <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Events Table */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Recent Events
                </h3>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            EVENT NAME
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            STATUS
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            ATTENDEES
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            DATE
                          </th>
                        </tr>
                      </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 text-sm text-white">
                        Kecak Dance Performance
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        150
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        15/01/24
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 text-sm text-white">
                        Cultural Workshop
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Pending</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        45
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        16/01/24
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Traffic & Pie Chart */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Visitors */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Daily Visitors
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      1,234
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Visitors Today
                    </p>
                    <span className="text-green-400 text-sm">+12%</span>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Revenue Breakdown
                    </h3>
                    <select className="text-sm rounded-lg px-3 py-1 bg-gray-700 text-white border-gray-600 border focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Monthly</option>
                    </select>
                  </div>
                  
                  {/* Pie Chart placeholder */}
                  <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-400 text-xs">Pie Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}