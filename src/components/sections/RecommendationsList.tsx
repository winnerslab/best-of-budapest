'use client'

import { trackEvent } from '@/lib/analytics'

interface Place {
  name: string
  tip?: string
}

interface Group {
  heading: string
  icon: string
  places: Place[]
}

const groups: Group[] = [
  {
    heading: 'Sightseeing',
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
    heading: 'Clubs',
    icon: '🎵',
    places: [
      { name: 'Instant Fogas', tip: 'Biggest club. Commercial music; sometimes techno floor.' },
      { name: 'Szimpla Kert', tip: 'Most popular ruin bar. Fri & Sat get busy — go early for pre-drinks.' },
      { name: 'Aether', tip: 'House & Techno. Highly recommended.' },
      { name: 'La Siesta', tip: 'Commercial music. Fire show at the bar every night.' },
      { name: 'Fuge Udvar', tip: 'Pub games, long tables, dancefloor when ready. Pub/club hybrid.' },
    ],
  },
  {
    heading: 'Bars',
    icon: '🍺',
    places: [
      { name: 'Gozsdu Square', tip: 'Passageway packed with bars, restaurants, clubs, and karaoke.' },
      { name: 'Beer Bus Budapest' },
      { name: '360 Bar' },
      { name: 'A Grund', tip: '5–7pm: 50% off beers, cocktails & Jagershots. Book ahead for groups.' },
      { name: 'Pointer Pub', tip: '2–5pm: 1L of beer for 990 HUF.' },
      { name: 'Ruin Brew', tip: 'Great brunch and drink specials.' },
      { name: "Billy's Bar", tip: 'Cheap 1L beers.' },
      { name: 'Morrisons', tip: 'Beer pong Mondays & all-you-can-drink Thursdays (2500 HUF).' },
      { name: 'Tiki Bar Budapest' },
      { name: 'Blue Bird', tip: 'Karaoke bar.' },
      { name: 'Zsiraf', tip: 'Open in summer only.' },
    ],
  },
  {
    heading: 'Food',
    icon: '🍽️',
    places: [
      { name: '26 Restaurant Budapest' },
      { name: 'Mazel Tov Restaurant' },
      { name: 'Cafe Vian', tip: 'Liszt Ferenc branch only (not Gozsdu). Try the red wine goulash.' },
      { name: 'Karavan Food Market' },
      { name: 'Circo Pizza', tip: 'Hidden gem pizza spot.' },
      { name: 'Fat Mamma Budapest' },
      { name: 'Danube River View from Margaret Island Bridge', tip: 'Best at night.' },
    ],
  },
  {
    heading: 'Coffee & Treats',
    icon: '☕',
    places: [
      { name: 'Cookie Beacon Budapest' },
      { name: 'Cookie Beacon Cheesecakes', tip: 'Next door to Cookie Beacon.' },
      { name: 'Kaffa Coffee Budapest' },
      { name: 'Kern Specialty Coffee Budapest' },
    ],
  },
  {
    heading: 'Experiences',
    icon: '✨',
    places: [
      { name: 'Danube River Prosecco Cruise Budapest' },
      { name: 'Budapest Light Art Museum' },
      { name: 'Liberty Bridge Budapest', tip: 'Pizza & wine at sunset — a local ritual.' },
    ],
  },
  {
    heading: 'Annual Events',
    icon: '🎉',
    places: [
      { name: 'St Stephens Day Budapest', tip: 'Huge national celebration with fireworks over the Danube.' },
    ],
  },
]

function mapsUrl(name: string): string {
  const query = name.toLowerCase().includes('budapest') ? name : `${name} Budapest`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function MapsButton({ name }: { name: string }) {
  return (
    <a
      href={mapsUrl(name)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('card_click', { category: 'rec_list_maps', label: name })}
      className="shrink-0 inline-flex items-center gap-1 bg-base-elevated border border-base-border hover:border-accent/40 hover:text-accent text-text-muted text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
    >
      <span className="text-[11px]">📍</span>
      Maps
    </a>
  )
}

export function RecommendationsList() {
  return (
    <section className="px-4 pt-32 pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Local picks</p>
          <h2 className="text-section font-bold text-text-primary">
            Our recommendations
          </h2>
          <p className="text-text-secondary mt-2 text-sm">
            We believe that all the places listed below are worthy of your limited time in our city. Scroll further to see our personal favourites.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <div key={group.heading}>
              {/* Group heading */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{group.icon}</span>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  {group.heading}
                </h3>
                <div className="flex-1 h-px bg-base-border" />
              </div>

              {/* List items */}
              <ul className="flex flex-col gap-2">
                {group.places.map((place) => (
                  <li
                    key={place.name}
                    className="flex items-start justify-between gap-3 py-2 border-b border-base-border/50 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-text-primary">
                        {place.name.replace(/ Budapest$/, '')}
                      </span>
                      {place.tip && (
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{place.tip}</p>
                      )}
                    </div>
                    <MapsButton name={place.name} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
