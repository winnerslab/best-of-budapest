'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const STORAGE_KEY = 'review_popup_dismissed'

export function ReviewPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const sentinel = document.getElementById('rec-list-end')
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm glass-surface rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-warm/20">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors text-lg leading-none p-1"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="text-4xl mb-3 text-center">🤑</div>

        {/* Title */}
        <h3 className="text-warm font-bold text-xl text-center mb-2">
          Did you know?
        </h3>

        {/* Message */}
        <div className="text-text-secondary text-sm text-center leading-relaxed mb-5 space-y-2">
          <p>We earn a <strong className="text-text-primary">5€ tip</strong> for every review that mentions our names!</p>
          <p className="text-xs text-text-muted italic">
            (Just remember to sign in, otherwise it won't count 🥲)
          </p>
        </div>

        {/* CTA */}
        <a
          href="#leave-a-review"
          onClick={() => {
            trackEvent('review_popup_click', { label: 'leave_review' })
            dismiss()
          }}
          className="block w-full text-center bg-warm text-base-black font-semibold text-sm py-3 rounded-xl hover:bg-warm-light active:scale-95 transition-all duration-200 shadow-warm-glow"
        >
          Leave a review now! ⭐
        </a>

        {/* Dismiss link */}
        <button
          onClick={dismiss}
          className="block w-full text-center text-xs text-text-muted hover:text-text-secondary transition-colors mt-3"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
