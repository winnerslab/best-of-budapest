import { Card } from '@/components/ui/Card'

const platforms = [
  {
    label: 'TripAdvisor',
    icon: '🦉',
    href: 'https://www.tripadvisor.com/UserReviewEdit-g274887-d26585020-Budapest_Sip_and_Sail_Danube_Cruise_with_Unlimited_Prosecco-Budapest_Central_Hungary.html',
  },
  {
    label: 'GetYourGuide',
    icon: '🎟️',
    href: 'https://gyg.me/LwhyxzBz',
  },
  {
    label: 'Viator',
    icon: '🗺️',
    href: 'https://www.viator.com/tours/Budapest/Budapest-Sunset-Danube-Cruise-with-Unlimited-Prosecco/d499-69242P4?medium=social-share-copy',
  },
  {
    label: 'Google',
    icon: '🔍',
    href: 'https://www.google.com/search?sca_esv=842869c4d90cbdd0&biw=1920&bih=981&sxsrf=ANbL-n7KegdrZo0zhh1BTDPopR22kbrBPA:1775227426796&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qORgYadZT7nz8emb0k-Dq_W-hBtOISF54zbICKDZPh3c632oMXZQFitHtyDMCjtfpMeRy2_zbrBRFvw0gq3LwwJHzEYxDHUsAa4le80UiHBzMTCnRJQ%3D%3D&q=Sip+%26+Sail:+The+Prosecco+Cruise+Reviews&sa=X&ved=2ahUKEwi5u63B9dGTAxV4Q_EDHf4LE-UQ0bkNegQIJhAH',
  },
]

export function LeaveAReview() {
  return (
    <section className="px-4" style={{ background: 'var(--gradient-section)' }}>
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="p-8 text-center">
          <div className="text-4xl mb-4">⭐</div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Had a good time?{' '}
            <span className="text-gradient-warm">Tell the internet.</span>
          </h2>

          <p className="text-text-secondary leading-relaxed mb-2 max-w-md mx-auto">
            Every review that mentions <strong className="text-text-primary">Ru, Chris, or Calvin</strong> by name earns us a €5 tip from the company. That&apos;s beer money. That&apos;s motivation. That&apos;s the entire economy of this operation.
          </p>

          <p className="text-sm text-text-muted mb-6 max-w-sm mx-auto">
            Takes 2 minutes. Costs you nothing. Makes us unreasonably happy. 🥲
          </p>

          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Use the platform you booked through
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {platforms.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-base-border bg-base-elevated text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-muted active:scale-95 transition-all duration-200"
              >
                <span>{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-text-muted italic">
            (Remember to sign in first — anonymous reviews don&apos;t count and we will be sad 🥲)
          </p>
        </Card>
      </div>
    </section>
  )
}
