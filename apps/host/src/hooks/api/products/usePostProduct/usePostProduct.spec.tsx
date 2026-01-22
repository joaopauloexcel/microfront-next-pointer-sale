import { HttpStatusCode } from '@/data/protocols'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { mockPostProductRequest } from '@/data/mocks'
import { usePostProduct } from './usePostProduct.hook'
import { MswInterceptor, renderHook } from '@/mocks'

const interceptor = new MswInterceptor()

describe(usePostProduct.name, () => {
  const body = mockPostProductRequest()

  const url = uriPaths.productAdd

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the data correctly when the query is successful', async () => {
    interceptor.intercept(url, 'post', '', HttpStatusCode.ok)

    const { result } = renderHook(usePostProduct)

    let mutationResult
    result.current.mutate(
      { body },
      {
        onSuccess: (data) => (mutationResult = data)
      }
    )

    await interceptor.wait('POST', url)

    expect(result.current.isSuccess).toBe(true)
    expect(mutationResult).toEqual({ data: '' })
  })

  it('should deal correctly with UnexpectedError scenario', async () => {
    interceptor.intercept(url, 'post', '', HttpStatusCode.badRequest)
    const { result } = renderHook(usePostProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { body },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('POST', url)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should deal correctly with unauthorized error scenario', async () => {
    interceptor.intercept(url, 'post', '', HttpStatusCode.unauthorized)
    const { result } = renderHook(usePostProduct)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mutationResult
    result.current.mutate(
      { body },
      {
        onError: (error: Error) => (mutationResult = error)
      }
    )

    await interceptor.wait('POST', url)
    expect(result.current.isSuccess).toBe(false)
  })
})
