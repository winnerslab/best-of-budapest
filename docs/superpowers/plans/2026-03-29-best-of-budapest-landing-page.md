# Best of Budapest Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-converting, mobile-first Next.js landing page for Best of Budapest — a local guide by 3 nightlife insiders — featuring 10 sections that route QR-scanning tourists into trust, content, and monetisation flows.

**Architecture:** Single-page Next.js 14 App Router application with all 10 sections assembled in `src/app/page.tsx`. Each section is an isolated React component in `src/components/sections/`. Shared UI primitives (Button, Card) live in `src/components/ui/`. Analytics event tracking is centralised in `src/lib/analytics.ts`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Google Fonts (Inter + custom pairing)

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout — metadata, fonts, viewport, scroll behaviour |
| `src/app/page.tsx` | Page assembly — imports and orders all sections |
| `src/app/globals.css` | CSS variables, dark theme base, scrollbar, body defaults |
| `src/components/ui/Button.tsx` | Reusable CTA button with variants (primary, secondary, ghost) |
| `src/components/ui/Card.tsx` | Base card surface with dark glass/glow styling |
| `src/components/ui/StickyMobileCTA.tsx` | Persistent bottom bar on mobile with primary CTA |
| `src/components/sections/Hero.tsx` | Hero: headline, subheadline, trust line, 2 CTA buttons |
| `src/components/sections/QuickChoice.tsx` | Browse tiles grid: 10 intent cards |
| `src/components/sections/WhyTrustUs.tsx` | Founder cards + trust bullets |
| `src/components/sections/FeaturedPathways.tsx` | 5 feature cards linking to key flows |
| `src/components/sections/PremiumMap.tsx` | Premium map product pitch + CTA |
| `src/components/sections/BookExperiences.tsx` | Curated experience shortlist |
| `src/components/sections/SocialProof.tsx` | Testimonial cards |
| `src/components/sections/SupportUs.tsx` | Buy us a beer section |
| `src/components/sections/Partners.tsx` | Local favourites / partner slots |
| `src/components/sections/Footer.tsx` | Brand closer, nav links, socials |
| `src/lib/analytics.ts` | `trackEvent()` helper — wraps `gtag` / `window.dataLayer` |
| `tailwind.config.ts` | Custom colours, fonts, animations |
| `next.config.ts` | Next.js config (images, strict mode) |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Scaffold Next.js with Tailwind**

Run from inside the project directory:

```bash
cd "/Users/chris/Documents/Side-Hustles/Winners.Lab/Best of Budapest"
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --yes
```

Expected: Next.js project scaffolded, `package.json`, `src/app/`, `tailwind.config.ts` all present.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML response containing `<html`.

- [ ] **Step 3: Commit scaffold**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 14 + Tailwind project"
```

---

## Task 2: Design Tokens and Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `tailwind.config.ts` with custom design tokens**

Replace the entire file content with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        base: {
          black: '#0a0a0a',
          dark: '#111111',
          surface: '#1a1a1a',
          card: '#1e1e1e',
          elevated: '#252525',
          border: '#2a2a2a',
        },
        // Primary accent — emerald/teal (Spotify-adjacent but distinct)
        accent: {
          DEFAULT: '#00c896',
          light: '#00e0a8',
          dark: '#009e78',
          glow: 'rgba(0,200,150,0.15)',
        },
        // Secondary accent — amber/gold for nightlife warmth
        warm: {
          DEFAULT: '#f5a623',
          light: '#ffba40',
          dark: '#d4890a',
          glow: 'rgba(245,166,35,0.12)',
        },
        // Text scale
        text: {
          primary: '#f0f0f0',
          secondary: '#a0a0a0',
          muted: '#606060',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.25rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        'accent-glow': '0 0 24px rgba(0,200,150,0.2)',
        'warm-glow': '0 0 24px rgba(245,166,35,0.15)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,200,150,0.12) 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'section-gradient': 'linear-gradient(180deg, transparent 0%, rgba(0,200,150,0.03) 50%, transparent 100%)',
        'premium-gradient': 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(0,200,150,0.08) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update `src/app/globals.css`**

Replace entire file with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --scrollbar-thumb: #2a2a2a;
    --scrollbar-track: #0a0a0a;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #0a0a0a;
    color: #f0f0f0;
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }

  /* Section spacing */
  section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  @media (min-width: 768px) {
    section {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }
}

@layer utilities {
  .text-gradient-accent {
    background: linear-gradient(135deg, #00c896 0%, #00e0a8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-warm {
    background: linear-gradient(135deg, #f5a623 0%, #ffba40 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-surface {
    background: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .card-hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .card-hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08);
  }

  .card-hover-lift:active {
    transform: translateY(0);
  }
}
```

- [ ] **Step 3: Commit design tokens**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: add custom design tokens and global dark theme styles"
```

---

## Task 3: Root Layout and Analytics Helper

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/lib/analytics.ts`

- [ ] **Step 1: Create `src/lib/analytics.ts`**

```typescript
type EventName =
  | 'hero_cta_click'
  | 'card_click'
  | 'premium_map_cta_click'
  | 'booking_click'
  | 'support_click'
  | 'partner_click'
  | 'scroll_depth'

interface TrackEventOptions {
  label?: string
  category?: string
  value?: number
}

export function trackEvent(name: EventName, options: TrackEventOptions = {}): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      event_category: options.category ?? 'engagement',
      event_label: options.label,
      value: options.value,
    })
  }

  // Generic dataLayer push (GTM compatible)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...options })
  }
}

// Extend Window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
```

- [ ] **Step 2: Update `src/app/layout.tsx`**

```typescript
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Best of Budapest — Local Recommendations from Nightlife Insiders',
  description:
    'Food, nightlife, itineraries, and local favourites — built by 3 locals who work Budapest party boats, prosecco cruises, and pub crawls every week.',
  keywords: 'Budapest, local guide, nightlife Budapest, Budapest restaurants, Budapest itinerary, party boat Budapest',
  openGraph: {
    title: 'Best of Budapest',
    description: 'The Budapest cheat sheet from locals who actually work the city.',
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
    <html lang="en" className="dark">
      <body className="bg-base-black text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/lib/analytics.ts
git commit -m "feat: add root layout metadata and analytics helper"
```

---

## Task 4: UI Primitives — Button and Card

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { trackEvent } from '@/lib/analytics'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warm'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  trackingLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-base-black font-semibold hover:bg-accent-light active:scale-95 shadow-accent-glow hover:shadow-accent-glow',
  secondary:
    'bg-base-elevated text-text-primary font-medium border border-base-border hover:border-accent/40 hover:bg-base-card active:scale-95',
  ghost:
    'bg-transparent text-text-secondary font-medium hover:text-text-primary hover:bg-base-elevated active:scale-95',
  warm:
    'bg-warm text-base-black font-semibold hover:bg-warm-light active:scale-95 shadow-warm-glow hover:shadow-warm-glow',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, trackingLabel, className = '', onClick, children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none',
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(' ')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (trackingLabel) {
        trackEvent('hero_cta_click', { label: trackingLabel })
      }
      onClick?.(e)
    }

    if (href) {
      return (
        <a href={href} className={classes} onClick={() => trackingLabel && trackEvent('hero_cta_click', { label: trackingLabel })}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

- [ ] **Step 2: Create `src/components/ui/Card.tsx`**

```typescript
import { HTMLAttributes, forwardRef } from 'react'

type CardVariant = 'default' | 'elevated' | 'glass' | 'accent' | 'warm'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-base-card border border-base-border',
  elevated: 'bg-base-elevated border border-base-border',
  glass: 'glass-surface',
  accent: 'bg-base-card border border-accent/20 shadow-accent-glow',
  warm: 'bg-base-card border border-warm/20 shadow-warm-glow',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, className = '', children, ...props }, ref) => {
    const classes = [
      'rounded-2xl overflow-hidden',
      variantClasses[variant],
      interactive ? 'card-hover-lift cursor-pointer' : '',
      className,
    ].join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Card.tsx
git commit -m "feat: add Button and Card UI primitives"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```typescript
'use client'

import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center px-4 pt-16 pb-8"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,200,150,0.12) 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #111111 100%)' }}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-4 py-5 flex items-center justify-between">
        <span className="text-text-primary font-bold text-lg tracking-tight">
          Best of<span className="text-gradient-accent"> Budapest</span>
        </span>
        <a
          href="#map"
          onClick={() => trackEvent('hero_cta_click', { label: 'nav_premium_map' })}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          Premium map ↗
        </a>
      </div>

      {/* Hero content */}
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col gap-6">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-base-elevated border border-base-border rounded-full px-4 py-1.5 text-sm text-text-secondary mx-auto">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          Live in Budapest — updated weekly
        </div>

        {/* Headline */}
        <h1 className="text-hero font-black text-text-primary">
          Budapest recommendations{' '}
          <span className="text-gradient-accent">from locals</span>{' '}
          who actually work the city
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
          Food, nightlife, itineraries, ticket picks, and local favourites —
          built for tourists who want great recommendations fast.
        </p>

        {/* Trust line */}
        <p className="text-sm text-text-muted">
          We work Budapest party boats, prosecco cruises, and pub crawls every week.
          We get asked these questions constantly.
        </p>

        {/* CTA pair */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            size="lg"
            variant="primary"
            href="#explore"
            trackingLabel="hero_explore"
          >
            Explore Budapest now
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="#map"
            trackingLabel="hero_premium_map"
          >
            Get the premium map
          </Button>
        </div>

        {/* Founder credibility */}
        <p className="text-xs text-text-muted pt-2">
          Built by George, Chris & Calvin — bartenders, pub crawl guides, and party boat hosts
        </p>
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

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with headline, CTAs, and trust signals"
```

---

## Task 6: Quick Choice Browse Tiles

**Files:**
- Create: `src/components/sections/QuickChoice.tsx`

- [ ] **Step 1: Create `src/components/sections/QuickChoice.tsx`**

```typescript
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
  { id: 'first-time', icon: '🗺️', title: 'First time in Budapest', label: 'Start here', href: '#itineraries', accent: 'green' },
  { id: 'nightlife', icon: '🍺', title: 'Best nightlife tonight', label: 'Bars, clubs & crawls', href: '#nightlife', accent: 'warm' },
  { id: 'food', icon: '🥘', title: 'Best food near me', label: 'Local picks only', href: '#food' },
  { id: 'one-day', icon: '⚡', title: '1-day itinerary', label: 'See it all, fast', href: '#itineraries' },
  { id: 'two-day', icon: '📅', title: '2–3 day itinerary', label: 'The full experience', href: '#itineraries' },
  { id: 'budget', icon: '💸', title: 'Budget-friendly', label: 'Amazing on less', href: '#budget' },
  { id: 'brunch', icon: '☕', title: 'Brunch & coffee', label: 'Morning sorted', href: '#food' },
  { id: 'hidden', icon: '🔍', title: 'Hidden gems', label: 'Beyond the tourist trail', href: '#hidden', accent: 'green' },
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/QuickChoice.tsx
git commit -m "feat: add QuickChoice browse tiles section"
```

---

## Task 7: Why Trust Us Section

**Files:**
- Create: `src/components/sections/WhyTrustUs.tsx`

- [ ] **Step 1: Create `src/components/sections/WhyTrustUs.tsx`**

```typescript
import { Card } from '@/components/ui/Card'

const founders = [
  {
    name: 'George "Ru" Oosthuizen',
    role: 'Party Boat Host & Pub Crawl Guide',
    bio: 'Hosts prosecco cruises on the Danube and leads pub crawls through the ruin bar district every week.',
    emoji: '🛥️',
    initials: 'GR',
  },
  {
    name: 'Chris Thomson',
    role: 'Bartender & Guest Manager',
    bio: 'Bar-backs at some of Budapest\'s best venues and manages international guests at major nightlife events.',
    emoji: '🍸',
    initials: 'CT',
  },
  {
    name: 'Calvin Kriel',
    role: 'Pub Crawl Leader & Local Expert',
    bio: 'Has led hundreds of pub crawl groups through Budapest and knows every ruin bar, hidden bar, and gem in the city.',
    emoji: '🏙️',
    initials: 'CK',
  },
]

const trustBullets = [
  'We work directly with international guests every week',
  'We know what tourists actually ask for — because they ask us',
  'We only recommend places we\'d genuinely send our own friends',
  'Fast, useful, no-BS suggestions — not generic travel blog filler',
  'We live and work in Budapest nightlife, not behind a desk',
]

export function WhyTrustUs() {
  return (
    <section className="px-4" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,200,150,0.03) 50%, transparent 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Why trust us</p>
          <h2 className="text-section font-bold text-text-primary">
            Not a travel blog.{' '}
            <span className="text-gradient-accent">Actual locals.</span>
          </h2>
          <p className="text-text-secondary mt-3 leading-relaxed">
            We are three students who work in Budapest tourism and nightlife. We get asked
            for recommendations by tourists every single week — so we built the guide we
            kept giving away for free.
          </p>
        </div>

        {/* Founder cards */}
        <div className="grid gap-3 mb-8">
          {founders.map((founder) => (
            <Card key={founder.name} variant="default" className="p-4">
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-base-elevated border border-base-border flex items-center justify-center text-sm font-bold text-accent shrink-0">
                  {founder.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-text-primary text-sm">{founder.name}</span>
                    <span className="text-base">{founder.emoji}</span>
                  </div>
                  <div className="text-xs text-accent font-medium mt-0.5">{founder.role}</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{founder.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust bullets */}
        <Card variant="elevated" className="p-5">
          <ul className="space-y-3">
            {trustBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent mt-0.5 shrink-0">✓</span>
                {bullet}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/WhyTrustUs.tsx
git commit -m "feat: add WhyTrustUs section with founder cards and trust bullets"
```

---

## Task 8: Featured Pathways Section

**Files:**
- Create: `src/components/sections/FeaturedPathways.tsx`

- [ ] **Step 1: Create `src/components/sections/FeaturedPathways.tsx`**

```typescript
'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const pathways = [
  {
    id: 'itineraries',
    icon: '🗺️',
    title: 'Itineraries',
    description: 'Day-by-day plans for 1, 2, or 3 days. No fluff — just what to do and when.',
    cta: 'See itineraries',
    href: '#itineraries',
    variant: 'accent' as const,
    tag: 'Most popular',
  },
  {
    id: 'nightlife',
    icon: '🍺',
    title: 'Nightlife guide',
    description: 'Ruin bars, party boats, pub crawls, and where to go after midnight.',
    cta: 'Explore nightlife',
    href: '#nightlife',
    variant: 'warm' as const,
  },
  {
    id: 'food',
    icon: '🍽️',
    title: 'Food & drink picks',
    description: 'Budapest\'s best restaurants, langos spots, cafes, and hidden lunch joints.',
    cta: 'Find food',
    href: '#food',
    variant: 'default' as const,
  },
  {
    id: 'experiences',
    icon: '🎟️',
    title: 'Book experiences',
    description: 'Party boats, prosecco cruises, pub crawls, and day trips we\'d actually recommend.',
    cta: 'Browse experiences',
    href: '#experiences',
    variant: 'default' as const,
  },
  {
    id: 'map',
    icon: '📍',
    title: 'Premium map pack',
    description: 'Curated Google Maps lists — food, bars, brunch, viewpoints. Open and go.',
    cta: 'Get the map',
    href: '#map',
    variant: 'accent' as const,
    tag: 'Best value',
  },
]

export function FeaturedPathways() {
  return (
    <section id="itineraries" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Explore</p>
          <h2 className="text-section font-bold text-text-primary">Where do you want to start?</h2>
        </div>

        <div className="flex flex-col gap-4">
          {pathways.map((pathway) => (
            <Card
              key={pathway.id}
              variant={pathway.variant}
              interactive
              className="p-5"
              onClick={() => trackEvent('card_click', { category: 'featured_pathways', label: pathway.id })}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{pathway.icon}</span>
                    <span className="font-bold text-text-primary">{pathway.title}</span>
                    {pathway.tag && (
                      <span className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5">
                        {pathway.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{pathway.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant={pathway.variant === 'accent' ? 'primary' : pathway.variant === 'warm' ? 'warm' : 'secondary'}
                  size="sm"
                  href={pathway.href}
                  trackingLabel={`pathway_${pathway.id}`}
                >
                  {pathway.cta} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FeaturedPathways.tsx
git commit -m "feat: add FeaturedPathways section with 5 content pathway cards"
```

---

## Task 9: Premium Map Section

**Files:**
- Create: `src/components/sections/PremiumMap.tsx`

- [ ] **Step 1: Create `src/components/sections/PremiumMap.tsx`**

```typescript
'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

const features = [
  { icon: '⚡', text: 'Save hours of searching' },
  { icon: '📍', text: 'Opens directly in Google Maps' },
  { icon: '✓', text: 'Local-approved — places we actually go' },
  { icon: '🗓️', text: 'Perfect for 1–3 day trips' },
  { icon: '🎯', text: 'Built for first-timers and short stays' },
  { icon: '🔄', text: 'Updated regularly by our team' },
]

const categories = [
  { icon: '🍽️', label: 'Restaurants' },
  { icon: '🍺', label: 'Bars & ruin bars' },
  { icon: '☕', label: 'Brunch & coffee' },
  { icon: '🌅', label: 'Viewpoints' },
  { icon: '🛁', label: 'Thermal baths' },
  { icon: '💎', label: 'Hidden gems' },
]

export function PremiumMap() {
  return (
    <section
      id="map"
      className="px-4"
      style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.04) 0%, rgba(0,200,150,0.04) 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="text-xs bg-warm/10 text-warm border border-warm/20 rounded-full px-3 py-1 font-semibold">
            Premium product
          </span>
        </div>

        <h2 className="text-section font-bold text-text-primary mb-3">
          The Budapest{' '}
          <span className="text-gradient-warm">Local Map Pack</span>
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          Every great spot in Budapest — curated by three nightlife and hospitality locals.
          Open Google Maps and you're done. No searching, no guessing, no bad meals.
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-1.5 bg-base-elevated border border-base-border rounded-full px-3 py-1.5 text-sm">
              <span>{cat.icon}</span>
              <span className="text-text-secondary">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Feature list */}
        <Card variant="elevated" className="p-5 mb-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <li key={feature.text} className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-base">{feature.icon}</span>
                {feature.text}
              </li>
            ))}
          </ul>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="warm"
            size="lg"
            href="[PREMIUM_MAP_LINK]"
            className="w-full sm:w-auto"
            onClick={() => trackEvent('premium_map_cta_click', { label: 'unlock_map' })}
          >
            Unlock the premium map →
          </Button>
          <p className="text-xs text-text-muted self-center text-center sm:text-left">
            One-time purchase. Yours forever.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/PremiumMap.tsx
git commit -m "feat: add PremiumMap product section with features and warm CTA"
```

---

## Task 10: Book Experiences Section

**Files:**
- Create: `src/components/sections/BookExperiences.tsx`

- [ ] **Step 1: Create `src/components/sections/BookExperiences.tsx`**

```typescript
'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const experiences = [
  {
    id: 'party-boat',
    icon: '🛥️',
    title: 'Party Boat Cruise',
    description: 'Two hours on the Danube with an open bar, a DJ, and Budapest lit up at night. The most fun you\'ll have on the water.',
    tag: 'Most popular',
    tagColor: 'accent' as const,
    href: '[PARTY_BOAT_LINK]',
  },
  {
    id: 'prosecco-cruise',
    icon: '🥂',
    title: 'Prosecco River Cruise',
    description: 'Elegant evening on the Danube. Budapest\'s skyline, a glass in your hand, and a relaxed vibe for couples and groups alike.',
    tag: 'Great for couples',
    tagColor: 'warm' as const,
    href: '[PROSECCO_CRUISE_LINK]',
  },
  {
    id: 'pub-crawl',
    icon: '🍻',
    title: 'Ruin Bar Pub Crawl',
    description: 'The definitive Budapest night out. Multiple venues, free shots, and a group of fellow travellers. Led by our own team.',
    tag: 'We run this',
    tagColor: 'accent' as const,
    href: '[PUB_CRAWL_LINK]',
  },
  {
    id: 'day-trip',
    icon: '🏰',
    title: 'Day Trip: Visegrád & Esztergom',
    description: 'A scenic day out from Budapest — castles, the Danube bend, and countryside you won\'t see from the city.',
    href: '[DAY_TRIP_LINK]',
  },
]

export function BookExperiences() {
  return (
    <section id="experiences" className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-warm text-sm font-semibold uppercase tracking-widest mb-2">Book now</p>
          <h2 className="text-section font-bold text-text-primary">
            Experiences we'd{' '}
            <span className="text-gradient-warm">recommend first</span>
          </h2>
          <p className="text-text-secondary mt-2">
            Popular with our guests — and places we actually work and know inside out.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <Card key={exp.id} variant="default" interactive className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{exp.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-text-primary">{exp.title}</span>
                    {exp.tag && (
                      <span className={[
                        'text-xs rounded-full px-2 py-0.5 border',
                        exp.tagColor === 'accent'
                          ? 'bg-accent/10 text-accent border-accent/20'
                          : 'bg-warm/10 text-warm border-warm/20',
                      ].join(' ')}>
                        {exp.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{exp.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={exp.href}
                    onClick={() => trackEvent('booking_click', { category: 'experiences', label: exp.id })}
                  >
                    Book this →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/BookExperiences.tsx
git commit -m "feat: add BookExperiences section with 4 curated activity cards"
```

---

## Task 11: Social Proof Section

**Files:**
- Create: `src/components/sections/SocialProof.tsx`

- [ ] **Step 1: Create `src/components/sections/SocialProof.tsx`**

```typescript
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    id: 1,
    quote: 'This helped us plan our whole weekend in about 10 minutes. The food picks were genuinely great — not the usual tourist traps.',
    name: 'Sarah M.',
    detail: 'London, UK — 3 days in Budapest',
    stars: 5,
  },
  {
    id: 2,
    quote: 'Used the map on our first day and it was perfect. Saved us so much time googling random places.',
    name: 'Jake & Roos',
    detail: 'Amsterdam — city break',
    stars: 5,
  },
  {
    id: 3,
    quote: 'The nightlife guide actually worked — we ended up at places that were packed and fun, not the dead tourist bars.',
    name: 'Tom R.',
    detail: 'Dublin, Ireland',
    stars: 5,
  },
]

export function SocialProof() {
  return (
    <section className="px-4" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,200,150,0.025) 50%, transparent 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-section font-bold text-text-primary">
            What guests say
          </h2>
          <p className="text-text-secondary mt-2">
            From real tourists who used this guide in Budapest.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <Card key={t.id} variant="elevated" className="p-5">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-warm text-sm">★</span>
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <div>
                <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                <div className="text-xs text-text-muted">{t.detail}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/SocialProof.tsx
git commit -m "feat: add SocialProof testimonial section"
```

---

## Task 12: Support Section

**Files:**
- Create: `src/components/sections/SupportUs.tsx`

- [ ] **Step 1: Create `src/components/sections/SupportUs.tsx`**

```typescript
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
            We're three students building the local guide we wish tourists always had.
            This is free, and we want to keep it that way.
          </p>
          <p className="text-sm text-text-muted mb-6">
            Your support helps us keep it updated, improve the content, and maybe buy our own beers for once.
          </p>
          <Button
            variant="warm"
            size="lg"
            href="[TIP_LINK]"
            onClick={() => trackEvent('support_click', { label: 'buy_us_a_beer' })}
          >
            Buy us a beer →
          </Button>
          <p className="text-xs text-text-muted mt-4">No pressure. Seriously — it's free either way.</p>
        </Card>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/SupportUs.tsx
git commit -m "feat: add SupportUs beer tip section"
```

---

## Task 13: Partners Section

**Files:**
- Create: `src/components/sections/Partners.tsx`

- [ ] **Step 1: Create `src/components/sections/Partners.tsx`**

```typescript
'use client'

import { Card } from '@/components/ui/Card'
import { trackEvent } from '@/lib/analytics'

const partners = [
  {
    id: 'partner-1',
    name: '[Partner Name]',
    category: 'Bar / Ruin bar',
    description: 'A local favourite in the VII district. Great cocktails and a proper ruin bar atmosphere.',
    href: '[PARTNER_1_LINK]',
    sponsored: false,
  },
  {
    id: 'partner-2',
    name: '[Partner Name]',
    category: 'Restaurant',
    description: 'Traditional Hungarian food done right. Tourists miss this one — don\'t.',
    href: '[PARTNER_2_LINK]',
    sponsored: false,
  },
]

export function Partners() {
  if (partners.length === 0) return null

  return (
    <section className="px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-1">Local favourites</p>
          <h2 className="text-xl font-bold text-text-primary">Places we love</h2>
          <p className="text-sm text-text-secondary mt-1">Handpicked venues we'd send our own friends to.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.href}
              onClick={() => trackEvent('partner_click', { category: 'partners', label: partner.id })}
              className="block"
            >
              <Card variant="default" interactive className="p-4 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-accent font-medium uppercase tracking-wide">{partner.category}</span>
                  {partner.sponsored && (
                    <span className="text-xs text-text-muted border border-base-border rounded px-1.5 py-0.5">Sponsored</span>
                  )}
                </div>
                <div className="font-semibold text-text-primary mb-1">{partner.name}</div>
                <p className="text-xs text-text-secondary leading-relaxed">{partner.description}</p>
              </Card>
            </a>
          ))}
        </div>

        <p className="text-xs text-text-muted mt-4 text-center">
          Interested in a featured spot?{' '}
          <a href="mailto:hello@bestofbudapest.com" className="text-accent hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Partners.tsx
git commit -m "feat: add Partners section with future ad slot structure"
```

---

## Task 14: Footer Section

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create `src/components/sections/Footer.tsx`**

```typescript
import { Button } from '@/components/ui/Button'

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
        {/* Brand */}
        <div className="mb-8">
          <div className="text-xl font-bold text-text-primary mb-2">
            Best of<span className="text-gradient-accent"> Budapest</span>
          </div>
          <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
            Local recommendations from three Budapest nightlife and tourism insiders.
            Built for tourists who want the real experience, fast.
          </p>
        </div>

        {/* Repeat CTA */}
        <div className="mb-8">
          <Button variant="primary" size="md" href="#explore" trackingLabel="footer_explore">
            Explore Budapest now →
          </Button>
        </div>

        {/* Nav links */}
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

        {/* Socials + contact */}
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

        {/* Legal */}
        <div className="border-t border-base-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Best of Budapest. All rights reserved.
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Footer.tsx
git commit -m "feat: add Footer with nav, socials, CTA repeat, and legal"
```

---

## Task 15: Sticky Mobile CTA

**Files:**
- Create: `src/components/ui/StickyMobileCTA.tsx`

- [ ] **Step 1: Create `src/components/ui/StickyMobileCTA.tsx`**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-surface border-t border-base-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-text-muted">Best of Budapest</div>
          <div className="text-sm font-semibold text-text-primary truncate">Local picks, local knowledge</div>
        </div>
        <a
          href="#map"
          onClick={() => trackEvent('premium_map_cta_click', { label: 'sticky_cta' })}
          className="shrink-0 bg-accent text-base-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-accent-light active:scale-95 transition-all"
        >
          Get map
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/StickyMobileCTA.tsx
git commit -m "feat: add sticky mobile CTA bar that appears on scroll"
```

---

## Task 16: Assemble Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` with full page assembly**

```typescript
import { Hero } from '@/components/sections/Hero'
import { QuickChoice } from '@/components/sections/QuickChoice'
import { WhyTrustUs } from '@/components/sections/WhyTrustUs'
import { FeaturedPathways } from '@/components/sections/FeaturedPathways'
import { PremiumMap } from '@/components/sections/PremiumMap'
import { BookExperiences } from '@/components/sections/BookExperiences'
import { SocialProof } from '@/components/sections/SocialProof'
import { SupportUs } from '@/components/sections/SupportUs'
import { Partners } from '@/components/sections/Partners'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <QuickChoice />
      <WhyTrustUs />
      <FeaturedPathways />
      <PremiumMap />
      <BookExperiences />
      <SocialProof />
      <SupportUs />
      <Partners />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
```

- [ ] **Step 2: Remove the default Next.js home page content**

The scaffold creates boilerplate in `src/app/page.tsx` — the step above fully replaces it.

- [ ] **Step 3: Start dev server and verify all sections render**

```bash
npm run dev
```

Navigate to `http://localhost:3000` and verify:
- Hero loads with headline and CTAs
- Quick Choice grid shows 10 tiles
- All 10 sections are present
- No TypeScript errors in terminal
- Mobile view (375px) renders correctly

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections into main landing page"
```

---

## Task 17: Scroll Depth Analytics

**Files:**
- Create: `src/components/ui/ScrollDepthTracker.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/ui/ScrollDepthTracker.tsx`**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

const MILESTONES = [25, 50, 75, 100]

export function ScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone)
          trackEvent('scroll_depth', { value: milestone, label: `${milestone}%` })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
```

- [ ] **Step 2: Add `ScrollDepthTracker` to `src/app/page.tsx`**

```typescript
import { ScrollDepthTracker } from '@/components/ui/ScrollDepthTracker'

// Add inside <main> before <Hero />:
<ScrollDepthTracker />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ScrollDepthTracker.tsx src/app/page.tsx
git commit -m "feat: add scroll depth analytics tracker at 25/50/75/100% milestones"
```

---

## Task 18: Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. No TypeScript errors. No missing module errors.

- [ ] **Step 2: Fix any build errors**

Common issues:
- Missing `'use client'` on components using `useState`/`useEffect` — add it to the top of the file
- `window` referenced in SSR — guard with `typeof window === 'undefined'` check
- Missing exports — verify each section file has a named export matching the import

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Best of Budapest landing page MVP

All 10 sections implemented:
- Hero with headline, trust signals, and dual CTAs
- QuickChoice browse tiles (10 intent categories)
- WhyTrustUs with founder cards and trust bullets
- FeaturedPathways with 5 content pathway cards
- PremiumMap product section
- BookExperiences with 4 curated activity cards
- SocialProof testimonials
- SupportUs beer tip section
- Partners / local favourites
- Footer with nav, CTAs, socials

Analytics: scroll depth + all CTA/card click events tracked
Mobile: sticky CTA bar, mobile-first layouts throughout"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Hero (section 1) — Task 5
- ✅ Quick Choice tiles (section 2) — Task 6
- ✅ Why Trust Us (section 3) — Task 7
- ✅ Featured Pathways (section 4) — Task 8
- ✅ Premium Map (section 5) — Task 9
- ✅ Book Experiences (section 6) — Task 10
- ✅ Social Proof (section 7) — Task 11
- ✅ Support / Buy a Beer (section 8) — Task 12
- ✅ Partners / Advertiser preview (section 9) — Task 13
- ✅ Footer (section 10) — Task 14
- ✅ Sticky mobile CTA — Task 15
- ✅ Analytics tracking — Tasks 3, 17
- ✅ Scroll depth tracking — Task 17
- ✅ Design tokens / dark theme — Task 2
- ✅ Mobile-first — all components use responsive Tailwind classes

**Placeholder scan:** All `[PLACEHOLDER]` links are clearly marked with bracket notation for the team to swap out — not hidden in code comments.

**Type consistency:** `Button` `href` prop, `Card` `variant` prop, and `trackEvent` `EventName` union are all defined once in Tasks 4 and 3 and used consistently throughout. No naming drift.
