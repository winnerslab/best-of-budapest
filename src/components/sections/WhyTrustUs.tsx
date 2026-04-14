import Image from 'next/image'
import { Card } from '@/components/ui/Card'

const founders = [
  {
    name: 'George "Ru" Oosthuizen',
    role: 'Bartender & Local Expert',
    bio: "Has personally stress-tested Budapest's prosecco supply and somehow turned it into a public service. Equal parts boat host, nightlife scout, and professional bad-influence-with-good-intentions, Ru knows exactly where your night should start, peak, and get mildly irresponsible.",
    emoji: '🛥️',
    photo: '/images/profile-ru.png',
    instagrams: [
      { url: 'https://www.instagram.com/ru_oost/', label: 'IG' },
      { url: 'https://www.instagram.com/ru_active/', label: 'Gym IG' },
    ],
  },
  {
    name: 'Chris Thomson',
    role: 'Guest Manager & Pub Crawl Leader',
    bio: "Specialises in herding confused tourists, locating lost pub crawlers, and keeping the chaos looking intentional. If your night runs smoothly, Chris was probably behind it. If it gets weird, he'll still somehow make it feel like part of the package.",
    emoji: '🍸',
    photo: '/images/profile-chris.png',
    instagrams: [
      { url: 'https://www.instagram.com/chris.james.thomson/', label: 'IG' },
      { url: 'https://www.instagram.com/thomson.rsa/', label: 'DJ IG' },
    ],
    beerUrl: 'https://buymeacoffee.com/ctchristhomson',
  },
  {
    name: 'Calvin Kriel',
    role: 'Bartender & Event Management',
    bio: "Knows Budapest nightlife like a man who's done extensive field research in dim lighting and loud music. From hidden bars to full-send party spots, Calvin can point you toward exactly the kind of evening your future self may or may not forgive.",
    emoji: '🏙️',
    photo: '/images/profile-calvin.png',
    instagrams: [
      { url: 'https://www.instagram.com/calvin_kriel/', label: 'IG' },
    ],
  },
]

const trustBullets = [
  'We work directly with international guests every week',
  "We know what tourists actually ask for — because they ask us",
  "We only recommend places we'd genuinely send our own friends",
  'Fast, useful, no-BS suggestions — not generic travel blog filler',
  'We live and work in Budapest nightlife, not behind a desk',
]

export function WhyTrustUs() {
  return (
    <section className="px-4" style={{ background: 'var(--gradient-section)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Why trust us</p>
          <h2 className="text-section font-bold text-text-primary">
            Not a travel blog.{' '}
            <span className="text-gradient-accent">Actual locals.</span>
          </h2>
          <p className="text-text-secondary mt-3 leading-relaxed">
            We are three students who work in Budapest tourism and nightlife. We get asked
            for recommendations by tourists every single week — so we built the guide we
            kept giving away for free.
          </p>
        </div>

        <div className="grid gap-3 mb-8">
          {founders.map((founder) => (
            <Card key={founder.name} variant="default" className="p-4">
              {/* Header: centred photo + name + role */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-24 h-24 rounded-full border-2 border-base-border shrink-0 overflow-hidden relative mb-3">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <span className="font-semibold text-text-primary text-base">{founder.name}</span>
                  <span className="text-base">{founder.emoji}</span>
                </div>
                <div className="text-xs text-accent font-medium mt-1">{founder.role}</div>
              </div>

              {/* Bio */}
              <p className="text-xs text-text-secondary leading-relaxed mb-4">{founder.bio}</p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                {founder.instagrams.map((ig) => (
                  <a
                    key={ig.url}
                    href={ig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-lg transition-all duration-200 active:scale-95"
                    style={{
                      background: 'rgba(225,48,108,0.12)',
                      borderColor: 'rgba(225,48,108,0.35)',
                      color: '#E1306C',
                    }}
                    aria-label={`${founder.name} on Instagram (${ig.label})`}
                  >
                    <span className="text-[11px]">📸</span>
                    <span>{ig.label}</span>
                  </a>
                ))}
                {'beerUrl' in founder && founder.beerUrl && (
                  <a
                    href={founder.beerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-lg transition-all duration-200 active:scale-95"
                    style={{
                      background: 'rgba(251,191,36,0.15)',
                      borderColor: 'rgba(251,191,36,0.5)',
                      color: '#FBBF24',
                    }}
                  >
                    <span>Buy Chris a beer! 🍺</span>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card variant="elevated" className="p-5">
          <ul className="space-y-3">
            {trustBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent mt-0.5 shrink-0">✓</span>
                {bullet}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
