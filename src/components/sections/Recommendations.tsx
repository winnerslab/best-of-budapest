'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Place {
  name: string
  tip?: string
}

interface Category {
  id: string
  label: string
  icon: string
  places: Place[]
}

const categories: Category[] = [
  {
    id: 'sightseeing',
    label: 'Sightseeing',
    icon: '🏛️',
    places: [
      { name: 'Fishermans Bastion' },
      { name: 'Buda Castle' },
      { name: 'Margaret Island' },
      { name: 'City Park' },
      { name: 'Heroes Square' },
      { name: 'Parliament Building' },
      { name: 'Saint Stephens Basilica' },
      { name: 'Fashion Street' },
      { name: 'Gellert Hill' },
      { name: 'Széchenyi Thermal Baths' },
      { name: 'Rudas Baths' },
      { name: 'Great Market Hall' },
    ],
  },
  {
    id: 'clubs',
    label: 'Clubs',
    icon: '🎵',
    places: [
      { name: 'Instant Fogas', tip: 'Biggest club. Commercial music; sometimes techno floor.' },
      { name: 'Szimpla Kert', tip: 'Most popular ruin bar. Fri & Sat get busy — go early for pre-drinks.' },
      { name: 'Aether', tip: 'House & Techno. Recommended.' },
      { name: 'La Siesta', tip: 'Commercial music. Fire show at the bar every night.' },
      { name: 'Fuge Udvar', tip: 'Pub games, long tables, dancefloor when ready. Pub/club hybrid.' },
    ],
  },
  {
    id: 'bars',
    label: 'Bars',
    icon: '🍺',
    places: [
      { name: 'Gozsdu Square', tip: 'Passageway packed with bars, restaurants, clubs, and karaoke.' },
      { name: 'Beer Bus Budapest' },
      { name: '360 Bar Budapest' },
      { name: 'A Grund Budapest', tip: '5–7pm: 50% off beers, cocktails & Jagershots. Book ahead for groups.' },
      { name: 'Pointer Pub Budapest', tip: '2–5pm: 1L of beer for 990 HUF.' },
      { name: 'Ruin Brew Budapest', tip: 'Great brunch and drink specials.' },
      { name: "Billy's Bar Budapest", tip: 'Cheap 1L beers.' },
      { name: 'Morrisons Budapest', tip: 'Beer pong Mondays & all you can drink Thursdays (2500 HUF).' },
      { name: 'Tiki Bar Budapest' },
      { name: 'Blue Bird Budapest', tip: 'Karaoke bar.' },
      { name: 'Zsiraf Budapest', tip: 'Open in summer only.' },
    ],
  },
  {
    id: 'food',
    label: 'Food',
    icon: '🍽️',
    places: [
      { name: '26 Restaurant Budapest' },
      { name: 'Mazel Tov Restaurant Budapest' },
      { name: 'Cafe Vian Budapest', tip: 'Go to the Liszt Ferenc branch, not Gozsdu. Try the red wine goulash.' },
      { name: 'Karavan Food Market Budapest' },
      { name: 'Circo Pizza Budapest', tip: 'Hidden gem pizza spot.' },
      { name: 'Fat Mamma Budapest' },
      { name: 'Danube river view Margaret Island Bridge', tip: 'Best at night — walk across for the view.' },
    ],
  },
  {
    id: 'coffee',
    label: 'Coffee',
    icon: '☕',
    places: [
      { name: 'Cookie Beacon Budapest' },
      { name: 'Cookie Beacon Cheesecakes Budapest', tip: 'Next door to Cookie Beacon.' },
      { name: 'Kaffa Coffee Budapest' },
      { name: 'Kern Specialty Coffee Budapest' },
    ],
  },
  {
    id: 'experiences',
    label: 'Experiences',
    icon: '✨',
    places: [
      { name: 'Danube River Sightseeing and Prosecco Cruise Budapest' },
      { name: 'Budapest Light Art Museum' },
      { name: 'Liberty Bridge Budapest', tip: 'Pizza & wine at sunset on the bridge — a local favourite.' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    icon: '🎉',
    places: [
      { name: 'St Stephens Day Budapest', tip: 'Annual national holiday — massive celebration with fireworks over the Danube.' },
    ],
  },
]

function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function Recommendations() {
  const [activeId, setActiveId] = useState(categories[0].id)

  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  return (
    <section id="recommendations" className="px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Local picks</p>
          <h2 className="text-section font-bold text-text-primary">
            Our recommendations
          </h2>
          <p className="text-text-secondary mt-2">
            Every place we&apos;d send a friend on their first night in Budapest.
          </p>
        </div>

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveId(cat.id)
                trackEvent('card_click', { category: 'recommendations_tab', label: cat.id })
              }}
              className={[
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0',
                activeId === cat.id
                  ? 'bg-accent text-base-black'
                  : 'bg-base-elevated border border-base-border text-text-secondary hover:text-text-primary hover:border-accent/30',
              ].join(' ')}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Place cards */}
        <div className="flex flex-col gap-3">
          {active.places.map((place) => (
            <div
              key={place.name}
              className="flex items-start justify-between gap-4 bg-base-card border border-base-border rounded-2xl p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-text-primary text-sm leading-snug">
                  {/* Strip the trailing " Budapest" from display names */}
                  {place.name.replace(/ Budapest$/, '')}
                </div>
                {place.tip && (
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{place.tip}</p>
                )}
              </div>
              <a
                href={mapsUrl(place.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('card_click', { category: 'recommendations_maps', label: place.name })}
                className="shrink-0 flex items-center gap-1.5 bg-base-elevated border border-base-border hover:border-accent/40 hover:text-accent text-text-secondary text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                <span>📍</span>
                Maps
              </a>
            </div>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-text-muted mt-4 text-center">
          {active.places.length} {active.label.toLowerCase()} picks
        </p>
      </div>
    </section>
  )
}
