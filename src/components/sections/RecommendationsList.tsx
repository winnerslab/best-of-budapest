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
    heading: 'Clubs',
    icon: '🎵',
    places: [
      { name: 'Instant Fogas', tip: 'Biggest club. Commercial music; sometimes techno floor.' },
      { name: 'Szimpla Kert', tip: 'Most popular ruin bar. Fri & Sat get busy — go early for pre-drinks.' },
      { name: 'Aether', tip: 'House & Techno. Highly recommended.' },
      { name: 'La Siesta', tip: 'Commercial music. Fire show at the bar every night.' },
      { name: 'Fuge Udvar', tip: 'Pub games, long tables, dancefloor when ready. Pub/club hybrid.' },
      { name: 'Arzenal Budapest', tip: 'Popular club night in the city centre.' },
      { name: 'Turbina Budapest', tip: 'Cultural hub and club space with a great outdoor area.' },
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
      { name: 'Stifler Bar Budapest', tip: 'Lively bar with a great atmosphere.' },
      { name: 'Spiler Budapest', tip: 'Part of the Gozsdu courtyard — great food and drinks.' },
      { name: 'Boho Bar Budapest', tip: 'Stylish bar with good cocktails and a relaxed vibe.' },
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
      { name: 'Mama Goulash Budapest', tip: 'Great traditional Hungarian goulash.' },
      { name: 'Cirkusz Budapest', tip: 'Excellent brunch spot with a fun, colourful vibe.' },
      { name: 'Csirke Csibesz Budapest', tip: 'Best chicken take-out in the city — cheap and delicious.' },
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
      { name: 'Arany Bakery Budapest', tip: 'Excellent pastries and baked goods.' },
      { name: 'TC Space Budapest', tip: 'Cool specialty coffee spot.' },
      { name: 'Cat Cafe Budapest', tip: 'Hang out with cats while you sip your coffee.' },
    ],
  },
  {
    heading: 'Experiences',
    icon: '✨',
    places: [
      { name: 'Danube River Prosecco Cruise Budapest' },
      { name: 'Budapest Light Art Museum' },
      { name: 'Liberty Bridge Budapest', tip: 'Pizza & wine at sunset — a local ritual.' },
      { name: 'Siofok Balaton', tip: "Day trip to Lake Balaton — Hungary's sea. Beautiful in summer." },
      { name: 'Bolyki Wine Farm Eger', tip: 'Trip to Eger wine country — stunning vineyards and wine tasting.' },
    ],
  },
  {
    heading: 'Sports',
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
    heading: 'Hidden Gems',
    icon: '💎',
    places: [
      { name: 'Circo Pizza', tip: 'Hidden gem pizza spot.' },
      { name: 'Boho Restaurant Budapest', tip: 'Stylish spot with great food and an intimate vibe.' },
      { name: 'Vibe Budapest', tip: 'Trendy bar and lounge — great for an evening out.' },
      { name: 'Bor To Door Budapest', tip: 'Wine bar and delivery service — great natural wine list.' },
      { name: 'Snackie Budapest', tip: 'Legendary frozen yoghurt — find them around the city.' },
      { name: 'Oriental Soup House Budapest', tip: 'Incredible Asian soups — a go-to for a cheap, hearty meal.' },
    ],
  },
  {
    heading: 'Annual Events',
    icon: '🎉',
    places: [
      { name: 'St Stephens Day Budapest', tip: 'Huge national celebration on August 20th with fireworks over the Danube.' },
      { name: 'National Day Budapest', tip: 'March 15th Revolution Day — city-wide parades, speeches, and red-white-green cockades; the city\'s patriotic spirit at its peak.' },
      { name: 'Busójárás Mohács', tip: 'UNESCO-listed carnival (Feb/Mar) where locals don terrifying wooden masks to chase away winter — one of Europe\'s most unusual folk traditions.' },
      { name: 'Easter Budapest', tip: 'Traditional Hungarian Easter (Húsvét) involves men playfully sprinkling women with water or perfume — expect painted eggs and seasonal markets.' },
      { name: 'Budapest Wine Festival', tip: 'September festival at Buda Castle showcasing hundreds of Hungarian wines with live music and sweeping Danube views.' },
      { name: 'Sziget Festival Budapest', tip: 'One of Europe\'s biggest music festivals — a week of world-class acts on an island in the Danube every August.' },
      { name: 'Budapest Marathon', tip: 'October city marathon crossing all major bridges past iconic landmarks — great to spectate even if you\'re not running.' },
      { name: 'Budapest Christmas Markets', tip: 'December markets at Vörösmarty Square and St. Stephen\'s Basilica — among Europe\'s most beautiful, with mulled wine, artisan stalls, and festive lights.' },
      { name: 'New Years Eve Budapest', tip: 'Fireworks over the Danube, ruin bar parties, and city-wide Szilveszter celebrations — Budapest rings in the new year in style.' },
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

        <div id="rec-list-end" />
      </div>
    </section>
  )
}
