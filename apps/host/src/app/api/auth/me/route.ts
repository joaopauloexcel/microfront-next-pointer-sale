import { NextResponse } from 'next/server'

import { verifyAccessToken } from '@/lib/jwt'

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const me = cookie.split('; ').find((c) => c.startsWith('accessToken='))
  const token = me?.split('=')[1]
  if (!token) return NextResponse.json({ user: null })

  const payload = verifyAccessToken(token)
  if (!payload) return NextResponse.json({ user: null })

  return NextResponse.json({ user: payload })
}
