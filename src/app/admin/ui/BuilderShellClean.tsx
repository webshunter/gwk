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
import EmptyState from "@/components/ui/EmptyState"
import StatusBadge from "@/components/ui/StatusBadge"
import { Plus, Save, Trash2, Eye, Settings, Layers, FileText, Search, Menu, X, ChevronRight } from "lucide-react"

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

const sectionPalette: Array<{ type: SectionType; title: string; description: string }> = [
  {
    type: "heroSection",
    title: "Hero Section",
    description: "Judul besar, subjudul, CTA, dan gambar latar.",
  },
  {
    type: "featureSection",
    title: "Feature Section",
    description: "Daftar keunggulan atau layanan utama.",
  },
  {
    type: "testimonialSection",
    title: "Testimonial Section",
    description: "Kutipan pengalaman pengunjung atau klien.",
  },
]

export default function BuilderShellClean({ initialPages, initialPage }: BuilderShellProps) {
  const [pages, setPages] = useState<PageSummary[]>(initialPages)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(initialPage?._id ?? null)
  const [pageDetail, setPageDetail] = useState<PageDetail | null>(initialPage)
  const [sections, setSections] = useState<SectionPayload[]>(initialPage?.sections ?? [])
  const [, startTransition] = useTransition()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [saving, setSaving] = useState(false)
  const [creating, setCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center h-10 w-10 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-lg hover:bg-slate-50 transition-all"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Clean Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">GWK Admin</h1>
            </div>
          </div>
          
          {/* Center - Page Info */}
          {pageDetail && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">{pageDetail.title}</span>
                <StatusBadge status="active">Active</StatusBadge>
              </div>
              <div className="text-sm text-slate-500">
                {pages.length} pages • {sections.length} modules
              </div>
            </div>
          )}
          
          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Library Toggle */}
            <div className="lg:hidden">
              <ModernButton
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                variant="secondary"
                size="sm"
                icon={<Layers className="w-4 h-4" />}
              >
                Library
              </ModernButton>
            </div>

            {/* Create Page Button */}
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
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Pages */}
      <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-80 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 z-30 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Page Manager</h2>
              <p className="text-sm text-slate-500">Organize your content</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {pages.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No pages yet"
              description="Start by creating your first page for your website"
              action={{
                label: "Create Page",
                onClick: handleCreatePage
              }}
            />
          ) : (
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page._id}
                  onClick={() => loadPage(page._id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedPageId === page._id
                      ? "border-blue-200 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{page.title}</div>
                      <div className="text-xs text-slate-500 mt-1">
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
      </aside>

      {/* Library Mobile Overlay */}
      {isLibraryOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsLibraryOpen(false)}
        />
      )}

      {/* Right Sidebar - Component Library */}
      <aside className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-white border-l border-slate-200 overflow-y-auto transition-transform duration-300 z-30 ${
        isLibraryOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Component Library</h2>
              <p className="text-sm text-slate-500">Drag & drop components</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {pageDetail && (
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
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
              <div
                key={mod.type}
                className="p-0 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] border rounded-lg bg-white shadow-sm"
                onClick={() => {
                  handleAddSection(mod.type)
                  if (window.innerWidth < 1024) {
                    setIsLibraryOpen(false)
                  }
                }}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100 text-blue-600' :
                      index === 1 ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {index === 0 ? (
                        <Layers className="h-5 w-5" />
                      ) : index === 1 ? (
                        <Settings className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 mb-1">{mod.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{mod.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Plus className="h-3 w-3 text-slate-500 group-hover:text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 lg:mr-80 pt-14">
        {pageDetail ? (
          <div className="p-6 space-y-6">
            {/* Page Settings */}
            <ModernCard variant="glass" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">{pageDetail.title}</h2>
                      <p className="text-sm text-slate-500">/{pageDetail.slug?.current ?? "no-slug"}</p>
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Page Title</label>
                    <input
                      value={metaDraft.title}
                      onChange={(e) => setMetaDraft((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter page title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">URL Slug</label>
                    <input
                      value={metaDraft.slug}
                      onChange={(e) => setMetaDraft((prev) => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="page-slug"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Page Description</label>
                  <textarea
                    value={metaDraft.summary}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    placeholder="Write a compelling description..."
                  />
                </div>
              </div>
            </ModernCard>

            {/* Page Builder */}
            <ModernCard variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-1">Page Builder</h2>
                  <p className="text-sm text-slate-500">Drag & drop components to build your page</p>
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
                <div className="border-2 border-dashed border-slate-300 rounded-lg">
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
            </ModernCard>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
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
  )
}