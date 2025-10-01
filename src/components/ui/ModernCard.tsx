import React from 'react'
import { clsx } from 'clsx'

interface ModernCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
}

/**
 * Komponen kartu modern dengan berbagai varian styling
 * Mendukung glass morphism dan gradient effects
 */
const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true
}) => {
  const baseClasses = "relative overflow-hidden rounded-2xl transition-all duration-300"
  
  const variantClasses = {
    default: "bg-white/5 border border-white/10 backdrop-blur-sm",
    glass: "bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl",
    gradient: "bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-sm"
  }
  
  const hoverClasses = hover 
    ? "hover:scale-[1.02] hover:shadow-2xl hover:border-white/20" 
    : ""

  return (
    <div className={clsx(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      className
    )}>
      {/* Gradient overlay untuk efek visual */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Konten utama */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ModernCard