'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

const MILESTONES = [25, 50, 75, 100]

export function ScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone)
          trackEvent('scroll_depth', { value: milestone, label: `${milestone}%` })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
