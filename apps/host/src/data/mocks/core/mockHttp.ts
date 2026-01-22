import * as faker from '@ngneat/falso'

import { HttpRequest, HttpResponse, HttpStatusCode, HttpClient, HttpMethod } from '@/data/protocols'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.randUrl(),
  method: faker.rand<HttpMethod>(['get', 'post', 'put', 'delete']),
  body: faker.randJSON(),
  headers: Object.fromEntries(Array.from({ length: 3 }, () => [faker.randWord(), faker.randWord()])),
  params: Object.fromEntries(Array.from({ length: 2 }, () => [faker.randWord(), faker.randNumber()]))
})

export class HttpClientSpy<R> implements HttpClient {
  url?: string
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number>
  response: Partial<HttpResponse<R>> = {
    statusCode: HttpStatusCode.ok,
    body: faker.randJSON() as R,
    message: faker.randPhrase()
  }

  async request<R>(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method ?? 'get'
    this.body = data.body
    this.headers = data.headers as Record<string, string>
    this.params = data.params as Record<string, string | number>

    return this.response as HttpResponse<R>
  }
}

export const mockClientSpy = <T>(
  status: number,
  httpClientSpy?: HttpClientSpy<T>,
  httpResult?: T,
  message?: string | null,
  errors?: { message: string }[] | null
): HttpClientSpy<T> | null => {
  if (httpClientSpy) {
    httpClientSpy.response = {
      statusCode: status,
      body: status === HttpStatusCode.ok || status === HttpStatusCode.created ? httpResult : undefined,
      message: message ?? undefined,
      errors: errors ?? undefined
    }
    return httpClientSpy
  }
  return null
}
