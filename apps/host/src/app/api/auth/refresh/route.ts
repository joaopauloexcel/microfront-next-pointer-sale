import { NextResponse } from 'next/server'

import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/jwt'
import { findUserIdByRefreshToken, saveRefreshToken } from '@/lib/refreshStore'

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.split('; ').find((c) => c.startsWith('refreshToken='))
  const token = match?.split('=')[1]

  if (!token) return NextResponse.json({ error: 'No refresh token' }, { status: 401 })

  const payload = verifyRefreshToken(token)
  if (!payload || typeof payload === 'string') {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
  }

  const userId = (payload as { sub: string }).sub
  const storedUser = findUserIdByRefreshToken(token)
  if (!storedUser || storedUser !== userId) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 })
  }

  const newAccess = signAccessToken({ sub: userId })

  const newRefresh = signRefreshToken({ sub: userId })
  saveRefreshToken(userId, newRefresh)

  const res = NextResponse.json({ ok: true })

  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set({
    name: 'accessToken',
    value: newAccess,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 30
  })

  res.cookies.set({
    name: 'refreshToken',
    value: newRefresh,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 30
  })

  return res
}
