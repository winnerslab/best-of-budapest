'use client'

interface ComingSoonPopupProps {
  onClose: () => void
}

export function ComingSoonPopup({ onClose }: ComingSoonPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm glass-surface rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-warm/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors text-lg leading-none p-1"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="text-4xl mb-3 text-center">🚧</div>

        {/* Title */}
        <h3 className="text-warm font-bold text-xl text-center mb-2">
          Coming soon... we think
        </h3>

        {/* Message */}
        <div className="text-text-secondary text-sm text-center leading-relaxed mb-5 space-y-2">
          <p>
            The map is still being curated by three guys who are technically supposed to be working right now.
          </p>
          <p className="text-xs text-text-muted italic">
            In the meantime, feel free to do something truly meaningful with your time:
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href="https://buymeacoffee.com/ctchristhomson"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full text-center bg-warm text-base-black font-semibold text-sm py-3 rounded-xl hover:bg-warm-light active:scale-95 transition-all duration-200 shadow-warm-glow"
          >
            Buy us a beer! 🍺
          </a>
          <a
            href="https://www.tripadvisor.com/UserReviewEdit-g274887-d26585020-Budapest_Sip_and_Sail_Danube_Cruise_with_Unlimited_Prosecco-Budapest_Central_Hungary.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full text-center border border-base-border text-text-secondary font-semibold text-sm py-3 rounded-xl hover:text-text-primary hover:border-text-muted active:scale-95 transition-all duration-200"
          >
            Leave a review ⭐
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className="block w-full text-center text-xs text-text-muted hover:text-text-secondary transition-colors mt-3"
        >
          I'll just stare at the button instead
        </button>
      </div>
    </div>
  )
}
