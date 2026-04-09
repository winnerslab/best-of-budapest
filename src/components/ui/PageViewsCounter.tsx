'use client'

import { useEffect, useState } from 'react'
import { FlipCounter } from '@/components/ui/FlipCounter'

export function PageViewsCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/visits')
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <span className="text-xs text-text-muted uppercase tracking-widest">
        Unique page views this month
      </span>
      <FlipCounter count={count} />
    </div>
  )
}
