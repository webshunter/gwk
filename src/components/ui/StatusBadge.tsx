import React from 'react'
import { clsx } from 'clsx'

interface StatusBadgeProps {
  status: 'active' | 'draft' | 'published' | 'error' | 'success' | 'warning'
  children: React.ReactNode
  className?: string
}

/**
 * Komponen badge untuk menampilkan status dengan warna yang sesuai
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className
}) => {
  const statusClasses = {
    active: "bg-blue-100 text-blue-700 border-blue-200",
    draft: "bg-amber-100 text-amber-700 border-amber-200",
    published: "bg-emerald-100 text-emerald-700 border-emerald-200",
    error: "bg-red-100 text-red-700 border-red-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200"
  }

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      statusClasses[status],
      className
    )}>
      <div className={clsx(
        "w-1.5 h-1.5 rounded-full",
        status === 'active' && "bg-blue-500",
        status === 'draft' && "bg-amber-500",
        status === 'published' && "bg-emerald-500",
        status === 'error' && "bg-red-500",
        status === 'success' && "bg-green-500",
        status === 'warning' && "bg-yellow-500"
      )} />
      {children}
    </span>
  )
}

export default StatusBadge