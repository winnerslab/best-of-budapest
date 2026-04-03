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
