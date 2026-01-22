import { randNumber } from '@ngneat/falso'

import { HttpStatusCode } from '@/data/protocols'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { useDeleteProduct } from './useDeleteProduct.hook'
import { MswInterceptor, renderHook } from '@/mocks'

const interceptor = new MswInterceptor()

describe(useDeleteProduct.name, () => {
  const id = randNumber()

  const url = uriPaths.product(id)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the data correctly when the query is successful', async () => {
    interceptor.intercept(url, 'delete', '', HttpStatusCode.ok)

    const { result } = renderHook(useDeleteProduct)

    let mutationResult
    result.current.mutate(
      { id },
      {
        onSuccess: (data) => (mutationResult = data)
      }
    )

    await interceptor.wait('DELETE', url)

    expect(result.current.isSuccess).toBe(true)
    expect(mutationResult).toEqual({ data: '' })
  })

  it('should deal correctly with UnexpectedError scenario', async () => {
    interceptor.intercept(url, 'delete', '', HttpStatusCode.badRequest)
    const { result } = renderHook(useDeleteProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { id },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('DELETE', url)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should deal correctly with unauthorized error scenario', async () => {
    interceptor.intercept(url, 'delete', '', HttpStatusCode.unauthorized)
    const { result } = renderHook(useDeleteProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { id },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('DELETE', url)
    expect(result.current.isSuccess).toBe(false)
  })
})
