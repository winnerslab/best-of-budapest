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
]

export function SocialProof() {
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

        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <Card key={t.id} variant="elevated" className="p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-warm text-sm">★</span>
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
          ))}
        </div>
      </div>
    </section>
  )
}
