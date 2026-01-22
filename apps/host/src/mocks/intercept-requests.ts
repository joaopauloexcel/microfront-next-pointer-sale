import { expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { waitFor, act } from '@testing-library/react'

import { HttpStatusCode } from '@/data/protocols/http'
import { server } from './mock-nodejs'

export class MswInterceptor {
  private readonly apiUrl: string

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.VITE_API_URL || ''
  }

  /**
   * Configura uma interceptação de requisição HTTP.
   * @param path Caminho relativo da API.
   * @param method Método HTTP a ser interceptado.
   * @param mockedResponse Resposta simulada para a requisição.
   * @param status Código de status HTTP.
   */
  intercept<T = unknown>(
    path: string,
    method: 'get' | 'all' | 'post' | 'put' | 'patch' | 'delete' = 'get',
    mockedResponse: T = { message: '', data: '' } as T,
    status: number = HttpStatusCode.ok
  ): void {
    const url = `${this.apiUrl}${path}`
    server.use(
      http[method](url, () => {
        if (status === HttpStatusCode.ok || status === HttpStatusCode.created) {
          return HttpResponse.json({ data: mockedResponse })
        }
        return new HttpResponse(null, { status })
      }),
      http.options(url, () => {
        return new HttpResponse(null, { status: 204 })
      })
    )
  }

  /**
   * Aguarda uma requisição específica ser interceptada e resolvida.
   * @param method Método HTTP.
   * @param path Caminho relativo da requisição.
   */
  async wait(method: string, path: string): Promise<void> {
    let intercepted = false

    const handler = ({ request }: { request: Request }) => {
      if (request.method.toUpperCase() === 'OPTIONS') return

      const matchesMethod = request.method.toUpperCase() === method.toUpperCase()
      const matchesPath = request.url.includes(path)

      if (matchesMethod && matchesPath) {
        intercepted = true
        server.events.removeListener('response:mocked', handler)
      }
    }

    server.events.on('response:mocked', handler)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
    })

    await waitFor(() => {
      expect(intercepted).toBeTruthy()
    })
  }
}
