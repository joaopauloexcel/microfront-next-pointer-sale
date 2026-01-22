import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { AuthProvider } from '@/domain/protocols'
import { getAccessToken as getClientAccessToken } from '@/infra/sensedia'

let navigateFn: (path: string) => void

export const setNavigate = (navigate: (path: string) => void) => {
  navigateFn = navigate
}

export const navigateTo = (path: string) => {
  if (navigateFn) {
    navigateFn(path)
  } else {
    console.warn('Navigation function is not set!')
  }
}

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authProvider: AuthProvider
  ) {}

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    const auth = this.authProvider.getAuth()

    if (process.env.NEXT_PUBLIC_USE_GATEWAY === 'true') {
      const accessToken = await getClientAccessToken()
      data.headers = Object.assign(data.headers || {}, {
        access_token: accessToken.access_token ?? ''
      })
    }

    Object.assign(data, {
      headers: Object.assign(data.headers || {}, {
        Authorization: auth ? `Bearer ${auth.idToken}` : '',
        access_token: data.headers?.access_token ?? '',
        client_id: process.env.NEXT_PUBLIC_SENSEDIA_AUTH_URL
      })
    })

    const httpResponse = await this.httpClient.request<T>(data)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        this.redirectAndLogout()
        return httpResponse
      default:
        return httpResponse
    }
  }

  private redirectAndLogout() {
    navigateTo('/login')
    setTimeout(() => {
      this.authProvider.resetAuth()
    }, 50)
  }
}
