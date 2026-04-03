import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST() {
  const key = `pageviews:${new Date().toISOString().slice(0, 7)}` // e.g. "pageviews:2026-04"
  await redis.incr(key)
  return NextResponse.json({ ok: true })
}
