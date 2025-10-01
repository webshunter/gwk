import React from 'react'
import { clsx } from 'clsx'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale'
}

/**
 * Komponen kartu dengan animasi yang dapat dikustomisasi
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hover = true,
  delay = 0,
  animation = 'fadeIn'
}) => {
  const animationClasses = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideIn: 'animate-slide-in',
    scale: 'animate-scale-in'
  }

  const hoverClasses = hover 
    ? 'hover:scale-[1.02] hover:shadow-lg transition-all duration-200' 
    : ''

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm',
        animationClasses[animation],
        hoverClasses,
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedCard