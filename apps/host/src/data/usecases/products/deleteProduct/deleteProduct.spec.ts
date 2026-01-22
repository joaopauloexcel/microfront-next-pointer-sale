import { randUrl } from '@ngneat/falso'

import { HttpClientSpy, mockDeleteProductParams } from '@/data/mocks'
import { DeleteProduct } from './deleteProduct'
import { sharedHttpUseCaseTests } from '@/data/utils'
import { DeleteProductParams } from '@/domain/usecases'

type SutTypes = {
  sut: DeleteProduct
  httpClientSpy: HttpClientSpy<void>
}

const makeSut = (url: string = randUrl()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<void>()
  const sut = new DeleteProduct(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const httpRequestOrParams = mockDeleteProductParams()

const httpResult = null

describe(DeleteProduct.name, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  sharedHttpUseCaseTests<DeleteProduct, void, DeleteProductParams, null>({
    makeSut,
    methodName: 'delete',
    httpRequestOrParams,
    httpResult
  })
})
