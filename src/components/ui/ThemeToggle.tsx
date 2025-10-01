import React from 'react'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  isDark?: boolean
  onToggle?: () => void
  className?: string
}

/**
 * Komponen toggle untuk dark/light mode
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark = false,
  onToggle,
  className = ""
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-yellow-500" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600" />
      )}
    </button>
  )
}

export default ThemeToggle