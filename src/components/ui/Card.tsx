import { HTMLAttributes, forwardRef } from 'react'

type CardVariant = 'default' | 'elevated' | 'glass' | 'accent' | 'warm'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-base-card border border-base-border',
  elevated: 'bg-base-elevated border border-base-border',
  glass: 'glass-surface',
  accent: 'bg-base-card border border-accent/20 shadow-accent-glow',
  warm: 'bg-base-card border border-warm/20 shadow-warm-glow',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, className = '', children, ...props }, ref) => {
    const classes = [
      'rounded-2xl overflow-hidden',
      variantClasses[variant],
      interactive ? 'card-hover-lift cursor-pointer' : '',
      className,
    ].join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
