// @ts-nocheck
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
    <div className="rounded-xl border border-slate-600/50 bg-slate-800/50 p-6 space-y-6">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-tropical-teal/20 flex items-center justify-center">
            <span className="text-sm font-bold text-tropical-teal">#{index + 1}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-tropical-teal">Modul #{index + 1}</p>
            <h3 className="text-lg font-bold text-white">{labelByType[section._type]}</h3>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDuplicate}
            className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-tropical-teal hover:bg-tropical-teal/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplikasi
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:border-red-500"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
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
  const inputClassName = "w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 focus:border-tropical-teal focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-tropical-teal/20 transition-all"
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Judul Utama
        </label>
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className={inputClassName}
          placeholder="Masukkan judul utama"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Subjudul
        </label>
        <input
          value={section.subtitle}
          onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          className={inputClassName}
          placeholder="Masukkan subjudul"
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-slate-300">
          Deskripsi
        </label>
        <textarea
          value={section.description}
          onChange={(e) => onChange({ ...section, description: e.target.value })}
          className={`${inputClassName} min-h-[120px] resize-none`}
          placeholder="Tulis deskripsi hero section..."
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Label Tombol
        </label>
        <input
          value={section.cta.label}
          onChange={(e) => onChange({ ...section, cta: { ...section.cta, label: e.target.value } })}
          className={inputClassName}
          placeholder="Contoh: Pelajari Lebih Lanjut"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Link Tombol
        </label>
        <input
          value={section.cta.href}
          onChange={(e) => onChange({ ...section, cta: { ...section.cta, href: e.target.value } })}
          className={inputClassName}
          placeholder="https://example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Tema
        </label>
        <select
          value={section.theme}
          onChange={(e) => onChange({ ...section, theme: e.target.value as HeroSection["theme"] })}
          className={inputClassName}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  )
}

function FeatureSectionForm({ section, onChange }: { section: FeatureSection; onChange: (section: FeatureSection) => void }) {
  const inputClassName = "w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 focus:border-tropical-teal focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-tropical-teal/20 transition-all"

  const addItem = () => {
    onChange({
      ...section,
      features: [
        ...section.features,
        {
          _type: "featureItem" as const,
          _key: nanoid(),
          heading: "",
          body: "",
          icon: null,
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
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Judul Section
        </label>
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className={inputClassName}
          placeholder="Masukkan judul feature section"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Deskripsi Section
        </label>
        <textarea
          value={section.description}
          onChange={(e) => onChange({ ...section, description: e.target.value })}
          className={`${inputClassName} min-h-[80px] resize-none`}
          placeholder="Tulis deskripsi feature section..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-white">Daftar Feature</h4>
          <button
            onClick={addItem}
            className="flex items-center gap-2 rounded-lg bg-tropical-teal/20 border border-tropical-teal/40 px-4 py-2 text-sm font-medium text-tropical-teal transition hover:bg-tropical-teal/30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Feature
          </button>
        </div>
        
        <div className="space-y-4">
          {section.features.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-600/50 bg-slate-800/30 p-6 text-center">
              <p className="text-slate-400">Belum ada feature. Klik &quot;Tambah Feature&quot; untuk memulai.</p>
            </div>
          )}
          {section.features.map((feature, idx) => (
            <div key={feature._key} className="rounded-lg border border-slate-600/50 bg-slate-700/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tropical-teal/20 text-xs font-bold text-tropical-teal">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-300">Feature #{idx + 1}</span>
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Judul Feature
                  </label>
                  <input
                    value={feature.heading}
                    onChange={(e) => updateItem(idx, "heading", e.target.value)}
                    className={inputClassName}
                    placeholder="Masukkan judul feature"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Deskripsi Feature
                  </label>
                  <textarea
                    value={feature.body}
                    onChange={(e) => updateItem(idx, "body", e.target.value)}
                    className={`${inputClassName} min-h-[80px] resize-none`}
                    placeholder="Tulis deskripsi feature..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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
  const inputClassName = "w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 focus:border-tropical-teal focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-tropical-teal/20 transition-all"

  const addItem = () => {
    onChange({
      ...section,
      testimonials: [
        ...section.testimonials,
        {
          _type: "testimonialItem" as const,
          _key: nanoid(),
          quote: "",
          author: "",
          role: "",
          avatar: null,
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
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Judul Section
        </label>
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className={inputClassName}
          placeholder="Masukkan judul testimonial section"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-white">Daftar Testimonial</h4>
          <button
            onClick={addItem}
            className="flex items-center gap-2 rounded-lg bg-tropical-teal/20 border border-tropical-teal/40 px-4 py-2 text-sm font-medium text-tropical-teal transition hover:bg-tropical-teal/30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Testimonial
          </button>
        </div>
        
        <div className="space-y-4">
          {section.testimonials.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-600/50 bg-slate-800/30 p-6 text-center">
              <p className="text-slate-400">Belum ada testimonial. Klik &quot;Tambah Testimonial&quot; untuk memulai.</p>
            </div>
          )}
          {section.testimonials.map((testimonial, idx) => (
            <div key={testimonial._key} className="rounded-lg border border-slate-600/50 bg-slate-700/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tropical-teal/20 text-xs font-bold text-tropical-teal">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-300">Testimonial #{idx + 1}</span>
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Kutipan Testimonial
                  </label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) => updateItem(idx, "quote", e.target.value)}
                    className={`${inputClassName} min-h-[100px] resize-none`}
                    placeholder="Tulis kutipan testimonial..."
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Nama Pemberi Testimonial
                    </label>
                    <input
                      value={testimonial.author}
                      onChange={(e) => updateItem(idx, "author", e.target.value)}
                      className={inputClassName}
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Peran / Instansi
                    </label>
                    <input
                      value={testimonial.role}
                      onChange={(e) => updateItem(idx, "role", e.target.value)}
                      className={inputClassName}
                      placeholder="Jabatan atau nama perusahaan"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
