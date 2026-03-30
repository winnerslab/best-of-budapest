# Hero Mobile Design Spec
**Date:** 2026-03-30
**Scope:** `src/components/sections/Hero.tsx` only
**Trigger:** Hero section was oversized on mobile — title too large, buttons too tall, top bar cluttering the viewport

---

## Problem
On iPhone (390px viewport), the hero section had:
- `text-hero` (clamp min 36px) rendering too large for mobile
- `size="lg"` buttons (`py-4 text-lg`) stacked full-width — very tall
- `pt-[20vh]` pushing content down, hiding the castle background
- A top bar (logo + "Premium map ↗" link) adding visual noise at the top

## Design Decisions

### 1. Remove the top bar
The `<div>` containing "Best of Budapest" branding and "Premium map ↗" link is removed entirely. It clutters the hero on mobile and the nav link is redundant.

### 2. Reduce top padding on mobile
`pt-[20vh]` → `pt-[10vh]` so the castle/water in the background image is visible on first load without scrolling.

### 3. Tighten element gaps
`gap-6` → `gap-3` on the hero content flex container — brings badge, title, subtitle and buttons closer together.

### 4. Smaller headline on mobile
`text-hero` → `text-[1.5rem] sm:text-hero`
- Mobile: 24px (1.5rem)
- Tablet+: original clamp(2.25rem, 6vw, 4rem)

### 5. Smaller subtitle on mobile
`text-lg` → `text-sm sm:text-lg`
- Mobile: 14px
- Tablet+: 18px

### 6. Side-by-side thin buttons
- Layout: `flex-col sm:flex-row` → `flex-row` (always side-by-side)
- Size: `size="lg"` → `size="sm"` on both buttons (`px-4 py-2 text-sm`)
- Primary button text: "Take me to The List" → "Get the list 📍"

## Files Changed
- `src/components/sections/Hero.tsx`

## Unchanged
- All other sections
- Desktop appearance (sm: breakpoints restore original sizing above 640px)
- Button text for "Buy me a beer 🍺"
- Badge, scroll indicator, background image
