import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const key = `pageviews:${new Date().toISOString().slice(0, 7)}`
  const count = (await redis.get(key)) ?? 0
  return NextResponse.json({ count: Number(count) })
}
