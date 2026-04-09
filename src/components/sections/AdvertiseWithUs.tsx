'use client'

import { useEffect, useState } from 'react'
import { FlipCounter } from '@/components/ui/FlipCounter'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function AdvertiseWithUs({ isOpen, onClose }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isOpen) return
    fetch('/api/visits')
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => {})
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-surface rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-warm/20 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors text-lg leading-none p-1"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
          Advertise with us
        </p>
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Reach tourists who are{' '}
          <span className="text-gradient-warm">actively planning</span>{' '}
          their Budapest trip
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Your business, in front of the right people — at the right moment. Our readers
          aren&apos;t browsing for fun. They&apos;re choosing where to eat, drink, and spend their
          money. A featured spot on Best of Budapest puts you in front of them exactly
          then — recommended by locals they already trust.
        </p>

        <div className="flex flex-col items-center gap-3 mb-8">
          <span className="text-xs text-text-muted uppercase tracking-widest">
            Unique page views this month
          </span>
          <FlipCounter count={count} />
        </div>

        <a
          href="mailto:chris@laminarsolutions.co.za"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-95"
          style={{ background: 'var(--color-warm)', color: '#0a0a0a' }}
        >
          Get in touch →
        </a>
      </div>
    </div>
  )
}
