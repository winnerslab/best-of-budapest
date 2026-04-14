'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    id: 1,
    quote: "This helped us plan our whole weekend in about 10 minutes. The food picks were genuinely great — not the usual tourist traps.",
    name: 'Sarah M.',
    detail: 'London, UK — 3 days in Budapest',
    stars: 5,
  },
  {
    id: 2,
    quote: "Used the map on our first day and it was perfect. Saved us so much time googling random places.",
    name: 'Jake & Roos',
    detail: 'Amsterdam — city break',
    stars: 5,
  },
  {
    id: 3,
    quote: "The nightlife guide actually worked — we ended up at places that were packed and fun, not the dead tourist bars.",
    name: 'Tom R.',
    detail: 'Dublin, Ireland',
    stars: 5,
  },
  {
    id: 4,
    quote: "We spent 4 days in Budapest and this was genuinely the most useful thing we found. Every recommendation was spot on.",
    name: 'Mia & Carl',
    detail: 'Berlin, Germany — long weekend',
    stars: 5,
  },
  {
    id: 5,
    quote: "The ruin bar section alone was worth it. We hit three in one night and every single one was buzzing.",
    name: 'Liam O.',
    detail: 'Melbourne, Australia',
    stars: 5,
  },
  {
    id: 6,
    quote: "Finally a guide that doesn't just list the same spots as every travel blog. These felt like real local tips.",
    name: 'Elena V.',
    detail: 'Barcelona, Spain — solo trip',
    stars: 5,
  },
  {
    id: 7,
    quote: "Booked the boat party through this and it was the highlight of our trip. Exactly what it said it would be.",
    name: 'Nico & Bea',
    detail: 'Paris, France',
    stars: 5,
  },
  {
    id: 8,
    quote: "The food picks are incredible. We ate incredibly well without paying tourist prices once.",
    name: 'Priya S.',
    detail: 'Toronto, Canada — solo travel',
    stars: 5,
  },
  {
    id: 9,
    quote: "Sent this to my sister before her trip and she messaged me on day one saying it was perfect. Highly recommend.",
    name: 'James T.',
    detail: 'Manchester, UK',
    stars: 5,
  },
  {
    id: 10,
    quote: "Super easy to navigate and everything was exactly where the guide said it would be. No bad experiences at all.",
    name: 'Sofie & Mark',
    detail: 'Copenhagen, Denmark',
    stars: 5,
  },
  {
    id: 11,
    quote: "We had one day in Budapest and this helped us squeeze in the best of the city. No time wasted on mediocre spots.",
    name: 'Rafael M.',
    detail: 'São Paulo, Brazil — layover trip',
    stars: 5,
  },
  {
    id: 12,
    quote: "The itinerary section is brilliant. We followed the 2-day plan almost exactly and it flowed perfectly.",
    name: 'Hannah & Pete',
    detail: 'Edinburgh, UK — honeymoon',
    stars: 5,
  },
  {
    id: 13,
    quote: "Didn't realise how much there was to do beyond the main tourist sites. This opened up a whole side of the city.",
    name: 'Yuki K.',
    detail: 'Tokyo, Japan — Europe trip',
    stars: 5,
  },
]

const VISIBLE = 3
const GAP = 16
const INTERVAL_MS = 3500
const TRANSITION_MS = 480

export function SocialProof() {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const [slotHeight, setSlotHeight] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Measure card heights after first render
  useEffect(() => {
    const heights = cardRefs.current.slice(0, VISIBLE).map(el => el?.offsetHeight ?? 0)
    const total = heights.reduce((sum, h) => sum + h, 0) + GAP * (VISIBLE - 1)
    setContainerHeight(total)
    setSlotHeight((cardRefs.current[0]?.offsetHeight ?? 0) + GAP)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!slotHeight) return
    const id = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % testimonials.length)
        setAnimating(false)
      }, TRANSITION_MS)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [slotHeight])

  // Render VISIBLE + 1 cards (3 visible + 1 sliding in from below)
  const items = Array.from({ length: VISIBLE + 1 }, (_, i) =>
    testimonials[(index + i) % testimonials.length]
  )

  return (
    <section className="px-4" style={{ background: 'var(--gradient-section)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-section font-bold text-text-primary">
            What guests say
          </h2>
          <p className="text-text-secondary mt-2">
            From real tourists who used this guide in Budapest.
          </p>
        </div>

        <div
          style={{
            height: containerHeight != null ? containerHeight : 'auto',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: GAP,
              transform: animating ? `translateY(-${slotHeight}px)` : 'translateY(0)',
              transition: animating ? `transform ${TRANSITION_MS}ms ease-in-out` : 'none',
            }}
          >
            {items.map((t, i) => (
              <div
                key={`${index}-${i}`}
                ref={el => { cardRefs.current[i] = el }}
              >
                <Card variant="elevated" className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-warm text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.detail}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
