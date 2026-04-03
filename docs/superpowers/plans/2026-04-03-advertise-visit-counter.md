# Advertise With Us + Flip Visit Counter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Vercel KV-backed monthly page view counter and an "Advertise With Us" section (between Partners and Footer) that displays the counter as an animated flip/odometer-style component.

**Architecture:** A `PageViewTracker` client component fires `POST /api/pageview` on every page load to increment a monthly KV key. The `AdvertiseWithUs` server component reads the count directly from KV at render time and passes it to the `FlipCounter` client component, which animates from 0 to the target on mount.

**Tech Stack:** Next.js 16.2.1 App Router, `@vercel/kv`, React 19, Tailwind v4, TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/app/api/pageview/route.ts` | POST — increment monthly KV counter |
| Create | `src/app/api/visits/route.ts` | GET — read current month count (utility/future use) |
| Create | `src/components/ui/PageViewTracker.tsx` | Client component — fires POST on mount, renders nothing |
| Create | `src/components/ui/FlipCounter.tsx` | Client component — animated odometer digit display |
| Create | `src/components/sections/AdvertiseWithUs.tsx` | Server component — reads KV directly, renders full section |
| Modify | `src/app/layout.tsx` | Add `<PageViewTracker />` inside `<body>` |
| Modify | `src/app/page.tsx` | Add `<AdvertiseWithUs />` between `<Partners />` and `<Footer />` |

---

## Task 1: Install @vercel/kv and configure environment

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local` (local dev credentials)

- [ ] **Step 1: Install the package**

```bash
npm install @vercel/kv
```

Expected output: `added 1 package` (or similar), no errors.

- [ ] **Step 2: Link your Vercel KV store**

In the Vercel dashboard:
1. Go to your project → **Storage** tab
2. Click **Create Database** → **KV (Redis)**
3. Name it (e.g. `best-of-budapest-kv`) → Create
4. It auto-links to your project and adds env vars

Then pull the env vars to local:

```bash
npx vercel env pull .env.local
```

This creates `.env.local` with `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`.

- [ ] **Step 3: Verify .env.local has the KV keys**

```bash
grep KV .env.local
```

Expected: 4 lines starting with `KV_`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install @vercel/kv"
```

---

## Task 2: Create POST /api/pageview route

**Files:**
- Create: `src/app/api/pageview/route.ts`

- [ ] **Step 1: Create the route file**

```ts
// src/app/api/pageview/route.ts
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST() {
  const key = `pageviews:${new Date().toISOString().slice(0, 7)}` // e.g. "pageviews:2026-04"
  await kv.incr(key)
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Start dev server and verify the route works**

```bash
npm run dev
```

In a separate terminal:

```bash
curl -X POST http://localhost:3000/api/pageview
```

Expected: `{"ok":true}`

- [ ] **Step 3: Call it a second time and verify the count incremented**

```bash
curl -X POST http://localhost:3000/api/pageview
curl http://localhost:3000/api/visits  # (we'll create this next — skip for now)
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/pageview/route.ts
git commit -m "feat: add POST /api/pageview route"
```

---

## Task 3: Create GET /api/visits route

**Files:**
- Create: `src/app/api/visits/route.ts`

- [ ] **Step 1: Create the route file**

```ts
// src/app/api/visits/route.ts
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
  const count = (await kv.get<number>(key)) ?? 0
  return NextResponse.json({ count })
}
```

- [ ] **Step 2: Verify both routes work together**

```bash
curl -X POST http://localhost:3000/api/pageview
curl -X POST http://localhost:3000/api/pageview
curl http://localhost:3000/api/visits
```

Expected: `{"count":2}` (or higher if you called POST earlier)

- [ ] **Step 3: Commit**

```bash
git add src/app/api/visits/route.ts
git commit -m "feat: add GET /api/visits route"
```

---

## Task 4: Create PageViewTracker client component

**Files:**
- Create: `src/components/ui/PageViewTracker.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/ui/PageViewTracker.tsx
'use client'

import { useEffect } from 'react'

export function PageViewTracker() {
  useEffect(() => {
    fetch('/api/pageview', { method: 'POST' })
  }, [])

  return null
}
```

- [ ] **Step 2: Add it to the root layout**

Open `src/app/layout.tsx`. Add the import and render it inside `<body>`:

```tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PageViewTracker } from '@/components/ui/PageViewTracker'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Best of Budapest — Local Recommendations from Nightlife Insiders',
  description:
    'Food, nightlife, itineraries, and local favourites — built by 3 locals who work Budapest party boats, prosecco cruises, and pub crawls every week.',
  keywords: 'Budapest, local guide, nightlife Budapest, Budapest restaurants, Budapest itinerary, party boat Budapest',
  openGraph: {
    title: 'Best of Budapest',
    description: 'The Best Budapest Itinerary',
    siteName: 'Best of Budapest',
    locale: 'en_GB',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-base-black text-text-primary antialiased">
        <PageViewTracker />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify tracking fires**

Load `http://localhost:3000` in the browser. Then:

```bash
curl http://localhost:3000/api/visits
```

Expected: count has incremented by 1 vs before.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/PageViewTracker.tsx src/app/layout.tsx
git commit -m "feat: add PageViewTracker to root layout"
```

---

## Task 5: Create FlipCounter component

**Files:**
- Create: `src/components/ui/FlipCounter.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/ui/FlipCounter.tsx
'use client'

import { useEffect, useState } from 'react'

function DigitTile({ digit }: { digit: string }) {
  const [displayed, setDisplayed] = useState(digit)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (digit === displayed) return
    setFlipping(true)
    const t = setTimeout(() => {
      setDisplayed(digit)
      setFlipping(false)
    }, 80)
    return () => clearTimeout(t)
  }, [digit, displayed])

  return (
    <div
      className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-black text-white select-none"
      style={{
        background: 'linear-gradient(180deg, #1e1e1e 0%, #0f0f0f 50%, #181818 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.7)',
        transform: flipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
        transition: flipping ? 'transform 0.08s ease-in' : 'transform 0.08s ease-out',
        perspective: '200px',
      }}
    >
      {flipping ? displayed : digit}
    </div>
  )
}

export function FlipCounter({ count }: { count: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (count === 0) return
    const steps = Math.min(count, 80)
    const increment = count / steps
    const intervalMs = 1800 / steps

    let running = 0
    const timer = setInterval(() => {
      running = Math.min(running + increment, count)
      setCurrent(Math.round(running))
      if (running >= count) clearInterval(timer)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [count])

  const padLength = Math.max(String(count).length, 4)
  const digits = String(current).padStart(padLength, '0').split('')

  return (
    <div className="flex gap-1.5 items-center" style={{ perspective: '600px' }}>
      {digits.map((digit, i) => (
        <DigitTile key={i} digit={digit} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders correctly**

Temporarily add `<FlipCounter count={1247} />` somewhere visible in `page.tsx`, load the browser, confirm digits animate from 0000 up to 1247 with a flip effect on each digit change. Remove the test render after confirming.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/FlipCounter.tsx
git commit -m "feat: add FlipCounter animated digit component"
```

---

## Task 6: Create AdvertiseWithUs section

**Files:**
- Create: `src/components/sections/AdvertiseWithUs.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/sections/AdvertiseWithUs.tsx
import { kv } from '@vercel/kv'
import { FlipCounter } from '@/components/ui/FlipCounter'

async function getMonthlyViews(): Promise<number> {
  const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
  return (await kv.get<number>(key)) ?? 0
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
          aren't browsing for fun. They're choosing where to eat, drink, and spend their
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
```

- [ ] **Step 2: Add the section to page.tsx**

Open `src/app/page.tsx`. Add the import and insert `<AdvertiseWithUs />` between `<Partners />` and `<Footer />`:

```tsx
import { Hero } from '@/components/sections/Hero'
import { QuickChoice } from '@/components/sections/QuickChoice'
import { WhyTrustUs } from '@/components/sections/WhyTrustUs'
import { FeaturedPathways } from '@/components/sections/FeaturedPathways'
import { RecommendationsList } from '@/components/sections/RecommendationsList'
import { Recommendations } from '@/components/sections/Recommendations'
import { PremiumMap } from '@/components/sections/PremiumMap'
import { BookExperiences } from '@/components/sections/BookExperiences'
import { SocialProof } from '@/components/sections/SocialProof'
import { SupportUs } from '@/components/sections/SupportUs'
import { Partners } from '@/components/sections/Partners'
import { AdvertiseWithUs } from '@/components/sections/AdvertiseWithUs'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { ScrollDepthTracker } from '@/components/ui/ScrollDepthTracker'
import { ReviewPopup } from '@/components/ui/ReviewPopup'

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollDepthTracker />
      <Hero />
      <RecommendationsList />
      <QuickChoice />
      <WhyTrustUs />
      <FeaturedPathways />
      <Recommendations />
      <PremiumMap />
      <BookExperiences />
      <SocialProof />
      <SupportUs />
      <Partners />
      <AdvertiseWithUs />
      <Footer />
      <StickyMobileCTA />
      <ReviewPopup />
    </main>
  )
}
```

- [ ] **Step 3: Verify the full page renders**

Load `http://localhost:3000` and scroll to the bottom. Confirm:
- The "Advertise with us" section appears between Partners and Footer
- The flip counter animates up to the current month's count on page load
- The "Get in touch →" button opens a mailto link to `chris@laminarsolutions.co.za`

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/AdvertiseWithUs.tsx src/app/page.tsx
git commit -m "feat: add AdvertiseWithUs section with flip visit counter"
```

---

## Task 7: Verify production build and deploy

- [ ] **Step 1: Run a production build locally**

```bash
npm run build
```

Expected: no TypeScript errors, no build failures.

- [ ] **Step 2: Deploy to Vercel**

```bash
git push origin main
```

Vercel auto-deploys on push. Confirm in the Vercel dashboard that the build succeeds and the KV env vars are present.

- [ ] **Step 3: Smoke test on production**

Visit the live URL, scroll to the Advertise section, confirm the counter loads and animates. Hit it a few times and refresh — confirm the count increments.
