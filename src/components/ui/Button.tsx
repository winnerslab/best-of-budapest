'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import { trackEvent } from '@/lib/analytics'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warm'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  trackingLabel?: string
  className?: string
  children?: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

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

const baseClasses =
  'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none'

export function Button({
  variant = 'primary',
  size = 'md',
  trackingLabel,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].join(' ')

  const handleTracking = () => {
    if (trackingLabel) {
      trackEvent('hero_cta_click', { label: trackingLabel })
    }
  }

  if ('href' in props && props.href !== undefined) {
    const { href, onClick, ...anchorProps } = props as ButtonAsAnchor
    return (
      <a
        href={href}
        className={classes}
        onClick={(e) => {
          handleTracking()
          onClick?.(e)
        }}
        {...anchorProps}
      >
        {children}
      </a>
    )
  }

  const { onClick, ...buttonProps } = props as ButtonAsButton
  return (
    <button
      className={classes}
      onClick={(e) => {
        handleTracking()
        onClick?.(e)
      }}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
