import { Auth } from '@/domain/models'

export interface AuthProvider {
  getAuth: () => Auth | null
  resetAuth: () => void
}
