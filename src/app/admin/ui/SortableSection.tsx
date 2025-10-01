"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease",
      }}
      className={`group relative rounded-2xl border transition-all duration-200 backdrop-blur-xl ${
        isDragging 
          ? "border-tropical-teal/60 bg-gradient-to-br from-slate-800/80 to-slate-900/60 shadow-2xl shadow-tropical-teal/20 scale-105 rotate-2 z-50" 
          : "border-slate-700/40 bg-gradient-to-br from-slate-800/40 to-slate-900/20 hover:border-slate-600/60 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/40"
      }`}
    >
      {/* Drag Indicator */}
      <div className="absolute left-4 top-4 z-10">
        <button
          {...attributes}
          {...listeners}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
            isDragging
              ? "border-tropical-teal/60 bg-tropical-teal/20 text-tropical-teal shadow-lg"
              : "border-slate-600/50 bg-slate-700/50 text-slate-400 hover:border-tropical-teal/40 hover:bg-tropical-teal/10 hover:text-tropical-teal"
          }`}
          title="Drag untuk mengatur urutan"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="pl-20 pr-6 py-6">
        {children}
      </div>

      {/* Visual feedback overlay */}
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tropical-teal/10 to-blue-500/5 pointer-events-none"></div>
      )}
    </div>
  )
}
