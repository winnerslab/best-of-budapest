'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

interface PlaceInfo {
  history: string
  fact: string
}

interface Place {
  name: string
  tip?: string
  info?: PlaceInfo
  calendarLabel?: string
  calendarUrl?: string
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
      {
        name: 'Fishermans Bastion',
        info: {
          history: 'Built between 1895 and 1902 as a decorative terrace on the Buda Castle hill, Fishermans Bastion was designed by Frigyes Schulek in a neo-Romanesque and neo-Gothic style. It was named after the medieval guild of fishermen who were responsible for defending this stretch of the city walls.',
          fact: 'The seven turrets represent the seven Magyar chieftains who led their tribes into the Carpathian Basin in 895 AD — the founding moment of the Hungarian nation.',
        },
      },
      {
        name: 'Buda Castle',
        info: {
          history: 'First built in the 13th century, Buda Castle has been destroyed and rebuilt numerous times across seven centuries of invasions, sieges, and wars. The current Baroque palace complex was largely constructed in the 18th century under Habsburg rule, then extensively damaged during WWII and restored afterwards.',
          fact: 'The castle has been destroyed and rebuilt at least six times in its history — by Mongols, Ottomans, Habsburgs, and most recently by retreating German forces in 1945.',
        },
      },
      {
        name: 'Margaret Island',
        info: {
          history: "A 2.5km island in the middle of the Danube, Margaret Island has been a place of retreat and relaxation for centuries. It was named after Princess Margit (Margaret), daughter of King Béla IV, who lived here as a Dominican nun in the 13th century. The island became a public park in the 19th century.",
          fact: 'No private cars are allowed on the island — the only motorised vehicles are electric. It also has a musical fountain that performs choreographed water shows set to music.',
        },
      },
      {
        name: 'City Park',
        info: {
          history: "Városliget (City Park) was Europe's first public city park, originally a swampy wasteland that was transformed for the Hungarian Millennium celebrations of 1896. The park hosted the grand national exhibition marking 1,000 years since the Magyar conquest of the Carpathian Basin.",
          fact: "The park contains both the Széchenyi Thermal Baths and Vajdahunyad Castle — two of Budapest's most visited attractions — within its grounds.",
        },
      },
      {
        name: 'Heroes Square',
        info: {
          history: 'Hősök tere was constructed for Hungary\'s millennium celebrations in 1896. The Millennium Monument at its centre features the Archangel Gabriel atop a 36m column, flanked by statues of the seven chieftains who led the Magyars into the Carpathian Basin, plus later Hungarian kings and leaders.',
          fact: 'The square is flanked by two identical neo-classical buildings built simultaneously — the Museum of Fine Arts and the Kunsthalle (Hall of Art) — deliberately mirroring each other for perfect symmetry.',
        },
      },
      {
        name: 'Parliament Building',
        info: {
          history: 'Constructed between 1885 and 1904, the Hungarian Parliament is the largest building in Hungary and one of the oldest legislative buildings in Europe. It was designed by Imre Steindl in a neo-Gothic style with Renaissance influences, and sits directly on the bank of the Danube.',
          fact: 'The building contains 691 rooms, 29 staircases, and 10 courtyards. The Hungarian Holy Crown, sceptre, and orb — the coronation regalia — are on permanent display inside.',
        },
      },
      {
        name: 'Saint Stephens Basilica',
        info: {
          history: 'Construction on St. Stephen\'s Basilica began in 1851 but took 54 years to complete due to a catastrophic dome collapse in 1868 that required the entire structure to be torn down and rebuilt from scratch. It was finally consecrated in 1905 and is named after Hungary\'s first Christian king.',
          fact: "The basilica houses the mummified right hand of King Stephen I — Hungary's most sacred relic. It's kept in a golden reliquary in a dedicated chapel and can be illuminated by inserting a coin.",
        },
      },
      {
        name: 'Fashion Street',
        tip: 'Main pedestrian shopping street in the heart of the city.',
        info: {
          history: 'Deák Ferenc utca, known as Fashion Street, is a pedestrian boulevard connecting Vörösmarty Square to Deák Ferenc Square in the heart of Pest. It was comprehensively renovated in 2009 and repositioned as a high-end shopping destination in the city centre.',
          fact: 'The street sits directly above one of the busiest transit hubs in Europe — Deák Ferenc Square station is the only point where all three Budapest metro lines intersect.',
        },
      },
      {
        name: 'Gellert Hill',
        info: {
          history: "Gellért Hill is a 235m volcanic dolomite hill rising steeply from the Danube. It is named after Bishop Gerard (Gellért) of Venice, who was brought to Hungary by King Stephen I to convert the Magyars to Christianity. After Stephen's death, pagan Hungarians reportedly martyred the bishop on this very hill in 1046.",
          fact: 'According to legend, Bishop Gellért was placed in a spiked barrel and rolled down the hill into the Danube. A large statue of him now stands on the hillside, overlooking the river.',
        },
      },
      {
        name: 'Széchenyi Thermal Baths',
        info: {
          history: 'Opened in 1913, Széchenyi is the largest medicinal bath complex in Europe. The neo-Baroque yellow palace was built after two thermal springs were discovered beneath City Park — one at 970m depth at 74°C, and another at 1,246m at 77°C. It quickly became a social institution for Budapestians.',
          fact: 'The outdoor pools remain open year-round, even in winter. Seeing chess players in the steaming outdoor thermal pools on a cold Budapest day is one of the city\'s most iconic sights.',
        },
      },
      {
        name: 'Rudas Baths',
        info: {
          history: 'Rudas is one of the oldest functioning baths in Budapest, built in 1550 during the Ottoman occupation of Hungary. The Ottomans were passionate about bathing culture and constructed several hammams (Turkish baths) across the city — Rudas is the finest surviving example.',
          fact: 'The central octagonal pool sits beneath a stunning 16th-century domed ceiling with star-shaped coloured glass openings — a design unchanged for over 470 years. On Friday and Saturday nights it transforms into a rooftop pool party.',
        },
      },
      {
        name: 'Great Market Hall',
        info: {
          history: "Budapest's Central Market Hall (Központi Vásárcsarnok) was opened in 1897 as the largest and most impressive of five market halls built simultaneously across the city. The ornate building was designed by Samu Pecz and features a striking iron interior structure beneath its colourful tiled roof.",
          fact: 'The multi-coloured Zsolnay ceramic tiles on the roof were made by the world-famous Zsolnay porcelain factory in Pécs — the same manufacturer behind the tiles on the Parliament Building and many other Budapest landmarks.',
        },
      },
      {
        name: 'Chain Bridge Budapest',
        tip: 'Iconic symbol of Budapest. Walk across for stunning Danube views.',
        info: {
          history: 'The Széchenyi Chain Bridge, opened in 1849, was the first permanent bridge to connect Buda and Pest — before it, the two cities were only linked by a seasonal pontoon bridge. It was designed by English engineer William Tierney Clark and built by Scottish engineer Adam Clark, after whom the square at its Buda end is named.',
          fact: 'Retreating German forces blew up every bridge in Budapest in January 1945 — including the Chain Bridge. It was rebuilt identically and reopened exactly 100 years after its original opening in 1949.',
        },
      },
      {
        name: 'Dohány Street Synagogue Budapest',
        tip: 'Largest synagogue in Europe — a stunning and moving visit.',
        info: {
          history: 'The Dohány Street Synagogue was built between 1854 and 1859 in a Moorish Revival style, designed by Viennese architect Ludwig Förster. At the time of its construction, Budapest had one of the largest and most prosperous Jewish communities in Europe. A memorial garden behind the synagogue contains a mass grave for victims of the WWII Budapest Ghetto.',
          fact: 'Franz Liszt and Camille Saint-Saëns both performed on the organ here. The synagogue also has a unique Holocaust memorial tree in its garden — a weeping willow made of metal whose leaves are engraved with the names of victims.',
        },
      },
      {
        name: 'Váci Street Budapest',
        tip: 'Main pedestrian shopping street in the heart of the city.',
        info: {
          history: "Váci utca is one of Budapest's oldest and most famous streets, stretching from Vörösmarty Square southward through the inner city. Historically the main commercial artery of Pest, it has been a pedestrian zone since the 1960s and remains a major tourist corridor.",
          fact: 'The street is split into two distinct sections: the northern end (near Vörösmarty Square) is dominated by international brands and is busier with tourists, while the southern section past the Great Market Hall is quieter, more local, and generally better value.',
        },
      },
      {
        name: 'Vajdahunyad Castle Budapest',
        tip: 'Fairy-tale castle inside City Park — free to walk around.',
        info: {
          history: 'Vajdahunyad Castle was originally built as a temporary cardboard-and-wood structure for the 1896 Millennium Exhibition, intended to display different styles of Hungarian architecture across the centuries. It proved so popular with visitors that it was rebuilt in permanent stone and brick between 1904 and 1908.',
          fact: "The castle is actually an architectural collage — it combines Romanesque, Gothic, Renaissance, and Baroque elements from different real Hungarian buildings all in one structure. It's a highlight reel of 900 years of Hungarian architecture compressed into one courtyard.",
        },
      },
      {
        name: 'Citadel Budapest',
        tip: 'Hilltop fortress with the best panoramic views of the whole city.',
        info: {
          history: 'The Citadel was built by the Habsburg Austrian army between 1850 and 1854, following the suppression of the Hungarian Revolution of 1848–49. Its purpose was to monitor and control the city below — its cannons pointed directly at Pest. The large Liberation Monument (Liberty Statue) next to it was added in 1947 to commemorate Soviet liberation from Nazi occupation.',
          fact: 'Hungarians despised the Citadel so much as a symbol of Habsburg oppression that they petitioned for its demolition almost as soon as it was completed. The gates were symbolically torn off in 1894 to signal that it was no longer a military threat to its own people.',
        },
      },
      {
        name: 'Hungarian National Museum Budapest',
        tip: 'The best overview of Hungarian history — worth a visit.',
        info: {
          history: "Founded in 1802 when Count Ferenc Széchényi donated his personal collection of books, maps, and manuscripts to the nation, the Hungarian National Museum is the country's largest public collection dedicated to natural and human history. The current neo-Classical building was completed in 1847.",
          fact: "The museum's grand front steps are historically significant — on March 15, 1848, the poet Sándor Petőfi stood here and recited his National Song (Nemzeti dal) to a crowd, sparking the Hungarian Revolution against Habsburg rule. March 15 remains a national holiday.",
        },
      },
      {
        name: 'Opera House Budapest',
        tip: 'Grand neo-Renaissance opera house — even the exterior is impressive.',
        info: {
          history: 'The Hungarian State Opera House was designed by Miklós Ybl and opened in 1884 after nine years of construction. It is considered one of the most beautiful opera houses in Europe, built in a neo-Renaissance style with lavish gilded interiors, frescoes, and chandeliers. Gustav Mahler served as its director from 1888 to 1891.',
          fact: 'Emperor Franz Joseph funded the construction but reportedly insisted it be smaller and less grand than the Vienna Opera House. The revenge: acoustics experts consistently rate the Budapest Opera House as having superior acoustics to its Viennese rival.',
        },
      },
      {
        name: 'Shoes on the Danube Bank Budapest',
        tip: 'A deeply moving WWII memorial — one of the most powerful in Europe.',
        info: {
          history: 'The Shoes on the Danube Bank is a memorial created by sculptor Can Togay and film director János Rajk, installed in 2005. It consists of 60 pairs of period iron shoes — men\'s, women\'s, and children\'s — fixed to the Danube embankment. The memorial commemorates the Jewish victims murdered here by Arrow Cross militiamen during the winter of 1944–45.',
          fact: 'Victims were ordered to remove their shoes before being shot, as shoes were valuable wartime commodities. The iron shoes represent this final act of humiliation before death. Visitors often leave flowers, candles, and pebbles inside them as a sign of remembrance.',
        },
      },
      {
        name: 'House of Terror Museum Budapest',
        tip: 'Harrowing and essential — covers both Nazi and Soviet-era oppression.',
        info: {
          history: 'The House of Terror opened in 2002 inside the building at Andrássy út 60 — the same address that served as headquarters for the fascist Arrow Cross party and later for the ÁVH, the Hungarian Soviet-era secret police. Both regimes used the basement for interrogation, torture, and detention of political prisoners.',
          fact: 'The striking exterior features a metal "TERROR" frame that casts a shadow of the word across the building\'s facade. The basement prison cells have been preserved exactly as they were, making for one of the most visceral museum experiences in Central Europe.',
        },
      },
      {
        name: 'Museum of Fine Arts Budapest',
        tip: 'World-class international art collection — free on some national holidays.',
        info: {
          history: "The Museum of Fine Arts (Szépművészeti Múzeum) opened in 1906 on Heroes Square and houses Hungary's primary collection of international art spanning antiquity to the 20th century. Its holdings include Egyptian artefacts, Greek and Roman sculptures, and an exceptional collection of Old Masters paintings.",
          fact: 'Budapest holds one of the largest El Greco collections outside of Spain — over 12 works by the Greek-Spanish master are held here. The museum also has significant works by Raphael, Titian, Velázquez, Rembrandt, and Goya.',
        },
      },
      {
        name: 'Budapest History Museum',
        tip: 'Inside Buda Castle — reveals the medieval city hidden beneath your feet.',
        info: {
          history: 'Located within the Royal Palace of Buda Castle, the Budapest History Museum documents the city from prehistoric times through to the modern era. During post-WWII reconstruction of the castle, workers uncovered intact medieval rooms and Gothic halls that had been buried under layers of rubble from centuries of sieges and rebuilding.',
          fact: 'Excavations revealed a complete Gothic palace beneath the 18th-century Baroque building — entire medieval rooms, courtyard fragments, and sculptures had been perfectly preserved under the rubble. You can walk through sections of the medieval castle that tourists centuries ago never saw.',
        },
      },
      {
        name: 'Pinball Museum Budapest',
        tip: 'Hundreds of playable vintage machines — endlessly fun for all ages.',
        info: {
          history: "The Pinball Museum (Flippermúzeum) houses one of Europe's largest collections of vintage pinball machines, with over 130 machines spanning from the 1940s to the 2000s. Unlike most museums, every single machine is in working order and free to play as part of your entry fee.",
          fact: 'The museum has machines from every major era of pinball history, including pre-flipper games from the 1940s and rare electro-mechanical machines from the 1960s. Entry includes unlimited play — budget several hours if you want to work through the collection.',
        },
      },
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
      { name: 'St Stephens Day Budapest', tip: 'Huge national celebration on August 20th with fireworks over the Danube.', calendarLabel: 'Aug 20', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=St+Stephens+Day+Budapest&dates=20260820/20260821' },
      { name: 'National Day Budapest', tip: 'March 15th Revolution Day — city-wide parades, speeches, and red-white-green cockades; the city\'s patriotic spirit at its peak.', calendarLabel: 'Mar 15', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=National+Day+Budapest&dates=20270315/20270316' },
      { name: 'Busójárás Mohács', tip: 'UNESCO-listed carnival (Feb/Mar) where locals don terrifying wooden masks to chase away winter — one of Europe\'s most unusual folk traditions.', calendarLabel: 'Feb/Mar', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bus%C3%B3j%C3%A1r%C3%A1s+Moh%C3%A1cs' },
      { name: 'Easter Budapest', tip: 'Traditional Hungarian Easter (Húsvét) involves men playfully sprinkling women with water or perfume — expect painted eggs and seasonal markets.', calendarLabel: 'April', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Easter+Budapest' },
      { name: 'Budapest Wine Festival', tip: 'September festival at Buda Castle showcasing hundreds of Hungarian wines with live music and sweeping Danube views.', calendarLabel: 'Sep', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Budapest+Wine+Festival&dates=20260912/20260916' },
      { name: 'Sziget Festival Budapest', tip: 'One of Europe\'s biggest music festivals — a week of world-class acts on an island in the Danube every August.', calendarLabel: 'Aug', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sziget+Festival+Budapest&dates=20260806/20260814' },
      { name: 'Budapest Marathon', tip: 'October city marathon crossing all major bridges past iconic landmarks — great to spectate even if you\'re not running.', calendarLabel: 'Oct', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Budapest+Marathon&dates=20261011/20261012' },
      { name: 'Budapest Christmas Markets', tip: 'December markets at Vörösmarty Square and St. Stephen\'s Basilica — among Europe\'s most beautiful, with mulled wine, artisan stalls, and festive lights.', calendarLabel: 'Dec', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Budapest+Christmas+Markets&dates=20261121/20261231' },
      { name: 'New Years Eve Budapest', tip: 'Fireworks over the Danube, ruin bar parties, and city-wide Szilveszter celebrations — Budapest rings in the new year in style.', calendarLabel: 'Dec 31', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=New+Years+Eve+Budapest&dates=20261231/20270101' },
    ],
  },
]

function mapsUrl(name: string): string {
  const query = name.toLowerCase().includes('budapest') ? name : `${name} Budapest`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function CalendarButton({ label, url, name }: { label: string; url: string; name: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('card_click', { category: 'rec_list_calendar', label: name })}
      className="shrink-0 inline-flex items-center justify-center gap-1 w-20 bg-base-elevated border border-base-border hover:border-accent/40 hover:text-accent text-text-muted text-xs font-medium py-1.5 rounded-lg transition-all duration-200 active:scale-95"
    >
      <span className="text-[11px]">📅</span>
      {label}
    </a>
  )
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

function PlaceRow({ place }: { place: Place }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="flex flex-col border-b border-base-border/50 last:border-0">
      <div className="flex items-start justify-between gap-3 py-2">
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-text-primary">
            {place.name.replace(/ Budapest$/, '')}
          </span>
          {place.tip && (
            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{place.tip}</p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1.5">
          {place.info && (
            <button
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex items-center gap-1 border text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-200 active:scale-95 ${
                open
                  ? 'bg-accent/15 border-accent/50 text-accent'
                  : 'bg-base-elevated border-base-border hover:border-accent/40 hover:text-accent text-text-muted'
              }`}
              aria-expanded={open}
            >
              <span className="text-[11px]">{open ? '✕' : 'ℹ'}</span>
              {open ? 'Close' : 'Get info'}
            </button>
          )}
          {place.calendarLabel && place.calendarUrl
            ? <CalendarButton label={place.calendarLabel} url={place.calendarUrl} name={place.name} />
            : <MapsButton name={place.name} />
          }
        </div>
      </div>

      {/* Expandable info panel */}
      {place.info && open && (
        <div className="pb-3 pr-1">
          <div className="rounded-xl border border-base-border bg-base-elevated/60 p-3.5 space-y-2.5">
            <p className="text-xs text-text-secondary leading-relaxed">{place.info.history}</p>
            <div className="flex items-start gap-2 pt-1 border-t border-base-border/50">
              <span className="text-sm shrink-0 mt-0.5">💡</span>
              <p className="text-xs text-text-muted leading-relaxed italic">{place.info.fact}</p>
            </div>
          </div>
        </div>
      )}
    </li>
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
              <ul className="flex flex-col gap-0">
                {group.places.map((place) => (
                  <PlaceRow key={place.name} place={place} />
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
