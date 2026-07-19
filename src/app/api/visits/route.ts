import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const key = `pageviews:unique:total`
    const count = await redis.scard(key)
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
