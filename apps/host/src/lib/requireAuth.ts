import { redirect } from 'next/navigation'

import { getUserFromCookies } from './getUserFromCookies'

export async function requireAuth() {
  const user = await getUserFromCookies()

  if (!user) {
    redirect('/login')
  }

  return user
}
