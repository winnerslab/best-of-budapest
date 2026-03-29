'use client'

import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

interface Partner {
  id: string
  name: string
  category: string
  description: string
  href: string
  sponsored: boolean
}

const partners: Partner[] = [
  {
    id: 'partner-1',
    name: '[Partner Name]',
    category: 'Bar / Ruin bar',
    description: "A local favourite in the VII district. Great cocktails and a proper ruin bar atmosphere.",
    href: '[PARTNER_1_LINK]',
    sponsored: false,
  },
  {
    id: 'partner-2',
    name: '[Partner Name]',
    category: 'Restaurant',
    description: "Traditional Hungarian food done right. Tourists miss this one — don't.",
    href: '[PARTNER_2_LINK]',
    sponsored: false,
  },
]

export function Partners() {
  if (partners.length === 0) return null

  return (
    <section className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-1">Local favourites</p>
          <h2 className="text-xl font-bold text-text-primary">Places we love</h2>
          <p className="text-sm text-text-secondary mt-1">Handpicked venues we&apos;d send our own friends to.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.href}
              onClick={() => trackEvent('partner_click', { category: 'partners', label: partner.id })}
              className="block"
            >
              <Card variant="default" interactive className="p-4 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-accent font-medium uppercase tracking-wide">{partner.category}</span>
                  {partner.sponsored && (
                    <span className="text-xs text-text-muted border border-base-border rounded px-1.5 py-0.5">Sponsored</span>
                  )}
                </div>
                <div className="font-semibold text-text-primary mb-1">{partner.name}</div>
                <p className="text-xs text-text-secondary leading-relaxed">{partner.description}</p>
              </Card>
            </a>
          ))}
        </div>

        <p className="text-xs text-text-muted mt-4 text-center">
          Interested in a featured spot?{' '}
          <a href="mailto:hello@bestofbudapest.com" className="text-accent hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
