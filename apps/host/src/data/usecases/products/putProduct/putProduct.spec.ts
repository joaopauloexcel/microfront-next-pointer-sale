import { randUrl } from '@ngneat/falso'

import { HttpClientSpy, mockPutProductRequest } from '@/data/mocks'
import { PutProduct } from './putProduct'
import { sharedHttpUseCaseTests } from '@/data/utils'
import { ProductRequest } from '@/domain/models'

type SutTypes = {
  sut: PutProduct
  httpClientSpy: HttpClientSpy<void>
}

const makeSut = (url: string = randUrl()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<void>()
  const sut = new PutProduct(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const httpRequestOrParams = mockPutProductRequest()

const httpResult = null

describe(PutProduct.name, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  sharedHttpUseCaseTests<PutProduct, void, ProductRequest, null>({
    makeSut,
    methodName: 'put',
    httpRequestOrParams,
    httpResult
  })
})
