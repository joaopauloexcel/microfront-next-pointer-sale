import { describe, it, expect, vi } from 'vitest'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeZustandAuthProviderFactory } from '@/main/factories/adapters'
import { HttpClient } from '@/data/protocols/http'
import { AuthProvider } from '@/domain/protocols'
import { makeAuthorizeHttpClient } from './authorizeHttpClientFactory'

vi.mock('@/main/factories/http', () => ({
  makeAxiosHttpClient: vi.fn()
}))

vi.mock('@/main/factories/adapters', () => ({
  makeZustandAuthProviderFactory: vi.fn()
}))

describe('makeAuthorizeHttpClient', () => {
  it('must instantiate AuthorizeHttpClientDecorator with the correct dependencies', () => {
    const httpClientStub: HttpClient = { request: vi.fn() }
    const authProviderStub: AuthProvider = { getAuth: vi.fn(), resetAuth: vi.fn() }

    vi.mocked(makeAxiosHttpClient).mockReturnValue(httpClientStub)
    vi.mocked(makeZustandAuthProviderFactory).mockReturnValue(authProviderStub)

    const result = makeAuthorizeHttpClient()

    expect(result).toBeInstanceOf(AuthorizeHttpClientDecorator)
    expect(makeAxiosHttpClient).toHaveBeenCalled()
    expect(makeZustandAuthProviderFactory).toHaveBeenCalled()
  })
})
