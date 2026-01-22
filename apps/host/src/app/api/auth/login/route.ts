import { NextResponse } from 'next/server'

import { signAccessToken, signRefreshToken } from '@/lib/jwt'
import { saveRefreshToken } from '@/lib/refreshStore'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body
  const emailMock = process.env.NEXT_PUBLIC_USER_NAME_MOCK!
  const passwordMock = process.env.NEXT_PUBLIC_USER_PASSWORD_MOCK!

  if (email !== emailMock || password !== passwordMock) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
  }

  const user = { id: 'user-1', email: emailMock, name: 'Admin' }

  const accessToken = signAccessToken({ sub: user.id, email: user.email })
  const refreshToken = signRefreshToken({ sub: user.id })

  saveRefreshToken(user.id, refreshToken)

  const res = NextResponse.json({ ok: true })

  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 30
  })

  res.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 30
  })

  return res
}
