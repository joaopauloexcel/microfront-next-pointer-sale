import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { mockGetProductResponse } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { useGetProduct, clearCacheProduct } from './useGetProduct.hook'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { makeQueryClient } from '@/app/app.definitions'
import { MswInterceptor } from '@/mocks'

const interceptor = new MswInterceptor()

const makeSut = () => {
  const queryClient = makeQueryClient()
  const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

  return renderHook(() => useGetProduct({ id: 1 }), { wrapper })
}

describe(useGetProduct.name, () => {
  const url = `${uriPaths.product(1)}`

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the data correctly when the query is successful', async () => {
    const mockedResponse = mockGetProductResponse()
    interceptor.intercept(url, 'get', mockedResponse, HttpStatusCode.ok)
    const { result } = makeSut()

    await interceptor.wait('GET', url)
    expect(result.current.isSuccess).toBeTruthy()
    expect(result.current.data).toEqual({ data: mockedResponse })
  })

  it('should deal correctly with UnexpectedError scenario', async () => {
    interceptor.intercept(url, 'get', '', HttpStatusCode.badRequest)

    const { result } = makeSut()
    await interceptor.wait('GET', url)
    await waitFor(() => !result.current.isSuccess)
    expect(result.current.isSuccess).toBeFalsy()
  })

  it('should deal correctly with unauthorized error scenario', async () => {
    interceptor.intercept(url, 'get', '', HttpStatusCode.unauthorized)

    const { result } = makeSut()
    await interceptor.wait('GET', url)
    await waitFor(() => !result.current.isSuccess)
    expect(result.current.isSuccess).toBeFalsy()
  })

  it('clearCacheProduct should invalidate queries', async () => {
    interceptor.intercept(url, 'get', '', HttpStatusCode.ok)

    const { result } = makeSut()
    await interceptor.wait('GET', url)
    await waitFor(() => !result.current.isSuccess)

    await act(async () => {
      await clearCacheProduct()
    })

    expect(result.current.isStale).toBeFalsy()
  })
})
