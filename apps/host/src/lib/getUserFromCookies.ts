'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUserFromCookies() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) return null

  try {
    const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET!)
    return data
  } catch {
    return null
  }
}
