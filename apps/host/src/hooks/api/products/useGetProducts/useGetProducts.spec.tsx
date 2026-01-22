import { waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { mockGetProductsResponse } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { useGetProducts } from './useGetProducts.hook'
import { MswInterceptor, renderHook } from '@/mocks'

const interceptor = new MswInterceptor()

describe(useGetProducts.name, () => {
  const url = uriPaths.products

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the data correctly when the query is successful', async () => {
    const mockedResponse = mockGetProductsResponse()
    interceptor.intercept(url, 'get', mockedResponse, HttpStatusCode.ok)
    const { result } = renderHook(useGetProducts)

    await interceptor.wait('GET', url)
    expect(result.current.isSuccess).toBeTruthy()
    expect(result.current.data).toEqual({ data: mockedResponse })
  })

  it('should deal correctly with UnexpectedError scenario', async () => {
    interceptor.intercept(url, 'get', '', HttpStatusCode.badRequest)

    const { result } = renderHook(useGetProducts)
    await interceptor.wait('GET', url)
    await waitFor(() => !result.current.isSuccess)
    expect(result.current.isSuccess).toBeFalsy()
  })

  it('should deal correctly with unauthorized error scenario', async () => {
    interceptor.intercept(url, 'get', '', HttpStatusCode.unauthorized)

    const { result } = renderHook(useGetProducts)
    await interceptor.wait('GET', url)
    await waitFor(() => !result.current.isSuccess)
    expect(result.current.isSuccess).toBeFalsy()
  })
})
