// @ts-nocheck
"use client"

import { useEffect, useState, useTransition } from "react"
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  createPage,
  deletePage,
  getPage,
  updatePageMeta,
  updateSections,
} from "../actions"
import {
  duplicateSection,
  sectionFactories,
  type SectionPayload,
  type SectionType,
} from "../sectionPresets"

import SortableSection from "./SortableSection"
import SectionEditors from "./SectionEditors"
import { randomSlug } from "./utils"
import ModernCard from "@/components/ui/ModernCard"
import ModernButton from "@/components/ui/ModernButton"
import ModernInput from "@/components/ui/ModernInput"
import ModernTextarea from "@/components/ui/ModernTextarea"
import EmptyState from "@/components/ui/EmptyState"
import StatusBadge from "@/components/ui/StatusBadge"
import AnimatedCard from "@/components/ui/AnimatedCard"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { 
  Plus, Save, Trash2, Eye, Settings, Layers, FileText, Search, Menu, X, 
  ChevronRight, Bell, User, Grid3X3, BarChart3, Calendar, Mail, 
  Home, Users, Package, Settings2, HelpCircle, LogOut, ChevronDown
} from "lucide-react"

interface PageSummary {
  _id: string
  title: string
  slug?: {
    current: string
  }
}

interface PageDetail extends PageSummary {
  summary?: string
  sections?: SectionPayload[]
}

interface BuilderShellProps {
  initialPages: PageSummary[]
  initialPage: PageDetail | null
}

const sectionPalette: Array<{ type: SectionType; title: string; description: string; icon: unknown }> = [
  {
    type: "heroSection",
    title: "Hero Section",
    description: "Judul besar, subjudul, CTA, dan gambar latar.",
    icon: Layers
  },
  {
    type: "featureSection",
    title: "Feature Section",
    description: "Daftar keunggulan atau layanan utama.",
    icon: Grid3X3
  },
  {
    type: "testimonialSection",
    title: "Testimonial Section",
    description: "Kutipan pengalaman pengunjung atau klien.",
    icon: Users
  },
]

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home, current: true },
  { name: "Pages", href: "/admin/pages", icon: FileText, current: false },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3, current: false },
  { name: "Users", href: "/admin/users", icon: Users, current: false },
  { name: "Settings", href: "/admin/settings", icon: Settings2, current: false },
]

export default function ModernAdminLayout({ initialPages, initialPage }: BuilderShellProps) {
  const [pages, setPages] = useState<PageSummary[]>(initialPages)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(initialPage?._id ?? null)
  const [pageDetail, setPageDetail] = useState<PageDetail | null>(initialPage)
  const [sections, setSections] = useState<SectionPayload[]>(initialPage?.sections ?? [])
  const [, startTransition] = useTransition()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [saving, setSaving] = useState(false)
  const [creating, setCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [metaDraft, setMetaDraft] = useState({
    title: initialPage?.title ?? "",
    slug: initialPage?.slug?.current ?? "",
    summary: initialPage?.summary ?? "",
  })

  useEffect(() => {
    setSections(initialPage?.sections ?? [])
    setMetaDraft({
      title: initialPage?.title ?? "",
      slug: initialPage?.slug?.current ?? "",
      summary: initialPage?.summary ?? "",
    })
  }, [initialPage])

  useEffect(() => {
    setSections(pageDetail?.sections ?? [])
    setMetaDraft({
      title: pageDetail?.title ?? "",
      slug: pageDetail?.slug?.current ?? "",
      summary: pageDetail?.summary ?? "",
    })
  }, [pageDetail])

  const loadPage = async (id: string) => {
    setSelectedPageId(id)
    setErrorMessage(null)
    startTransition(async () => {
      try {
        const data = await getPage(id)
        if (!data) return

        setErrorMessage(null)
        setPageDetail(data)
        setSections(data.sections ?? [])
        setMetaDraft({
          title: data.title ?? "",
          slug: data.slug?.current ?? "",
          summary: data.summary ?? "",
        })
      } catch (error) {
        console.error("getPage failed", { id, error })
        setErrorMessage("Gagal memuat data halaman. Silakan cek log server untuk detailnya.")
      }
    })
  }

  const handleAddSection = (type: SectionType) => {
    setSections((prev) => [...prev, sectionFactories[type]()])
  }

  const handleDuplicateSection = (index: number) => {
    setSections((prev) => {
      const draft = [...prev]
      draft.splice(index + 1, 0, duplicateSection(prev[index]))
      return draft
    })
  }

  const handleRemoveSection = (index: number) => {
    setSections((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleReorder = ({ active, over }: { active: string; over: string }) => {
    setSections((prev) => {
      const oldIndex = prev.findIndex((item) => item._key === active)
      const newIndex = prev.findIndex((item) => item._key === over)
      if (oldIndex === -1 || newIndex === -1) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const handleSectionChange = (index: number, section: SectionPayload) => {
    setSections((prev) => {
      const next = [...prev]
      next[index] = section
      return next
    })
  }

  const handleSave = async () => {
    if (!selectedPageId) return
    setSaving(true)
    try {
      setErrorMessage(null)
      await updateSections(selectedPageId, sections)
      await updatePageMeta(selectedPageId, {
        title: metaDraft.title,
        summary: metaDraft.summary,
        slug: metaDraft.slug,
      })
      setPages((prev) =>
        prev.map((page) =>
          page._id === selectedPageId
            ? {
                ...page,
                title: metaDraft.title,
                slug: { current: metaDraft.slug },
              }
            : page
        )
      )
      const refreshed = await getPage(selectedPageId)
      setPageDetail(refreshed)
    } finally {
      setSaving(false)
    }
  }

  const handleCreatePage = async () => {
    setCreating(true)
    try {
      const title = `Halaman Baru ${pages.length + 1}`
      const slug = randomSlug(title)
      setErrorMessage(null)

      const doc = await createPage({ title, slug })
      const newPage = { _id: doc._id as string, title, slug: { current: slug } }
      const optimisticDetail: PageDetail = {
        ...newPage,
        summary: "",
        sections: [],
      }

      setPages((prev) => [newPage, ...prev])
      setSelectedPageId(newPage._id)
      setPageDetail(optimisticDetail)
      setSections([])
      setMetaDraft({ title, slug, summary: "" })

      await new Promise((resolve) => setTimeout(resolve, 250))
      await loadPage(newPage._id)
    } catch (error) {
      console.error("handleCreatePage failed", error)
      setErrorMessage(`Tidak dapat membuat halaman baru: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setCreating(false)
    }
  }

  const handleDeletePage = async (id: string) => {
    if (!confirm("Hapus halaman ini?")) return
    try {
      setErrorMessage(null)
      await deletePage(id)
    } catch (error) {
      console.error("deletePage failed", { id, error })
      setErrorMessage("Tidak dapat menghapus halaman. Coba lagi nanti.")
      return
    }

    setPages((prev) => prev.filter((page) => page._id !== id))
    if (selectedPageId === id) {
      const rest = pages.filter((page) => page._id !== id)
      if (rest[0]) {
        loadPage(rest[0]._id)
      } else {
        setSelectedPageId(null)
        setPageDetail(null)
        setSections([])
      }
    }
  }

  const selectedSections = sections ?? []
  
  // Filter pages based on search query
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug?.current?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">GWK Admin</h1>
              <p className="text-xs text-gray-500">Content Management</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Pages List */}
        <div className="flex-1 px-4 py-4 overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {filteredPages.length === 0 ? (
            <EmptyState
              icon={FileText}
              title={searchQuery ? "No pages found" : "No pages yet"}
              description={searchQuery ? "Try adjusting your search terms" : "Start by creating your first page"}
              action={!searchQuery ? {
                label: "Create Page",
                onClick: handleCreatePage
              } : undefined}
            />
          ) : (
            <div className="space-y-2">
              {filteredPages.map((page) => (
                <button
                  key={page._id}
                  onClick={() => loadPage(page._id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedPageId === page._id
                      ? "border-blue-200 bg-blue-50 text-blue-900"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{page.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        /{page.slug?.current ?? "no-slug"}
                      </div>
                    </div>
                    {selectedPageId === page._id && (
                      <StatusBadge status="active">Active</StatusBadge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Administrator</p>
              <p className="text-xs text-gray-500">admin@gwk.com</p>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <LogOut className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {pageDetail && (
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">{pageDetail.title}</h2>
                    <StatusBadge status="active">Active</StatusBadge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {pages.length} pages • {sections.length} modules
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle
                isDark={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
              />

              {/* Notifications */}
              <button className="p-2 rounded-md hover:bg-gray-100 relative admin-transition">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Library Toggle */}
              <ModernButton
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                variant="secondary"
                size="sm"
                icon={<Layers className="w-4 h-4" />}
              >
                Library
              </ModernButton>

              {/* Create Page */}
              <ModernButton
                onClick={handleCreatePage}
                disabled={creating}
                loading={creating}
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
              >
                {creating ? 'Membuat...' : 'Halaman Baru'}
              </ModernButton>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {pageDetail ? (
            <div className="space-y-6">
              {/* Page Settings Card */}
              <AnimatedCard animation="slideUp" delay={100} className="p-6 hover-lift">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{pageDetail.title}</h3>
                        <p className="text-sm text-gray-500">/{pageDetail.slug?.current ?? "no-slug"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="draft">Draft</StatusBadge>
                        <StatusBadge status="success">Updated today</StatusBadge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ModernButton
                        variant="secondary"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                      >
                        Preview
                      </ModernButton>
                      <ModernButton
                        onClick={() => handleDeletePage(pageDetail._id)}
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </ModernButton>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ModernInput
                      label="Page Title"
                      value={metaDraft.title}
                      onChange={(e) => setMetaDraft((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter page title..."
                      variant="filled"
                    />
                    <ModernInput
                      label="URL Slug"
                      value={metaDraft.slug}
                      onChange={(e) => setMetaDraft((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="page-slug"
                      variant="filled"
                    />
                  </div>

                  <ModernTextarea
                    label="Page Description"
                    value={metaDraft.summary}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={3}
                    placeholder="Write a compelling description..."
                    variant="filled"
                    helperText="Good descriptions improve SEO and user experience"
                  />
                </div>
              </AnimatedCard>

              {/* Page Builder */}
              <AnimatedCard animation="slideUp" delay={200} className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Page Builder</h3>
                    <p className="text-sm text-gray-500">Drag & drop components to build your page</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status="success">Auto-save active</StatusBadge>
                    <ModernButton
                      onClick={handleSave}
                      disabled={saving || sections.length === 0}
                      loading={saving}
                      variant="primary"
                      size="sm"
                      icon={<Save className="w-4 h-4" />}
                    >
                      {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </ModernButton>
                  </div>
                </div>

                {selectedSections.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg">
                    <EmptyState
                      icon={Layers}
                      title="Empty Canvas"
                      description="Start building your page by adding components from the library"
                      action={{
                        label: "Add Component",
                        onClick: () => setIsLibraryOpen(true)
                      }}
                    />
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleReorder}
                  >
                    <SortableContext
                      items={selectedSections.map((s) => s._key)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {selectedSections.map((section, index) => (
                          <SortableSection
                            key={section._key}
                            section={section}
                            index={index}
                            onUpdate={(updatedSection) => handleSectionChange(index, updatedSection)}
                            onDuplicate={() => handleDuplicateSection(index)}
                            onRemove={() => handleRemoveSection(index)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </AnimatedCard>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <EmptyState
                icon={FileText}
                title="No page selected"
                description="Select a page from the sidebar or create a new one"
                action={{
                  label: creating ? 'Membuat...' : 'Create New Page',
                  onClick: handleCreatePage
                }}
              />
            </div>
          )}
        </main>
      </div>

      {/* Component Library Sidebar */}
      {isLibraryOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsLibraryOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 z-50 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Component Library</h3>
                  <p className="text-sm text-gray-500">Drag & drop components</p>
                </div>
                <button
                  onClick={() => setIsLibraryOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {pageDetail && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-blue-800">Quick Tip</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Click any component below to add it to: <span className="font-medium">{pageDetail.title}</span>
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                {sectionPalette.map((mod, index) => (
                  <AnimatedCard
                    key={mod.type}
                    animation="fadeIn"
                    delay={index * 100}
                    className="p-0 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] hover-lift"
                    onClick={() => {
                      handleAddSection(mod.type)
                      setIsLibraryOpen(false)
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                          index === 0 ? 'bg-blue-100 text-blue-600' :
                          index === 1 ? 'bg-emerald-100 text-emerald-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <mod.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 mb-1">{mod.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{mod.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="h-6 w-6 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Plus className="h-3 w-3 text-gray-500 group-hover:text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}