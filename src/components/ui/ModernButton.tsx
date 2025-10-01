import React from 'react'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

/**
 * Komponen tombol modern dengan berbagai varian dan ukuran
 * Mendukung loading state dan icon
 */
const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:ring-blue-500/50 shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 focus:ring-white/50 backdrop-blur-sm",
    success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-emerald-500/50 shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus:ring-red-500/50 shadow-lg hover:shadow-xl",
    ghost: "text-slate-300 hover:text-white hover:bg-white/10 focus:ring-white/50"
  }
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-3 text-sm rounded-xl",
    lg: "px-6 py-4 text-base rounded-xl"
  }
  
  const disabledClasses = disabled || loading 
    ? "opacity-50 cursor-not-allowed" 
    : "hover:scale-[1.02] active:scale-[0.98]"

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Background gradient overlay */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
      </div>
    </button>
  )
}

export default ModernButton