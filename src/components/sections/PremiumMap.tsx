'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

const features = [
  { icon: '⚡', text: 'Save hours of searching' },
  { icon: '📍', text: 'Opens directly in Google Maps' },
  { icon: '✓', text: 'Local-approved — places we actually go' },
  { icon: '🗓️', text: 'Perfect for 1–3 day trips' },
  { icon: '🎯', text: 'Built for first-timers and short stays' },
  { icon: '🔄', text: 'Updated regularly by our team' },
]

const categories = [
  { icon: '🍽️', label: 'Restaurants' },
  { icon: '🍺', label: 'Bars & ruin bars' },
  { icon: '☕', label: 'Brunch & coffee' },
  { icon: '🌅', label: 'Viewpoints' },
  { icon: '🛁', label: 'Thermal baths' },
  { icon: '💎', label: 'Hidden gems' },
]

export function PremiumMap() {
  return (
    <section
      id="map"
      className="px-4"
      style={{ background: 'var(--gradient-premium)' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="text-xs bg-warm/10 text-warm border border-warm/20 rounded-full px-3 py-1 font-semibold">
            Premium product
          </span>
        </div>

        <h2 className="text-section font-bold text-text-primary mb-3">
          The Budapest{' '}
          <span className="text-gradient-warm">Local Map Pack</span>
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          Every great spot in Budapest — curated by three nightlife and hospitality locals.
          Open Google Maps and you&apos;re done. No searching, no guessing, no bad meals.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-1.5 bg-base-elevated border border-base-border rounded-full px-3 py-1.5 text-sm">
              <span>{cat.icon}</span>
              <span className="text-text-secondary">{cat.label}</span>
            </div>
          ))}
        </div>

        <Card variant="elevated" className="p-5 mb-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <li key={feature.text} className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-base">{feature.icon}</span>
                {feature.text}
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Button
            variant="warm"
            size="lg"
            href="[PREMIUM_MAP_LINK]"
            className="w-full sm:w-auto"
            onClick={() => trackEvent('premium_map_cta_click', { label: 'unlock_map' })}
          >
            Unlock the premium map →
          </Button>
          <p className="text-xs text-text-muted">
            One-time purchase. Yours forever.
          </p>
        </div>
      </div>
    </section>
  )
}
