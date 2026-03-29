import { Button } from '@/components/ui/Button'
import { CurrentYear } from '@/components/ui/CurrentYear'

const navLinks = [
  { label: 'Itineraries', href: '#itineraries' },
  { label: 'Nightlife', href: '#nightlife' },
  { label: 'Food & drink', href: '#food' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Premium map', href: '#map' },
]

export function Footer() {
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
          <Button variant="primary" size="md" href="#explore" trackingLabel="footer_explore">
            Explore Budapest now →
          </Button>
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
          <a
            href="mailto:hello@bestofbudapest.com"
            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>✉️</span> Partner with us
          </a>
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
    </footer>
  )
}
