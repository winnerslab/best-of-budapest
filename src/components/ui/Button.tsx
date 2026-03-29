import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import { trackEvent, EventName } from '@/lib/analytics'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warm'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  trackingLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-base-black font-semibold hover:bg-accent-light active:scale-95 shadow-accent-glow',
  secondary:
    'bg-base-elevated text-text-primary font-medium border border-base-border hover:border-accent/40 hover:bg-base-card active:scale-95',
  ghost:
    'bg-transparent text-text-secondary font-medium hover:text-text-primary hover:bg-base-elevated active:scale-95',
  warm:
    'bg-warm text-base-black font-semibold hover:bg-warm-light active:scale-95 shadow-warm-glow',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, trackingLabel, className = '', onClick, children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none',
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(' ')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (trackingLabel) {
        trackEvent('hero_cta_click', { label: trackingLabel })
      }
      onClick?.(e)
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          onClick={() => trackingLabel && trackEvent('hero_cta_click', { label: trackingLabel })}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
