'use client'

import { trackEvent } from '@/lib/analytics'

interface Tile {
  id: string
  icon: string
  title: string
  label: string
  href: string
  accent?: 'green' | 'warm'
}

const tiles: Tile[] = [
  { id: 'first-time', icon: '🗺️', title: 'First time in Budapest', label: 'Start here', href: '#recommendations', accent: 'green' },
  { id: 'nightlife', icon: '🍺', title: 'Best nightlife tonight', label: 'Bars, clubs & crawls', href: '#recommendations', accent: 'warm' },
  { id: 'food', icon: '🥘', title: 'Best food near me', label: 'Local picks only', href: '#recommendations' },
  { id: 'one-day', icon: '⚡', title: '1-day itinerary', label: 'See it all, fast', href: '#recommendations' },
  { id: 'two-day', icon: '📅', title: '2–3 day itinerary', label: 'The full experience', href: '#recommendations' },
  { id: 'budget', icon: '💸', title: 'Budget-friendly', label: 'Amazing on less', href: '#recommendations' },
  { id: 'brunch', icon: '☕', title: 'Brunch & coffee', label: 'Morning sorted', href: '#recommendations' },
  { id: 'hidden', icon: '🔍', title: 'Hidden gems', label: 'Beyond the tourist trail', href: '#recommendations', accent: 'green' },
  { id: 'tickets', icon: '🎟️', title: 'Best boat & party tickets', label: 'Lock in your plans', href: '#experiences', accent: 'warm' },
  { id: 'map', icon: '📍', title: 'Premium local map', label: 'Every great spot, one tap', href: '#map', accent: 'green' },
]

export function QuickChoice() {
  return (
    <section id="explore" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-section font-bold text-text-primary">What do you need?</h2>
          <p className="text-text-secondary mt-2">Tap to go straight to what matters.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map((tile) => (
            <a
              key={tile.id}
              href={tile.href}
              onClick={() => trackEvent('card_click', { category: 'quick_choice', label: tile.id })}
              className={[
                'group flex flex-col gap-2 p-4 rounded-2xl border transition-all duration-200',
                'card-hover-lift cursor-pointer',
                tile.accent === 'green'
                  ? 'bg-base-card border-accent/20 hover:border-accent/40 hover:shadow-accent-glow'
                  : tile.accent === 'warm'
                  ? 'bg-base-card border-warm/20 hover:border-warm/40 hover:shadow-warm-glow'
                  : 'bg-base-card border-base-border hover:border-base-elevated',
              ].join(' ')}
            >
              <span className="text-2xl">{tile.icon}</span>
              <div>
                <div className={[
                  'font-semibold text-sm leading-tight',
                  tile.accent === 'green' ? 'text-accent' : tile.accent === 'warm' ? 'text-warm' : 'text-text-primary',
                ].join(' ')}>
                  {tile.title}
                </div>
                <div className="text-xs text-text-muted mt-0.5">{tile.label}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
