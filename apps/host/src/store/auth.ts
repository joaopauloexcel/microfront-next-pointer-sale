import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Auth } from '@/domain/models'

interface AuthState {
  auth: Auth | null
  setAuth: (auth?: Auth) => void
  resetState: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth?: Auth) => set(() => ({ auth })),
      resetState: () => {
        set({ auth: null })
      }
    }),
    {
      name: 'auth'
    }
  )
)
