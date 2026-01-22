import { AuthProvider } from '@/domain/protocols'
import { useAuthStore } from '@/store'

export class ZustandAuthProviderAdapter implements AuthProvider {
  getAuth() {
    return useAuthStore.getState().auth
  }
  resetAuth() {
    return useAuthStore.getState().resetState()
  }
}
