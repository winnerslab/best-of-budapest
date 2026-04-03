# Advertise With Us + Visit Counter — Design Spec

**Date:** 2026-04-03  
**Status:** Approved

---

## Overview

Add a new `AdvertiseWithUs` section between the `Partners` section and `Footer` on the landing page. The section pitches advertising opportunities to Budapest businesses, anchored by a live monthly page view counter displayed as an animated flip/odometer-style counter.

---

## Data Layer

### Vercel KV setup
- Install `@vercel/kv` package
- Add `KV_URL` and `KV_REST_API_TOKEN` environment variables via Vercel dashboard (auto-populated when KV store is linked to the project)

### API Routes

**`POST /api/pageview`**
- Triggered from the root layout (`src/app/layout.tsx`) on every page load via a client component
- Increments a Vercel KV key: `pageviews:YYYY-MM` (e.g. `pageviews:2026-04`)
- One key per calendar month — monthly reset is automatic
- Returns `{ ok: true }`

**`GET /api/visits`**
- Reads the current month's KV key (`pageviews:YYYY-MM`)
- Returns `{ count: number }` (defaults to 0 if key doesn't exist yet)
- Called server-side from `page.tsx` so the count is rendered into the HTML — no client-side fetch required for the initial render

---

## FlipCounter Component

**File:** `src/components/ui/FlipCounter.tsx`  
**Type:** Client component (`'use client'`)

- Receives `count: number` as a prop
- Splits the number into individual digits
- Renders each digit as a dark rounded tile ("drum")
- On mount, each digit animates from 0 to its target value using CSS `transform` + `transition` (flip/roll effect)
- Digits animate with a slight left-to-right stagger for a mechanical odometer feel
- No external animation library — pure CSS keyframes + `useEffect`

---

## AdvertiseWithUs Section

**File:** `src/components/sections/AdvertiseWithUs.tsx`  
**Type:** Server component

### Layout (top to bottom)
1. **Eyebrow** — `ADVERTISE WITH US` (small caps, accent colour)
2. **Headline** — "Reach tourists who are actively planning their Budapest trip"
3. **Subheadline** — "Our readers are in trip-planning mode — not browsing. They click."
4. **Body copy** — Short pitch covering: featured placement, direct tourist audience, local credibility, weekly updates
5. **Flip counter** — Centrepiece visual, labelled "Page views this month", receives count from server-side fetch
6. **CTA** — "Get in touch →" as a `mailto:chris@laminarsolutions.co.za` link, styled as a button

### Styling
- Dark background consistent with the rest of the site
- Counter is the visual anchor — large, prominent
- Inserted between `Partners` and `Footer` in `src/app/page.tsx`

---

## Page Tracking

**File:** `src/components/ui/PageViewTracker.tsx`  
**Type:** Client component (`'use client'`)

- Calls `POST /api/pageview` once on mount via `useEffect`
- Rendered inside the root layout so it fires on every page load
- Silent — no UI output

---

## Data Flow

```
Page load
  → PageViewTracker mounts → POST /api/pageview → KV increment
  → page.tsx server render → GET /api/visits → count prop → FlipCounter → flip animation on mount
```

---

## Out of Scope
- Per-page breakdown
- Unique visitor tracking
- Historical charts
- Real-time polling or Server-Sent Events
