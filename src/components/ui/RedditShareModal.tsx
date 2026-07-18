'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export function RedditShareModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  async function handleCopyAndGo() {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      trackEvent('reddit_share_click', { label: 'copy_and_go' })
      window.open('https://www.reddit.com/submit', '_blank', 'noopener,noreferrer')
      setTimeout(() => setCopied(false), 3000)
    } catch {
      window.open('https://www.reddit.com/submit', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm glass-surface rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-warm/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors text-lg leading-none p-1"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="text-4xl mb-3 text-center">👽</div>

        {/* Title */}
        <h3 className="text-warm font-bold text-xl text-center mb-2">
          Take us to Reddit!
        </h3>

        {/* Message */}
        <div className="text-text-secondary text-sm text-center leading-relaxed mb-5 space-y-2">
          <p>
            Somewhere out there, a redditor is typing &quot;what should I actually do in Budapest&quot;
            for the hundredth time. Be the hero who drops our link instead of another
            copy-pasted listicle.
          </p>
          <p className="text-xs text-text-muted italic">
            (r/Budapest, r/travel, r/solotravel — anywhere tourists are begging for help. We&apos;re not picky.)
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleCopyAndGo}
          className={`block w-full text-center font-semibold text-sm py-3 rounded-xl active:scale-95 transition-all duration-200 ${
            copied
              ? 'bg-accent text-base-black shadow-accent-glow'
              : 'bg-warm text-base-black hover:bg-warm-light shadow-warm-glow'
          }`}
        >
          {copied ? 'Copied! ✅ Now go paste it 👀' : 'Copy website and go to Reddit 🚀'}
        </button>

        {/* Dismiss link */}
        <button
          onClick={onClose}
          className="block w-full text-center text-xs text-text-muted hover:text-text-secondary transition-colors mt-3"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
