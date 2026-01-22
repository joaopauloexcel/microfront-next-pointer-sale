import { AuthProvider } from '@/domain/protocols'
import { ZustandAuthProviderAdapter } from '@/main/adapters'

export const makeZustandAuthProviderFactory = (): AuthProvider => {
  return new ZustandAuthProviderAdapter()
}
