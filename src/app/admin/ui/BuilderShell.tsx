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
import { Plus, Save, Trash2, Eye, Settings, Layers, FileText } from "lucide-react"

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

export default function BuilderShell({ initialPages, initialPage }: BuilderShellProps) {
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

        if (!data) {
          // Sanity kadang membutuhkan waktu untuk mereplikasi dokumen baru, jadi jangan kosongkan state saat data belum tersedia.
          return
        }

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

      console.log("handleCreatePage: Starting page creation", { title, slug })
      const doc = await createPage({ title, slug })
      console.log("handleCreatePage: Page created successfully", { _id: doc._id })
      
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

      // Beri sedikit jeda supaya dokumen baru tersedia di dataset sebelum kita ambil ulang.
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center h-12 w-12 rounded-2xl bg-white/95 border border-slate-200/50 text-slate-700 shadow-xl shadow-slate-900/10 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Header - Modern Glassmorphism */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-2xl shadow-xl shadow-black/20">
        <div className="flex h-16 items-center justify-between px-6 lg:pl-4 pl-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/25">
                <div className="h-full w-full rounded-[10px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-center">
                  <svg className="h-4 w-4 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  GWK Admin
                </h1>
                <p className="text-xs text-slate-400/80 font-medium">Content Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Modern Stats Summary */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-200">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="font-medium">{pages.length} Pages</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 text-emerald-200">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span className="font-medium">{sections.length} Modules</span>
              </div>
            </div>
            
            {/* Mobile Library Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className="flex items-center gap-2 rounded-lg border border-purple-500/50 bg-purple-500/10 px-3 py-2 text-sm font-medium text-purple-300 transition-all hover:bg-purple-500/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Library
              </button>
            </div>

            {/* Modern Quick Actions */}
            <button
              onClick={handleCreatePage}
              disabled={creating}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                {creating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Membuat...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Halaman Baru
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
        
        {/* Modern Breadcrumb */}
        {pageDetail && (
          <div className="border-t border-white/5 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700/50">
                <svg className="h-3 w-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span className="text-slate-300 font-medium">Admin</span>
              </div>
              <svg className="h-3 w-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700/30">
                <span className="text-slate-400">Pages</span>
              </div>
              <svg className="h-3 w-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                <span className="font-semibold text-cyan-200">{pageDetail.title}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Modern Left Sidebar - Pages */}
      <aside className={`fixed top-0 left-0 h-screen w-80 border-r border-slate-200/60 bg-white/95 backdrop-blur-xl overflow-y-auto transition-transform duration-300 z-50 shadow-xl shadow-slate-900/10 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
              <div className="h-full w-full rounded-2xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Page Manager
              </h2>
              <p className="text-sm text-slate-600 font-medium">Organize your content</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-100 p-2">
                <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-red-800 font-semibold">Error occurred</p>
                <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        {pages.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">No pages yet</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Start by creating your first page for the website</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Modern Search Input */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 pl-11 text-sm text-slate-800 placeholder-slate-500 backdrop-blur-sm transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:shadow-lg focus:shadow-blue-500/10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page._id}>
                  <button
                    onClick={() => loadPage(page._id)}
                    className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                      selectedPageId === page._id
                        ? "border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-800 shadow-lg shadow-blue-500/20"
                        : "border-slate-200 bg-white/70 text-slate-700 hover:border-blue-200 hover:bg-white hover:shadow-md hover:shadow-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-base mb-1 truncate">{page.title}</div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 105.656-5.657l-.142-.142zM9.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1a3 3 0 00-5.657 5.657l.142.142z" />
                          </svg>
                          <span className="truncate">/{page.slug?.current ?? "no-slug"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedPageId === page._id && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-blue-700">Active</span>
                          </div>
                        )}
                        <div className={`h-6 w-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedPageId === page._id 
                            ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/30 text-cyan-200 rotate-90' 
                            : 'bg-slate-700/50 text-slate-500 group-hover:bg-slate-600/60 group-hover:text-slate-400'
                        }`}>
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </aside>

      {/* Library Mobile Overlay */}
      {isLibraryOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-45"
          onClick={() => setIsLibraryOpen(false)}
        />
      )}

      {/* Modern Right Sidebar - Component Library */}
      <aside className={`fixed top-0 right-0 h-screen w-96 border-l border-slate-200/60 bg-white/95 backdrop-blur-xl overflow-y-auto transition-transform duration-300 z-50 shadow-xl shadow-slate-900/10 ${
        isLibraryOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-indigo-50/80 to-purple-50/80">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <div className="h-full w-full rounded-2xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Component Library
              </h2>
              <p className="text-sm text-slate-600 font-medium">Drag & drop components</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Available Components</span>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">{sectionPalette.length}</span>
          </div>
          
          {pageDetail && (
            <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold text-blue-800">Quick Tip</span>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">
                Click any component below to add it to the active page: <span className="font-bold text-blue-800">{pageDetail.title}</span>
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            {sectionPalette.map((mod, index) => (
              <button
                key={mod.type}
                onClick={() => {
                  handleAddSection(mod.type)
                  // Auto close library on mobile after adding component
                  if (window.innerWidth < 1024) {
                    setIsLibraryOpen(false)
                  }
                }}
                className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 text-left transition-all duration-200 hover:border-indigo-300 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/25 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all duration-300">
                      <div className="h-full w-full rounded-xl flex items-center justify-center">
                        <svg className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                      <span className="text-xs font-bold">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-700 mb-2 transition-colors duration-300">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {mod.description}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 group-hover:text-indigo-600 transition-colors">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Click to add to page
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="flex-1 lg:ml-80 lg:mr-96 pt-6 space-y-6 p-6 lg:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        {pageDetail ? (
          <>
            {/* Modern Page Overview Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-xl shadow-slate-900/10 backdrop-blur-sm">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100/50 to-indigo-100/50 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-100/50 to-pink-100/50 blur-xl"></div>
              
              <header className="relative mb-8 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200">
                      <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
                      <p className="text-sm font-bold text-blue-800 uppercase tracking-wider">Page Settings</p>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                        <svg className="h-3 w-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-emerald-700 font-semibold">Updated today</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                        <svg className="h-3 w-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-amber-700 font-semibold">Draft</span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-3 leading-tight">
                    {pageDetail.title}
                  </h1>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-700/60 to-slate-600/40 border border-white/10 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 105.656-5.657l-.142-.142zM9.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1a3 3 0 00-5.657 5.657l.142.142z" />
                    </svg>
                    <span className="font-mono text-slate-200 font-medium">/{pageDetail.slug?.current ?? "tanpa-slug"}</span>
                  </div>
                </div>
                
                <div className="relative flex items-center gap-3">
                  {/* Modern Preview Button */}
                  <ModernButton
                    variant="secondary"
                    size="md"
                    icon={<Eye className="w-4 h-4" />}
                  >
                    Preview Page
                  </ModernButton>
                  
                  {/* Modern Delete Button */}
                  <ModernButton
                    onClick={() => handleDeletePage(pageDetail._id)}
                    variant="danger"
                    size="md"
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete Page
                  </ModernButton>
                </div>
              </header>
              {/* Modern Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
                {/* Page Title - Full width on mobile, 7 columns on XL */}
                <div className="xl:col-span-7 space-y-4">
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <div className="h-6 w-6 rounded-xl bg-blue-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    Page Title
                  </label>
                  <input
                    value={metaDraft.title}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-6 text-slate-800 placeholder-slate-500 transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:shadow-lg focus:shadow-blue-500/10"
                    placeholder="Enter an engaging page title..."
                  />
                </div>

                {/* URL Slug - Full width on mobile, 5 columns on XL */}
                <div className="xl:col-span-5 space-y-4">
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <div className="h-6 w-6 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 105.656-5.657l-.142-.142zM9.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1a3 3 0 00-5.657 5.657l.142.142z" />
                      </svg>
                    </div>
                    URL Slug
                  </label>
                  <div className="relative">
                    <input
                      value={metaDraft.slug}
                      onChange={(e) => setMetaDraft((prev) => ({ ...prev, slug: e.target.value }))}
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-6 pr-24 text-slate-800 placeholder-slate-500 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      placeholder="e.g: main-page"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs text-emerald-700 font-mono font-bold">
                        /{metaDraft.slug || 'slug'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Page Description - Full width spanning all columns */}
                <div className="xl:col-span-12 space-y-4">
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <div className="h-6 w-6 rounded-xl bg-purple-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    Page Description
                  </label>
                  <textarea
                    value={metaDraft.summary}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-slate-800 placeholder-slate-500 transition-all duration-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 focus:shadow-lg focus:shadow-purple-500/10 resize-none"
                    placeholder="Write a compelling description that helps with SEO and gives visitors a clear idea of what this page contains. Keep it concise yet informative..."
                  />
                  <div className="flex items-center justify-between px-2 mt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="h-3 w-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Good descriptions improve SEO and user experience</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                      <span className="text-xs font-bold text-slate-600">{metaDraft.summary?.length || 0}</span>
                      <span className="text-xs text-slate-500">chars</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* Modern Page Builder Interface */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur-sm">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100/50 to-indigo-100/50 blur-xl"></div>
                
                <div className="relative p-8">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
                    {/* Left section - Title and description */}
                    <div className="xl:col-span-8 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 flex items-center justify-center">
                          <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-slate-800">
                            Page Builder
                          </h2>
                          <p className="text-slate-600 font-medium">Drag & drop components to build your page</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right section - Controls */}
                    <div className="xl:col-span-4 flex flex-col sm:flex-row xl:flex-row items-start sm:items-center xl:justify-end gap-4">
                      {/* Auto Save Indicator */}
                      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-emerald-700">Auto-save active</span>
                      </div>
                      
                      {/* Save Button */}
                      <ModernButton
                        onClick={handleSave}
                        disabled={saving || sections.length === 0}
                        loading={saving}
                        variant="primary"
                        size="md"
                        icon={<Save className="w-4 h-4" />}
                      >
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </ModernButton>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-600/40 bg-gradient-to-br from-slate-800/20 to-slate-900/10 p-16 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-slate-700/40 to-slate-800/30 flex items-center justify-center">
                    <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">Canvas Kosong</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
                    Halaman ini masih kosong. Pilih komponen dari library di atas untuk mulai membangun konten yang menarik.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">Hero Section</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">Feature Section</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">Testimonial Section</span>
                  </div>
                </div>
              ) : (
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={({ active, over }) => {
                    if (!over || active.id === over.id) return
                    handleReorder({ active: active.id as string, over: over.id as string })
                  }}
                  sensors={sensors}
                >
                  <SortableContext items={selectedSections.map((section) => section._key)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-8">
                      {selectedSections.map((section, index) => (
                        <div key={section._key} className="group relative">
                          {/* Modern Section Header */}
                          <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl p-4">
                            {/* Background decorations */}
                            <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/10 blur-2xl"></div>
                            
                            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                              {/* Left section - Section info */}
                              <div className="md:col-span-8 flex items-center gap-4">
                                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20">
                                  <div className="h-full w-full rounded-[10px] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">{index + 1}</span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                                    Section {index + 1}
                                  </h4>
                                  <p className="text-sm text-slate-400 font-medium">{section._type || 'Component'}</p>
                                </div>
                              </div>
                              
                              {/* Right section - Drag hint */}
                              <div className="md:col-span-4 flex justify-start md:justify-end">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <svg className="h-4 w-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                  </svg>
                                  <span className="text-xs font-semibold text-slate-300">Drag to reorder</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <SortableSection id={section._key}>
                            <SectionEditors
                              section={section}
                              index={index}
                              onChange={handleSectionChange}
                              onDuplicate={() => handleDuplicateSection(index)}
                              onRemove={() => handleRemoveSection(index)}
                            />
                          </SortableSection>
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </>
        ) : (
          <div className="relative flex min-h-[650px] flex-1 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-600/30 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 p-16 text-center backdrop-blur-2xl">
            {/* Advanced Background Effects */}
            <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/8 to-blue-500/8 blur-3xl"></div>
            
            <div className="relative max-w-3xl space-y-10">
              {/* Enhanced Icon */}
              <div className="mx-auto h-32 w-32 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 p-4 shadow-xl shadow-slate-900/10">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-800">
                  Welcome to Page Builder
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                  Start creating amazing pages. Select a page from the left sidebar or create your first page to begin building with our intuitive drag-and-drop interface.
                </p>
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCreatePage}
                  disabled={creating}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-200 hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="relative flex items-center gap-3">
                    {creating ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        Creating Page...
                      </>
                    ) : (
                      <>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Page
                      </>
                    )}
                  </div>
                </button>
              </div>
              
              {/* Enhanced Process Guide */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-0.5 shadow-lg shadow-blue-500/20">
                    <div className="h-full w-full rounded-[14px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-center">
                      <span className="text-lg font-bold text-white">1</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-lg">Select Page</h4>
                  <p className="text-slate-400 text-sm">Choose from existing pages or create new ones</p>
                </div>
                
                <div className="group text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-400/10">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600 p-0.5 shadow-lg shadow-purple-500/20">
                    <div className="h-full w-full rounded-[14px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-center">
                      <span className="text-lg font-bold text-white">2</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-lg">Add Components</h4>
                  <p className="text-slate-400 text-sm">Drag & drop components to build your page</p>
                </div>
                
                <div className="group text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-400/10">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/20">
                    <div className="h-full w-full rounded-[14px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-center">
                      <span className="text-lg font-bold text-white">3</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-lg">Save & Publish</h4>
                  <p className="text-slate-400 text-sm">Preview and publish your changes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
