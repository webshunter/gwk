import React from 'react'
import { clsx } from 'clsx'

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
}

/**
 * Komponen input modern dengan berbagai varian dan styling
 */
const ModernInput: React.FC<ModernInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  ...props
}) => {
  const baseClasses = "w-full px-3 py-2 text-sm transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    default: "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    filled: "bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    outlined: "border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          className={clsx(
            baseClasses,
            variantClasses[variant],
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export default ModernInput