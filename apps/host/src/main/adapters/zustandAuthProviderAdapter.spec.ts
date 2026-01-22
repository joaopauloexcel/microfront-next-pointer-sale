import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ZustandAuthProviderAdapter } from './zustandAuthProviderAdapter'
import { useAuthStore } from '@/store'

vi.mock('@/store', () => ({
  useAuthStore: {
    getState: vi.fn()
  }
}))

describe('ZustandAuthProviderAdapter', () => {
  const authMock = {
    accessToken: 'valid_token',
    idToken: 'another_valid_token',
    email: 'john.doe@example.com',
    name: 'John Doe'
  }
  const resetStateMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore.getState).mockReturnValue({
      auth: authMock,
      resetState: resetStateMock,
      setAuth: vitest.fn()
    })
  })

  it('should return the auth status from the store', () => {
    const adapter = new ZustandAuthProviderAdapter()
    const auth = adapter.getAuth()

    expect(auth).toEqual(authMock)
    expect(useAuthStore.getState).toHaveBeenCalled()
  })

  it('should call the stores resetState', () => {
    const adapter = new ZustandAuthProviderAdapter()
    adapter.resetAuth()

    expect(resetStateMock).toHaveBeenCalled()
    expect(useAuthStore.getState).toHaveBeenCalled()
  })
})
