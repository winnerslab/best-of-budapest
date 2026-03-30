'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const STORAGE_KEY = 'review_popup_dismissed'
const SCROLL_THRESHOLD = 400

export function ReviewPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          href="https://www.tripadvisor.com/UserReviewEdit-g274887-d26585020-Budapest_Sip_and_Sail_Danube_Cruise_with_Unlimited_Prosecco-Budapest_Central_Hungary.html"
          target="_blank"
          rel="noopener noreferrer"
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
