import React from 'react'
import { clsx } from 'clsx'

interface ModernTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

/**
 * Komponen textarea modern dengan berbagai varian dan styling
 */
const ModernTextarea: React.FC<ModernTextareaProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  resize = 'vertical',
  className,
  ...props
}) => {
  const baseClasses = "w-full px-3 py-2 text-sm transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    default: "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    filled: "bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    outlined: "border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  }

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize"
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <textarea
        className={clsx(
          baseClasses,
          variantClasses[variant],
          resizeClasses[resize],
          error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export default ModernTextarea