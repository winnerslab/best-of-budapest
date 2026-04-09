export type EventName =
  | 'hero_cta_click'
  | 'card_click'
  | 'premium_map_cta_click'
  | 'booking_click'
  | 'support_click'
  | 'partner_click'
  | 'scroll_depth'
  | 'review_popup_click'
  | 'buy_beer_click'

export interface TrackEventOptions {
  label?: string
  category?: string
  value?: number
}

export function trackEvent(name: EventName, options: TrackEventOptions = {}): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      event_category: options.category ?? 'engagement',
      event_label: options.label,
      value: options.value,
    })
  }

  // Generic dataLayer push (GTM compatible)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...options })
  }
}

// Extend Window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
