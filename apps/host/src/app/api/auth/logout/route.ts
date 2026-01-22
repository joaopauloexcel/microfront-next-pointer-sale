import { NextResponse } from 'next/server'

import { deleteRefreshToken } from '@/lib/refreshStore'
import { verifyRefreshToken } from '@/lib/jwt'

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.split('; ').find((c) => c.startsWith('refreshToken='))
  const token = match?.split('=')[1]

  if (token) {
    const p = verifyRefreshToken(token)
    if (p && typeof p !== 'string') {
      deleteRefreshToken((p as { sub: string }).sub)
    }
  }

  const res = NextResponse.json({ ok: true })

  res.cookies.set({ name: 'accessToken', value: '', path: '/', maxAge: 0 })
  res.cookies.set({ name: 'refreshToken', value: '', path: '/', maxAge: 0 })

  return res
}
