import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const key = `pageviews:unique:${new Date().toISOString().slice(0, 7)}`
    const count = await redis.scard(key)
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
