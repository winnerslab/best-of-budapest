import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
    const raw = await redis.get(key) ?? '0'
    return NextResponse.json({ count: Number(raw) })
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
