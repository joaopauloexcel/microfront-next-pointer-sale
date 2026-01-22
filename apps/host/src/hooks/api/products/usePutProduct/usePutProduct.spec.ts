import { randNumber } from '@ngneat/falso'

import { HttpStatusCode } from '@/data/protocols'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { mockPutProductRequest } from '@/data/mocks'
import { usePutProduct } from './usePutProduct.hook'
import { MswInterceptor, renderHook } from '@/mocks'

const interceptor = new MswInterceptor()

describe(usePutProduct.name, () => {
  const id = randNumber()
  const body = mockPutProductRequest()

  const url = uriPaths.product(id)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the data correctly when the query is successful', async () => {
    interceptor.intercept(url, 'put', '', HttpStatusCode.ok)

    const { result } = renderHook(usePutProduct)

    let mutationResult
    result.current.mutate(
      { id, body },
      {
        onSuccess: (data) => (mutationResult = data)
      }
    )

    await interceptor.wait('PUT', url)

    expect(result.current.isSuccess).toBe(true)
    expect(mutationResult).toEqual({ data: '' })
  })

  it('should deal correctly with UnexpectedError scenario', async () => {
    interceptor.intercept(url, 'put', '', HttpStatusCode.badRequest)
    const { result } = renderHook(usePutProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { id, body },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('PUT', url)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should deal correctly with unauthorized error scenario', async () => {
    interceptor.intercept(url, 'put', '', HttpStatusCode.unauthorized)
    const { result } = renderHook(usePutProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { id, body },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('PUT', url)
    expect(result.current.isSuccess).toBe(false)
  })
})
