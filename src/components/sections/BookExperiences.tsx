'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const PROMO_CODE = 'christhomson'

interface Tag {
  label: string
  color: 'accent' | 'warm'
}

interface Experience {
  id: string
  icon: string
  title: string
  description: string
  href: string
  tags?: Tag[]
}

const experiences: Experience[] = [
  {
    id: 'party-boat',
    icon: '🛥️',
    title: 'Party Boat Cruise',
    description: "One of the biggest and wildest boat parties in Europe — two hours on the Danube with an open bar, a DJ, and Budapest lit up at night. Free partybus transfer straight to the afterparty included, so the night doesn't stop when the boat docks.",
    tags: [
      { label: 'Most popular', color: 'accent' },
      { label: 'Best for groups, stag & hen do\'s', color: 'warm' },
    ],
    href: 'https://budapestboatparty.com/book-now',
  },
  {
    id: 'prosecco-cruise',
    icon: '🥂',
    title: 'Prosecco River Cruise',
    description: "Two vibes, one boat. Take the earlier cruise for a relaxed evening — Budapest's skyline, a glass in your hand, and a proper chilled-out atmosphere. Or hop on the later cruise, which turns into a full-on party cruise with a live DJ and dancing on the Danube.",
    tags: [{ label: 'Great for couples', color: 'warm' }],
    href: 'https://budapestboatparty.com/book-now',
  },
  {
    id: 'pub-crawl',
    icon: '🍻',
    title: 'Ruin Bar Pub Crawl',
    description: 'The definitive Budapest night out. Multiple venues, free shots, and a group of fellow travellers. Led by our own team.',
    tags: [{ label: 'We run this', color: 'accent' }],
    href: 'https://budapestboatparty.com/book-now',
  },
  {
    id: 'szechenyi-baths',
    icon: '♨️',
    title: 'Széchenyi Thermal Baths',
    description: "Europe's largest thermal bath complex — steaming outdoor pools, ornate palace architecture, and yes, the famous chess players. Surprisingly perfect for a group: equal parts relaxing and ridiculous once the drinks come out on the pool deck.",
    tags: [{ label: 'Great for groups, stag & hen do\'s', color: 'warm' }],
    href: 'https://ultimatebudapest.com/things-to-do/most-popular/szechenyi-baths',
  },

]

export function BookExperiences() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleBookClick(exp: Experience) {
    trackEvent('booking_click', { category: 'experiences', label: exp.id })
    try {
      await navigator.clipboard.writeText(PROMO_CODE)
      setCopiedId(exp.id)
      setTimeout(() => setCopiedId((id) => (id === exp.id ? null : id)), 3000)
    } catch {
      // clipboard unavailable — still let the user through to the booking site
    }
    window.open(exp.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="experiences" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-warm text-sm font-semibold uppercase tracking-widest mb-2">Book now</p>
          <h2 className="text-section font-bold text-text-primary">
            Tickets you should{' '}
            <span className="text-gradient-warm">book right now</span>
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
                    {exp.tags?.map((tag) => (
                      <span
                        key={tag.label}
                        className={[
                          'text-xs rounded-full px-2 py-0.5 border',
                          tag.color === 'accent'
                            ? 'bg-accent/10 text-accent border-accent/20'
                            : 'bg-warm/10 text-warm border-warm/20',
                        ].join(' ')}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{exp.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={exp.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleBookClick(exp)
                    }}
                  >
                    Book now with discount →
                  </Button>
                  <p className="text-xs mt-2">
                    {copiedId === exp.id ? (
                      <span className="text-accent font-medium">
                        Copied! ✅ Paste code {PROMO_CODE} at checkout
                      </span>
                    ) : (
                      <span className="text-text-muted">
                        Use code <span className="font-mono text-text-secondary">{PROMO_CODE}</span> at checkout
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
