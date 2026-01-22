import { randUrl } from '@ngneat/falso'

import { HttpClientSpy, mockGetProductParams, mockGetProductResponse } from '@/data/mocks'
import { GetProductModel, GetProductParams } from '@/domain/usecases'
import { sharedHttpUseCaseTests } from '@/data/utils'
import { ProductResponse } from '@/domain/models'
import { GetProduct } from './getProduct'

type SutTypes = {
  sut: GetProduct
  httpClientSpy: HttpClientSpy<GetProductModel>
}

const makeSut = (url: string = randUrl()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<GetProductModel>()
  const sut = new GetProduct(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const httpRequestOrParams = mockGetProductParams()

const httpResult = mockGetProductResponse()

describe(GetProduct.name, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  sharedHttpUseCaseTests<GetProduct, GetProductModel, GetProductParams, ProductResponse>({
    makeSut,
    methodName: 'get',
    httpRequestOrParams,
    httpResult
  })
})
