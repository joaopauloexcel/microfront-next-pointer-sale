import { randUrl } from '@ngneat/falso'

import { HttpClientSpy, mockPostProductRequest } from '@/data/mocks'
import { PostProduct } from '@/data/usecases'
import { sharedHttpUseCaseTests } from '@/data/utils'
import { ProductRequest } from '@/domain/models'

type SutTypes = {
  sut: PostProduct
  httpClientSpy: HttpClientSpy<void>
}

const makeSut = (url: string = randUrl()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<void>()
  const sut = new PostProduct(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const httpRequestOrParams = mockPostProductRequest()

const httpResult = null

describe(PostProduct.name, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  sharedHttpUseCaseTests<PostProduct, void, ProductRequest, null>({
    makeSut,
    methodName: 'post',
    httpRequestOrParams,
    httpResult
  })
})
