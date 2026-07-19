'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

export function SupportUs() {
  return (
    <section className="px-4">
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="p-8 text-center">
          <div className="text-5xl mb-4">🍺🍸</div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Loved it?{' '}
            <span className="text-gradient-warm">Buy us a drink</span>
          </h2>
          <p className="text-text-secondary leading-relaxed mb-2 max-w-md mx-auto">
            We&apos;re Chris and Loli — a couple who actually live here and built this
            so you could stop wasting your Budapest time on the wrong things.
            This guide is free, and we&apos;re determined to keep it that way.
          </p>
          <p className="text-sm text-text-muted mb-6">
            Chris drinks beer. Loli drinks espresso martinis. A tip means we get to go on
            a date and feel very smug about it. Help fund the romance. 🥂
          </p>
          <Button
            variant="warm"
            size="lg"
            href="https://buymeacoffee.com/ctchristhomson"
            onClick={() => trackEvent('support_click', { label: 'buy_us_a_beer' })}
          >
            Buy us a drink →
          </Button>
          <p className="text-xs text-text-muted mt-4">No pressure. Seriously — it&apos;s free either way.</p>
        </Card>
      </div>
    </section>
  )
}
