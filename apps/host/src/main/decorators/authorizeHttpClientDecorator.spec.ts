import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { AuthProvider } from '@/domain/protocols'
import * as decorator from './authorizeHttpClientDecorator'
import { AuthorizeHttpClientDecorator } from './authorizeHttpClientDecorator'

describe('AuthorizeHttpClientDecorator', () => {
  const makeHttpRequest = (): HttpRequest => ({
    url: '/test-url',
    method: 'get'
  })

  let httpClientMock: HttpClient
  let authProviderMock: AuthProvider
  let navigateToSpy: ReturnType<typeof vi.fn>
  let resetAuthSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    httpClientMock = {
      request: vi.fn()
    }

    resetAuthSpy = vi.fn()

    authProviderMock = {
      getAuth: vi.fn().mockReturnValue({
        accessToken: 'mocked_value_for_accessToken',
        idToken: 'mocked_value_for_idToken',
        email: 'mocked_value_for_email',
        name: 'mocked_value_for_name'
      }),
      resetAuth: resetAuthSpy as unknown as () => void
    }

    navigateToSpy = vi.fn()
    decorator.setNavigate(navigateToSpy as unknown as (path: string) => void)
  })

  it('must add the token to the header if it is present', async () => {
    const sut = new AuthorizeHttpClientDecorator(httpClientMock, authProviderMock)

    const request = makeHttpRequest()
    const expectedResponse = { statusCode: 200, body: {} }

    vi.mocked(httpClientMock.request).mockResolvedValue(expectedResponse)

    await sut.request(request)

    expect(httpClientMock.request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mocked_value_for_idToken'
        })
      })
    )
  })

  it('should redirect and reset authentication in case of a 401 error', async () => {
    const sut = new AuthorizeHttpClientDecorator(httpClientMock, authProviderMock)

    const request = makeHttpRequest()
    const unauthorizedResponse: HttpResponse<unknown> = {
      statusCode: HttpStatusCode.unauthorized,
      body: {}
    }

    vi.mocked(httpClientMock.request).mockResolvedValue(unauthorizedResponse)

    await sut.request(request)

    expect(navigateToSpy).toHaveBeenCalledWith('/login')

    await new Promise((r) => setTimeout(r, 60))

    expect(resetAuthSpy).toHaveBeenCalled()
  })

  it('should only return the response with status != 401', async () => {
    const sut = new AuthorizeHttpClientDecorator(httpClientMock, authProviderMock)

    const request = makeHttpRequest()
    const expectedResponse = { statusCode: HttpStatusCode.ok, body: { data: 123 } }

    vi.mocked(httpClientMock.request).mockResolvedValue(expectedResponse)

    const response = await sut.request(request)

    expect(response).toEqual(expectedResponse)
    expect(navigateToSpy).not.toHaveBeenCalled()
    expect(resetAuthSpy).not.toHaveBeenCalled()
  })
})
