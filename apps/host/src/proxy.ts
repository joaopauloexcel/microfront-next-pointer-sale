import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (accessToken) {
    return NextResponse.next()
  }

  if (refreshToken) {
    try {
      const origin = `${req.nextUrl.protocol}//${req.nextUrl.host}`
      const refreshRes = await fetch(`${origin}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          cookie: `refreshToken=${refreshToken}`
        }
      })

      if (refreshRes.ok) {
        return NextResponse.next()
      }
    } catch {}
  }

  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/dashboard/:path*', '/produtos/:path*', '/clientes/:path*', '/ponto-venda/:path*', '/']
}
