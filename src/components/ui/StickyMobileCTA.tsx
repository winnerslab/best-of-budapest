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
          <div className="text-xs text-text-muted">We saved your night 🍺</div>
          <div className="text-sm font-semibold text-text-primary truncate">Now save ours — buy us a beer?</div>
        </div>
        <a
          href="https://buymeacoffee.com/ctchristhomson"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('buy_beer_click', { label: 'sticky_cta' })}
          className="shrink-0 text-base-black text-sm font-semibold px-4 py-2 rounded-xl active:scale-95 transition-all"
          style={{ background: 'var(--color-warm)' }}
        >
          🍺 Cheers
        </a>
      </div>
    </div>
  )
}
