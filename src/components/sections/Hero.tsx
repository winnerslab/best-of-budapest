'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-start px-4 pt-[10vh] pb-8 overflow-hidden">
      <Image
        src="/images/hero-bg-3.jpg"
        alt="Budapest Hero Background"
        fill
        className="object-cover object-bottom -z-20"
        priority
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero content */}
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col gap-3">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-base-elevated border border-base-border rounded-full px-4 py-1.5 text-sm text-text-secondary mx-auto">
          <span className="w-2 h-2 rounded-full bg-warm animate-pulse-glow" />
          Budapest Top Picks - updated weekly
        </div>

        {/* Headline */}
        <h1 className="text-[1.5rem] sm:text-hero font-black text-text-primary">
          The Best{' '}
          <span className="text-gradient-warm">Budapest Itinerary</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
          Food, nightlife, itineraries, ticket picks, and local favourites —
          built for tourists who want great recommendations fast.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-row gap-3 justify-center">
            <Button
              size="sm"
              variant="warm"
              href="#recommendations"
              trackingLabel="hero_explore"
              className="sm:px-8 sm:py-4 sm:text-lg sm:rounded-2xl"
            >
              Get the list 📍
            </Button>
            <Button
              size="sm"
              variant="secondary"
              href="#map"
              trackingLabel="hero_premium_map"
              className="sm:px-8 sm:py-4 sm:text-lg sm:rounded-2xl"
            >
              Buy us a beer! 🍺
            </Button>
          </div>
          <a
            href="#leave-a-review"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 sm:px-8 sm:py-4 sm:text-lg sm:rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid #FBBF24',
              color: '#FBBF24',
            }}
          >
            Tip 5€ by Reviewing Us! 🤩
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border border-base-border rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-warm rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
