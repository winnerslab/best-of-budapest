'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const experiences = [
  {
    id: 'party-boat',
    icon: '🛥️',
    title: 'Party Boat Cruise',
    description: "Two hours on the Danube with an open bar, a DJ, and Budapest lit up at night. The most fun you'll have on the water.",
    tag: 'Most popular',
    tagColor: 'accent' as const,
    href: '[PARTY_BOAT_LINK]',
  },
  {
    id: 'prosecco-cruise',
    icon: '🥂',
    title: 'Prosecco River Cruise',
    description: "Elegant evening on the Danube. Budapest's skyline, a glass in your hand, and a relaxed vibe for couples and groups alike.",
    tag: 'Great for couples',
    tagColor: 'warm' as const,
    href: '[PROSECCO_CRUISE_LINK]',
  },
  {
    id: 'pub-crawl',
    icon: '🍻',
    title: 'Ruin Bar Pub Crawl',
    description: 'The definitive Budapest night out. Multiple venues, free shots, and a group of fellow travellers. Led by our own team.',
    tag: 'We run this',
    tagColor: 'accent' as const,
    href: '[PUB_CRAWL_LINK]',
  },
  {
    id: 'day-trip',
    icon: '🏰',
    title: 'Day Trip: Visegrád & Esztergom',
    description: "A scenic day out from Budapest — castles, the Danube bend, and countryside you won't see from the city.",
    href: '[DAY_TRIP_LINK]',
  },
]

export function BookExperiences() {
  return (
    <section id="experiences" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-warm text-sm font-semibold uppercase tracking-widest mb-2">Book now</p>
          <h2 className="text-section font-bold text-text-primary">
            Experiences we&apos;d{' '}
            <span className="text-gradient-warm">recommend first</span>
          </h2>
          <p className="text-text-secondary mt-2">
            Popular with our guests — and places we actually work and know inside out.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <Card key={exp.id} variant="default" className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{exp.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-text-primary">{exp.title}</span>
                    {exp.tag && (
                      <span className={[
                        'text-xs rounded-full px-2 py-0.5 border',
                        exp.tagColor === 'accent'
                          ? 'bg-accent/10 text-accent border-accent/20'
                          : 'bg-warm/10 text-warm border-warm/20',
                      ].join(' ')}>
                        {exp.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{exp.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={exp.href}
                    onClick={() => trackEvent('booking_click', { category: 'experiences', label: exp.id })}
                  >
                    Book this →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
