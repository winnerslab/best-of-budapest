'use client'

import { useState } from 'react'
import { CurrentYear } from '@/components/ui/CurrentYear'
import { AdvertiseWithUs } from '@/components/sections/AdvertiseWithUs'

const navLinks = [
  { label: 'Itineraries', href: '#itineraries' },
  { label: 'Nightlife', href: '#nightlife' },
  { label: 'Food & drink', href: '#food' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Premium map', href: '#map' },
]

export function Footer() {
  const [advertiseOpen, setAdvertiseOpen] = useState(false)

  return (
    <footer className="px-4 pt-16 pb-8 border-t border-base-border mt-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-xl font-bold text-text-primary mb-2">
            Best of<span className="text-gradient-accent"> Budapest</span>
          </div>
          <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
            Local recommendations from three Budapest nightlife and tourism insiders.
            Built for tourists who want the real experience, fast.
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setAdvertiseOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 active:scale-95 hover:brightness-110"
            style={{ background: 'var(--color-warm)', color: '#0a0a0a' }}
          >
            Advertise with us →
          </button>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href="[INSTAGRAM_LINK]"
            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>📸</span> Instagram
          </a>
          <button
            onClick={() => setAdvertiseOpen(true)}
            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>✉️</span> Partner with us
          </button>
        </div>

        <div className="border-t border-base-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-text-muted">
            © <CurrentYear /> Best of Budapest. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Privacy</a>
            <a href="/terms" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Terms</a>
          </div>
        </div>
      </div>

      <AdvertiseWithUs isOpen={advertiseOpen} onClose={() => setAdvertiseOpen(false)} />
    </footer>
  )
}
