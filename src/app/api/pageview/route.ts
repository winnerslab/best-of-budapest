import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { visitorId } = await req.json()
    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    const key = `pageviews:unique:total`
    await redis.sadd(key, visitorId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
