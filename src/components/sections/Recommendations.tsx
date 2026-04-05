'use client'

import { useState, useEffect, useRef } from 'react'
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
      { name: 'Chain Bridge Budapest', tip: 'Iconic symbol of Budapest. Walk across for stunning Danube views.' },
      { name: 'Dohány Street Synagogue Budapest', tip: 'Largest synagogue in Europe — a stunning and moving visit.' },
      { name: 'Váci Street Budapest', tip: 'Main pedestrian shopping street in the heart of the city.' },
      { name: 'Vajdahunyad Castle Budapest', tip: 'Fairy-tale castle inside City Park — free to walk around.' },
      { name: 'Citadel Budapest', tip: 'Hilltop fortress with the best panoramic views of the whole city.' },
      { name: 'Hungarian National Museum Budapest', tip: 'The best overview of Hungarian history — worth a visit.' },
      { name: 'Opera House Budapest', tip: 'Grand neo-Renaissance opera house — even the exterior is impressive.' },
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
      { name: 'Arzenal Budapest', tip: 'Popular club night in the city centre.' },
      { name: 'Turbina Budapest', tip: 'Cultural hub and club space with a great outdoor area.' },
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
      { name: 'Stifler Bar Budapest', tip: 'Lively bar with a great atmosphere.' },
      { name: 'Spiler Budapest', tip: 'Part of the Gozsdu courtyard — great food and drinks.' },
      { name: 'Boho Bar Budapest', tip: 'Stylish bar with good cocktails and a relaxed vibe.' },
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
      { name: 'Mama Goulash Budapest', tip: 'Great traditional Hungarian goulash.' },
      { name: 'Cirkusz Budapest', tip: 'Excellent brunch spot with a fun, colourful vibe.' },
      { name: 'Csirke Csibesz Budapest', tip: 'Best chicken take-out in the city — cheap and delicious.' },
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
      { name: 'Arany Bakery Budapest', tip: 'Excellent pastries and baked goods.' },
      { name: 'TC Space Budapest', tip: 'Cool specialty coffee spot.' },
      { name: 'Cat Cafe Budapest', tip: 'Hang out with cats while you sip your coffee.' },
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
      { name: 'Siofok Balaton', tip: "Day trip to Lake Balaton — Hungary's sea. Beautiful in summer." },
      { name: 'Bolyki Wine Farm Eger', tip: 'Trip to Eger wine country — stunning vineyards and wine tasting.' },
    ],
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: '🏋️',
    places: [
      { name: 'GoActive Gym Budapest' },
      { name: 'Kurdy Thai Box Budapest', tip: 'Muay Thai training — great for drop-in sessions.' },
      { name: 'Fite Club Budapest', tip: 'MMA gym — welcoming to visitors.' },
      { name: 'ZR Team Budapest', tip: 'BJJ — solid gym for rolling.' },
      { name: 'Margaret Island Budapest', tip: '5km running track around the island — a Budapest staple.' },
      { name: 'Athletic Stadium Budapest', tip: 'Public running track open to all.' },
    ],
  },
  {
    id: 'hidden-gems',
    label: 'Hidden Gems',
    icon: '💎',
    places: [
      { name: 'Circo Pizza Budapest', tip: 'Hidden gem pizza spot.' },
      { name: 'Boho Restaurant Budapest', tip: 'Stylish spot with great food and an intimate vibe.' },
      { name: 'Vibe Budapest', tip: 'Trendy bar and lounge — great for an evening out.' },
      { name: 'Bor To Door Budapest', tip: 'Wine delivery service — also has a great bar.' },
      { name: 'Snackie Budapest', tip: 'Legendary frozen yoghurt — find them around the city.' },
      { name: 'Oriental Soup House Budapest', tip: 'Incredible Asian soups — a go-to for a cheap, hearty meal.' },
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
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  return (
    <section id="recommendations" ref={sectionRef} className="px-4 pt-32 pb-20">
      <div 
        className={`max-w-2xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Local picks</p>
          <h2 className="text-section font-bold text-text-primary">
            Our <span className="text-accent">favourites</span> by category
          </h2>
          <p className="text-text-secondary mt-2">
            Everything we&apos;d tell a friend on their first trip to Budapest.
          </p>
        </div>

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
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
          {active.places.map((place) => {
            const isExpanded = expandedPlace === place.name
            
            return (
              <div
                key={place.name}
                className={`flex flex-col bg-base-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'border-accent/50 shadow-[0_0_15px_rgba(var(--color-accent),0.1)]' : 'border-base-border'
                }`}
              >
                {/* Clickable Header Row */}
                <button 
                  onClick={() => setExpandedPlace(isExpanded ? null : place.name)}
                  className="flex items-start justify-between gap-4 p-4 text-left w-full hover:bg-base-elevated/30 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-text-primary text-sm leading-snug transition-transform duration-300">
                      {place.name.replace(/ Budapest$/, '')}
                    </div>
                    {place.tip && (
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{place.tip}</p>
                    )}
                  </div>
                  {/* Keep Maps button clickable without expanding/collapsing the card */}
                  <a
                    href={mapsUrl(place.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      trackEvent('card_click', { category: 'recommendations_maps', label: place.name })
                    }}
                    className="shrink-0 flex items-center gap-1.5 bg-base-elevated border border-base-border hover:border-accent/40 hover:text-accent text-text-secondary text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <span>📍</span>
                    Maps
                  </a>
                </button>

                {/* Expandable Content (Images Placeholder) */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-4 mt-1 mb-4 pt-4 pb-5 px-4 border-t border-base-border/30 bg-base-elevated/30 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-xl mb-2 opacity-50">🖼️</span>
                      <p className="text-sm font-medium text-text-secondary">Images coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Count */}
        <p className="text-xs text-text-muted mt-4 text-center">
          {active.places.length} {active.label.toLowerCase()} picks
        </p>
      </div>
    </section>
  )
}
