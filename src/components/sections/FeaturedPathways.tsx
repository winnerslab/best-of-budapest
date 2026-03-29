'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const pathways = [
  {
    id: 'itineraries',
    icon: '🗺️',
    title: 'Itineraries',
    description: 'Day-by-day plans for 1, 2, or 3 days. No fluff — just what to do and when.',
    cta: 'See itineraries',
    href: '#itineraries',
    variant: 'accent' as const,
    tag: 'Most popular',
  },
  {
    id: 'nightlife',
    icon: '🍺',
    title: 'Nightlife guide',
    description: 'Ruin bars, party boats, pub crawls, and where to go after midnight.',
    cta: 'Explore nightlife',
    href: '#nightlife',
    variant: 'warm' as const,
  },
  {
    id: 'food',
    icon: '🍽️',
    title: 'Food & drink picks',
    description: "Budapest's best restaurants, langos spots, cafes, and hidden lunch joints.",
    cta: 'Find food',
    href: '#food',
    variant: 'default' as const,
  },
  {
    id: 'experiences',
    icon: '🎟️',
    title: 'Book experiences',
    description: "Party boats, prosecco cruises, pub crawls, and day trips we'd actually recommend.",
    cta: 'Browse experiences',
    href: '#experiences',
    variant: 'default' as const,
  },
  {
    id: 'map',
    icon: '📍',
    title: 'Premium map pack',
    description: 'Curated Google Maps lists — food, bars, brunch, viewpoints. Open and go.',
    cta: 'Get the map',
    href: '#map',
    variant: 'accent' as const,
    tag: 'Best value',
  },
]

type PathwayVariant = 'accent' | 'warm' | 'default'

function getButtonVariant(v: PathwayVariant) {
  if (v === 'accent') return 'primary' as const
  if (v === 'warm') return 'warm' as const
  return 'secondary' as const
}

export function FeaturedPathways() {
  return (
    <section id="itineraries" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Explore</p>
          <h2 className="text-section font-bold text-text-primary">Where do you want to start?</h2>
        </div>

        <div className="flex flex-col gap-4">
          {pathways.map((pathway) => (
            <Card
              key={pathway.id}
              variant={pathway.variant}
              interactive
              className="p-5"
              onClick={() => trackEvent('card_click', { category: 'featured_pathways', label: pathway.id })}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{pathway.icon}</span>
                    <span className="font-bold text-text-primary">{pathway.title}</span>
                    {pathway.tag && (
                      <span className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5">
                        {pathway.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{pathway.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant={getButtonVariant(pathway.variant)}
                  size="sm"
                  href={pathway.href}
                  trackingLabel={`pathway_${pathway.id}`}
                >
                  {pathway.cta} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
