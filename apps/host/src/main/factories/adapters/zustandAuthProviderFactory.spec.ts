import { describe, it, expect } from 'vitest'
import { ZustandAuthProviderAdapter } from '@/main/adapters'
import { makeZustandAuthProviderFactory } from './zustandAuthProviderFactory'

describe('makeZustandAuthProviderFactory', () => {
  it('should return an instance of ZustandAuthProviderAdapter', () => {
    const result = makeZustandAuthProviderFactory()
    expect(result).toBeInstanceOf(ZustandAuthProviderAdapter)
  })
})
