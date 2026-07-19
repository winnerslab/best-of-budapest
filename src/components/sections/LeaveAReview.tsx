'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { RedditShareModal } from '@/components/ui/RedditShareModal'
import { trackEvent } from '@/lib/analytics'

const platforms = [
  {
    label: 'GetYourGuide',
    icon: '🎟️',
    href: 'https://gyg.me/LwhyxzBz',
  },
  {
    label: 'Google',
    icon: '🔍',
    href: 'https://www.google.com/search?sca_esv=842869c4d90cbdd0&biw=1920&bih=981&sxsrf=ANbL-n7KegdrZo0zhh1BTDPopR22kbrBPA:1775227426796&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qORgYadZT7nz8emb0k-Dq_W-hBtOISF54zbICKDZPh3c632oMXZQFitHtyDMCjtfpMeRy2_zbrBRFvw0gq3LwwJHzEYxDHUsAa4le80UiHBzMTCnRJQ%3D%3D&q=Sip+%26+Sail:+The+Prosecco+Cruise+Reviews&sa=X&ved=2ahUKEwi5u63B9dGTAxV4Q_EDHf4LE-UQ0bkNegQIJhAH',
  },
]

const SITE_URL = 'https://bestofbudapest.com'
const SHARE_TEXT = '🇭🇺 Discovered the best hidden gems in Budapest — check this out!'

export function LeaveAReview() {
  const [redditOpen, setRedditOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    trackEvent('share_site_click', { label: 'leave_a_review_section' })

    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Clipboard not available
    }

    setTimeout(async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Best of Budapest',
            text: SHARE_TEXT,
            url: SITE_URL,
          })
        } catch {}
      }
    }, 600)
  }

  return (
    <section id="leave-a-review" className="px-4" style={{ background: 'var(--gradient-section)' }}>
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="p-8 text-center">
          <div className="flex justify-center gap-1 text-3xl mb-4">
            <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Had a good time?{' '}
            <span className="text-gradient-warm">Tell the internet.</span>
          </h2>

          <p className="text-text-secondary leading-relaxed mb-2 max-w-md mx-auto">
            Every review that mentions <strong className="text-text-primary">Chris or Loli</strong>{' '}
            by name earns us a €5 tip from the company. That&apos;s not beer money — that&apos;s
            coffee date money. Help us keep the espresso martinis flowing.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4 mt-6">
            {platforms.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-warm text-black shadow-warm-glow text-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                <span>{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <button
              onClick={() => {
                setRedditOpen(true)
                trackEvent('reddit_share_click', { label: 'open_modal' })
              }}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-black shadow-accent-glow text-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              <span>👽</span>
              Share on Reddit
            </button>

            <button
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-warm text-black shadow-warm-glow text-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-200 relative overflow-hidden"
            >
              {copied ? (
                <span className="text-black">✓ Link copied to clipboard!</span>
              ) : (
                <>
                  <span>💌</span>
                  Share this site
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-text-muted italic">
            (Remember to sign in first — anonymous reviews don&apos;t count and we will be sad 🥲)
          </p>
        </Card>
      </div>

      {redditOpen && <RedditShareModal onClose={() => setRedditOpen(false)} />}
    </section>
  )
}
