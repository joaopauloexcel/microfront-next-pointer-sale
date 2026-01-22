import { randUrl } from '@ngneat/falso'

import { HttpClientSpy, mockGetProductsParams, mockGetProductsResponse } from '@/data/mocks'
import { GetProductsModel, GetProductsParams } from '@/domain/usecases'
import { sharedHttpUseCaseTests } from '@/data/utils'
import { GetProducts } from './getProducts'

type SutTypes = {
  sut: GetProducts
  httpClientSpy: HttpClientSpy<GetProductsModel>
}

const makeSut = (url: string = randUrl()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<GetProductsModel>()
  const sut = new GetProducts(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const httpRequestOrParams = mockGetProductsParams()

const httpResult = mockGetProductsResponse()

describe(GetProducts.name, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  sharedHttpUseCaseTests<GetProducts, GetProductsModel, GetProductsParams, GetProductsModel>({
    makeSut,
    methodName: 'get',
    httpRequestOrParams,
    httpResult
  })
})
