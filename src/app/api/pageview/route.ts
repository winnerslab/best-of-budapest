import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { visitorId } = await req.json()
    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    const key = `pageviews:unique:${new Date().toISOString().slice(0, 7)}`
    await redis.sadd(key, visitorId)
    await redis.expire(key, 60 * 60 * 24 * 60) // 60-day TTL
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
