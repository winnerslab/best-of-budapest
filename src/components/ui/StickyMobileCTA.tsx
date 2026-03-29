'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-surface border-t border-base-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-text-muted">Best of Budapest</div>
          <div className="text-sm font-semibold text-text-primary truncate">Local picks, local knowledge</div>
        </div>
        <a
          href="#map"
          onClick={() => trackEvent('premium_map_cta_click', { label: 'sticky_cta' })}
          className="shrink-0 bg-accent text-base-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-accent-light active:scale-95 transition-all"
        >
          Get map
        </a>
      </div>
    </div>
  )
}
