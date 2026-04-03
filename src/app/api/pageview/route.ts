import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
    await redis.incr(key)
    await redis.expire(key, 60 * 60 * 24 * 60) // 60-day TTL
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
