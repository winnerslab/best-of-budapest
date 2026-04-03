'use client'

import { useEffect } from 'react'

export function PageViewTracker() {
  useEffect(() => {
    fetch('/api/pageview', { method: 'POST' })
  }, [])

  return null
}
