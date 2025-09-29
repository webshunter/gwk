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
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [saving, setSaving] = useState(false)
  const [creating, setCreating] = useState(false)
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
    startTransition(async () => {
      const data = await getPage(id)
      setPageDetail(data)
      setSections(data?.sections ?? [])
      setMetaDraft({
        title: data?.title ?? "",
        slug: data?.slug?.current ?? "",
        summary: data?.summary ?? "",
      })
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
      const doc = await createPage({ title, slug })
      const newPage = { _id: doc._id as string, title, slug: { current: slug } }
      setPages((prev) => [newPage, ...prev])
      await loadPage(newPage._id)
    } finally {
      setCreating(false)
    }
  }

  const handleDeletePage = async (id: string) => {
    if (!confirm("Hapus halaman ini?")) return
    await deletePage(id)
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
    <div className="flex w-full gap-6">
      <aside className="w-72 space-y-4 border-r border-slate-800 pr-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Halaman</h2>
          <button
            onClick={handleCreatePage}
            disabled={creating}
            className="rounded-full bg-tropical-teal px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-tropical-teal/30 transition hover:bg-tropical-teal/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Membuat..." : "Halaman Baru"}
          </button>
        </div>
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page._id}>
              <button
                onClick={() => loadPage(page._id)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  selectedPageId === page._id
                    ? "border-tropical-teal/60 bg-tropical-teal/15 text-white"
                    : "border-slate-800/60 bg-slate-900 text-slate-300 hover:border-tropical-teal/40 hover:text-white"
                }`}
              >
                <div className="font-medium">{page.title}</div>
                <div className="text-xs text-slate-500">/{page.slug?.current ?? "tanpa-slug"}</div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex-1 space-y-8">
        {pageDetail ? (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
              <header className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Meta Halaman</p>
                  <h1 className="text-lg font-semibold text-white">{pageDetail.title}</h1>
                </div>
                <button
                  onClick={() => handleDeletePage(pageDetail._id)}
                  className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Hapus
                </button>
              </header>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-300">
                  Judul
                  <input
                    value={metaDraft.title}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, title: e.target.value }))}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-300">
                  Slug
                  <input
                    value={metaDraft.slug}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, slug: e.target.value }))}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
                    placeholder="contoh: hero-page"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-300 md:col-span-2">
                  Ringkasan
                  <textarea
                    value={metaDraft.summary}
                    onChange={(e) => setMetaDraft((prev) => ({ ...prev, summary: e.target.value }))}
                    className="min-h-[120px] rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
                    placeholder="Ringkasan singkat halaman"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Tambah Modul</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {sectionPalette.map((mod) => (
                  <button
                    key={mod.type}
                    onClick={() => handleAddSection(mod.type)}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-tropical-teal/60 hover:bg-slate-900"
                  >
                    <p className="font-semibold text-slate-100">{mod.title}</p>
                    <p className="mt-2 text-xs text-slate-500">{mod.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Susunan Halaman</h2>
                <button
                  onClick={handleSave}
                  disabled={saving || sections.length === 0}
                  className="rounded-full bg-tropical-teal px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-tropical-teal/30 transition hover:bg-tropical-teal/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan perubahan"}
                </button>
              </div>

              {selectedSections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-slate-500">
                  <p>Belum ada modul. Pilih modul di atas untuk memulai.</p>
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
                    <div className="space-y-4">
                      {selectedSections.map((section, index) => (
                        <SortableSection key={section._key} id={section._key}>
                          <SectionEditors
                            section={section}
                            index={index}
                            onChange={handleSectionChange}
                            onDuplicate={() => handleDuplicateSection(index)}
                            onRemove={() => handleRemoveSection(index)}
                          />
                        </SortableSection>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </>
        ) : (
          <div className="mx-auto flex h-full max-w-lg flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center text-slate-500">
            <div>
              <p className="font-medium text-slate-300">Belum ada halaman</p>
              <p className="mt-2 text-sm">Klik &ldquo;Halaman Baru&rdquo; untuk membuat halaman pertama.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
