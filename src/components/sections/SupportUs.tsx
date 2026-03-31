'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

export function SupportUs() {
  return (
    <section className="px-4">
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="p-8 text-center">
          <div className="text-5xl mb-4">🍺🍺🍺</div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            If this helped your trip,{' '}
            <span className="text-gradient-warm">buy us a beer</span>
          </h2>
          <p className="text-text-secondary leading-relaxed mb-2 max-w-md mx-auto">
            We&apos;re three students building the local guide we wish tourists always had.
            This is free, and we want to keep it that way.
          </p>
          <p className="text-sm text-text-muted mb-6">
            Your support helps us keep it updated, improve the content, and maybe buy our own beers for once.
          </p>
          <Button
            variant="warm"
            size="lg"
            href="https://buymeacoffee.com/ctchristhomson"
            onClick={() => trackEvent('support_click', { label: 'buy_us_a_beer' })}
          >
            Buy us a beer →
          </Button>
          <p className="text-xs text-text-muted mt-4">No pressure. Seriously — it&apos;s free either way.</p>
        </Card>
      </div>
    </section>
  )
}
