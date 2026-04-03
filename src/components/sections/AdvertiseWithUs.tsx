// src/components/sections/AdvertiseWithUs.tsx
import redis from '@/lib/redis'
import { FlipCounter } from '@/components/ui/FlipCounter'

async function getMonthlyViews(): Promise<number> {
  try {
    const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
    const raw = await redis.get(key) ?? '0'
    return Number(raw)
  } catch {
    return 0
  }
}

export async function AdvertiseWithUs() {
  const count = await getMonthlyViews()

  return (
    <section className="px-4 py-16" style={{ background: 'var(--gradient-section)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
          Advertise with us
        </p>
        <h2 className="text-section font-bold text-text-primary mb-3">
          Reach tourists who are{' '}
          <span className="text-gradient-warm">actively planning</span>{' '}
          their Budapest trip
        </h2>
        <p className="text-text-secondary leading-relaxed mb-10 max-w-lg mx-auto">
          Your business, in front of the right people — at the right moment. Our readers
          aren&apos;t browsing for fun. They&apos;re choosing where to eat, drink, and spend their
          money. A featured spot on Best of Budapest puts you in front of them exactly
          then — recommended by locals they already trust.
        </p>

        <div className="flex flex-col items-center gap-3 mb-10">
          <span className="text-xs text-text-muted uppercase tracking-widest">
            Page views this month
          </span>
          <FlipCounter count={count} />
        </div>

        <a
          href="mailto:chris@laminarsolutions.co.za"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: 'var(--color-warm)',
            color: '#0a0a0a',
          }}
        >
          Get in touch →
        </a>
      </div>
    </section>
  )
}
