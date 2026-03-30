import { Card } from '@/components/ui/Card'

const founders = [
  {
    name: 'George "Ru" Oosthuizen',
    role: 'Bartender & Local Expert',
    bio: "Hosts prosecco cruises on the Danube and leads pub crawls through the ruin bar district every week.",
    emoji: '🛥️',
    initials: 'GR',
    instagrams: [
      { url: 'https://www.instagram.com/ru_oost/', label: 'IG' },
      { url: 'https://www.instagram.com/ru_active/', label: 'Gym IG' },
    ],
  },
  {
    name: 'Chris Thomson',
    role: 'Guest Manager & Pub Crawl Leader',
    bio: "Bar-backs at some of Budapest's best venues and manages international guests at major nightlife events.",
    emoji: '🍸',
    initials: 'CT',
    instagrams: [
      { url: 'https://www.instagram.com/chris.james.thomson/', label: 'IG' },
      { url: 'https://www.instagram.com/thomson.rsa/', label: 'DJ IG' },
    ],
  },
  {
    name: 'Calvin Kriel',
    role: 'Bartender & Event Management',
    bio: 'Has led hundreds of pub crawl groups through Budapest and knows every ruin bar, hidden bar, and gem in the city.',
    emoji: '🏙️',
    initials: 'CK',
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
              <div className="flex items-stretch gap-4">
                <div className="w-12 h-12 rounded-full bg-base-elevated border border-base-border flex items-center justify-center text-sm font-bold text-accent shrink-0">
                  {founder.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-text-primary text-sm">{founder.name}</span>
                    <span className="text-base">{founder.emoji}</span>
                  </div>
                  <div className="text-xs text-accent font-medium mt-0.5">{founder.role}</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{founder.bio}</p>
                </div>
                <div className="shrink-0 w-[72px] flex flex-col gap-1.5 self-stretch">
                  {founder.instagrams.map((ig) => (
                    <a
                      key={ig.url}
                      href={ig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 w-full flex items-center justify-center gap-1.5 border text-xs font-medium rounded-lg transition-all duration-200 active:scale-95"
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
                </div>
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
