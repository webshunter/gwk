"use client"

import { nanoid } from "nanoid"

import type {
  FeatureSection,
  HeroSection,
  SectionPayload,
  TestimonialSection,
} from "../sectionPresets"

interface SectionEditorsProps {
  section: SectionPayload
  index: number
  onChange: (index: number, section: SectionPayload) => void
  onDuplicate: () => void
  onRemove: () => void
}

export default function SectionEditors({ section, index, onChange, onDuplicate, onRemove }: SectionEditorsProps) {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Modul #{index + 1}</p>
          <h3 className="text-lg font-semibold text-white">{labelByType[section._type]}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDuplicate}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-tropical-teal hover:text-white"
          >
            Duplikasi
          </button>
          <button
            onClick={onRemove}
            className="rounded-full border border-red-500 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Hapus
          </button>
        </div>
      </header>

      {section._type === "heroSection" && (
        <HeroSectionForm
          section={section}
          onChange={(next) => onChange(index, next)}
        />
      )}

      {section._type === "featureSection" && (
        <FeatureSectionForm
          section={section}
          onChange={(next) => onChange(index, next)}
        />
      )}

      {section._type === "testimonialSection" && (
        <TestimonialSectionForm
          section={section}
          onChange={(next) => onChange(index, next)}
        />
      )}
    </div>
  )
}

const labelByType = {
  heroSection: "Hero Section",
  featureSection: "Feature Section",
  testimonialSection: "Testimonial Section",
} as const

function HeroSectionForm({ section, onChange }: { section: HeroSection; onChange: (section: HeroSection) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Judul utama
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Subjudul
        <input
          value={section.subtitle}
          onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 md:col-span-2">
        Deskripsi
        <textarea
          value={section.description}
          onChange={(e) => onChange({ ...section, description: e.target.value })}
          className="min-h-[120px] rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Label Tombol
        <input
          value={section.cta.label}
          onChange={(e) => onChange({ ...section, cta: { ...section.cta, label: e.target.value } })}
          className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Link Tombol
        <input
          value={section.cta.href}
          onChange={(e) => onChange({ ...section, cta: { ...section.cta, href: e.target.value } })}
          className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Tema
        <select
          value={section.theme}
          onChange={(e) => onChange({ ...section, theme: e.target.value as HeroSection["theme"] })}
          className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  )
}

function FeatureSectionForm({ section, onChange }: { section: FeatureSection; onChange: (section: FeatureSection) => void }) {
  const addItem = () => {
    onChange({
      ...section,
      features: [
        ...section.features,
        {
          _key: nanoid(),
          heading: "",
          body: "",
        },
      ],
    })
  }

  const updateItem = (index: number, key: "heading" | "body", value: string) => {
    onChange({
      ...section,
      features: section.features.map((feature, idx) =>
        idx === index
          ? {
              ...feature,
              [key]: value,
            }
          : feature
      ),
    })
  }

  const removeItem = (index: number) => {
    onChange({
      ...section,
      features: section.features.filter((_, idx) => idx !== index),
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">Daftar Feature</span>
        <button
          onClick={addItem}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-tropical-teal hover:text-white"
        >
          Tambah Item
        </button>
      </div>
      <div className="space-y-3">
        {section.features.length === 0 && (
          <p className="text-xs text-slate-500">Belum ada feature. Klik &ldquo;Tambah Item&rdquo;.</p>
        )}
        {section.features.map((feature, idx) => (
          <div key={feature._key} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-500">Feature #{idx + 1}</p>
              <button
                onClick={() => removeItem(idx)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Hapus
              </button>
            </div>
            <label className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
              Judul
              <input
                value={feature.heading}
                onChange={(e) => updateItem(idx, "heading", e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
              />
            </label>
            <label className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
              Deskripsi
              <textarea
                value={feature.body}
                onChange={(e) => updateItem(idx, "body", e.target.value)}
                className="min-h-[80px] rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialSectionForm({
  section,
  onChange,
}: {
  section: TestimonialSection
  onChange: (section: TestimonialSection) => void
}) {
  const addItem = () => {
    onChange({
      ...section,
      testimonials: [
        ...section.testimonials,
        {
          _key: nanoid(),
          quote: "",
          author: "",
          role: "",
        },
      ],
    })
  }

  const updateItem = (index: number, key: "quote" | "author" | "role", value: string) => {
    onChange({
      ...section,
      testimonials: section.testimonials.map((testimonial, idx) =>
        idx === index
          ? {
              ...testimonial,
              [key]: value,
            }
          : testimonial
      ),
    })
  }

  const removeItem = (index: number) => {
    onChange({
      ...section,
      testimonials: section.testimonials.filter((_, idx) => idx !== index),
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">Daftar Testimonial</span>
        <button
          onClick={addItem}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-tropical-teal hover:text-white"
        >
          Tambah Testimonial
        </button>
      </div>
      <div className="space-y-3">
        {section.testimonials.length === 0 && (
          <p className="text-xs text-slate-500">Belum ada testimonial. Klik &ldquo;Tambah Testimonial&rdquo;.</p>
        )}
        {section.testimonials.map((testimonial, idx) => (
          <div key={testimonial._key} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-500">Testimonial #{idx + 1}</p>
              <button
                onClick={() => removeItem(idx)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Hapus
              </button>
            </div>
            <label className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
              Kutipan
              <textarea
                value={testimonial.quote}
                onChange={(e) => updateItem(idx, "quote", e.target.value)}
                className="min-h-[80px] rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
              />
            </label>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Nama
                <input
                  value={testimonial.author}
                  onChange={(e) => updateItem(idx, "author", e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Peran / Instansi
                <input
                  value={testimonial.role}
                  onChange={(e) => updateItem(idx, "role", e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
