'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-4 pt-16 pb-8 overflow-hidden">
      <Image
        src="/images/hero-bg-3.jpg"
        alt="Budapest Hero Background"
        fill
        className="object-cover object-bottom -z-20"
        priority
      />
      <div className="absolute inset-0 bg-black/70 -z-10" />
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-4 py-5 flex items-center justify-between">
        <span className="text-text-primary font-bold text-lg tracking-tight">
          Best of<span className="text-gradient-accent"> Budapest</span>
        </span>
        <a
          href="#map"
          onClick={() => trackEvent('hero_cta_click', { label: 'nav_premium_map' })}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          Premium map ↗
        </a>
      </div>

      {/* Hero content */}
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col gap-6">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-base-elevated border border-base-border rounded-full px-4 py-1.5 text-sm text-text-secondary mx-auto">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          Live in Budapest — updated weekly
        </div>

        {/* Headline */}
        <h1 className="text-hero font-black text-text-primary">
          The Best{' '}
          <span className="text-gradient-accent">Budapest Itinerary</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
          Food, nightlife, itineraries, ticket picks, and local favourites —
          built for tourists who want great recommendations fast.
        </p>

        {/* CTA pair */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            size="lg"
            variant="primary"
            href="#explore"
            trackingLabel="hero_explore"
          >
            Take me to The List
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="#map"
            trackingLabel="hero_premium_map"
          >
            Buy me a beer 🍺
          </Button>
        </div>

        {/* Founder credibility */}
        <p className="text-xs text-text-muted pt-2">
          Built by George, Chris &amp; Calvin — bartenders, pub crawl guides, and party boat hosts
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border border-base-border rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
