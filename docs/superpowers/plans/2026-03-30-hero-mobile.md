# Hero Mobile Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the hero section on mobile — remove the top bar, tighten spacing, scale down the headline and subtitle, replace the stacked large buttons with side-by-side slim buttons, and update the primary CTA copy.

**Architecture:** All changes are confined to `src/components/sections/Hero.tsx`. Mobile-specific sizing uses Tailwind responsive prefixes (`sm:`) so desktop appearance is unchanged above 640px.

**Tech Stack:** Next.js 16, Tailwind v4 (CSS-first, no `tailwind.config.ts`), React

---

### Task 1: Make all hero mobile changes

**Files:**
- Modify: `src/components/sections/Hero.tsx`

This is a purely visual change. No unit tests apply — verify by running the dev server and checking on a narrow viewport (375–390px wide).

- [ ] **Step 1: Read the current file**

Open `src/components/sections/Hero.tsx` and confirm the structure matches what's expected before editing.

- [ ] **Step 2: Apply all changes**

Replace the entire file content with the following:

```tsx
'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-start px-4 pt-[10vh] pb-8 overflow-hidden">
      <Image
        src="/images/hero-bg-3.jpg"
        alt="Budapest Hero Background"
        fill
        className="object-cover object-bottom -z-20"
        priority
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero content */}
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col gap-3">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-base-elevated border border-base-border rounded-full px-4 py-1.5 text-sm text-text-secondary mx-auto">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          Budapest Top Picks - updated weekly
        </div>

        {/* Headline */}
        <h1 className="text-[1.5rem] sm:text-hero font-black text-text-primary">
          The Best{' '}
          <span className="text-gradient-accent">Budapest Itinerary</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
          Food, nightlife, itineraries, ticket picks, and local favourites —
          built for tourists who want great recommendations fast.
        </p>

        {/* CTA pair */}
        <div className="flex flex-row gap-3 justify-center pt-2">
          <Button
            size="sm"
            variant="primary"
            href="#explore"
            trackingLabel="hero_explore"
          >
            Get the list 📍
          </Button>
          <Button
            size="sm"
            variant="secondary"
            href="#map"
            trackingLabel="hero_premium_map"
          >
            Buy me a beer 🍺
          </Button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border border-base-border rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify visually**

Run the dev server if not already running:
```bash
npm run dev
```

Open `http://localhost:3000` and use browser DevTools to set the viewport to **390 × 844** (iPhone 14 Pro).

Check:
- [ ] No "Best of Budapest" / "Premium map ↗" bar at the top
- [ ] Headline is noticeably smaller than before (~24px)
- [ ] Subtitle is smaller (~14px)
- [ ] Two buttons sit side-by-side on one row
- [ ] Primary button reads "Get the list 📍"
- [ ] Castle/water background visible below the buttons without scrolling
- [ ] Switch to a desktop viewport (1280px wide) — buttons, headline and subtitle should look the same as before (larger sizes via `sm:` classes)

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "Fix hero section for mobile: smaller type, side-by-side buttons, remove top bar"
```
