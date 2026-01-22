import { randNumber, randText } from '@ngneat/falso'

import { GetProductsModel, GetProductsParams } from '@/domain/usecases'

export const mockGetProductsResponse = (): GetProductsModel => ({
  products: [
    {
      id: randNumber({ min: 1, max: 10 }),
      description: randText(),
      images: [randText()],
      price: randNumber(),
      stock: randNumber(),
      title: randText()
    }
  ],
  limit: randNumber({ min: 1, max: 10 }),
  skip: randNumber({ min: 1, max: 10 }),
  total: randNumber({ min: 1, max: 10 })
})

export const mockGetProductsParams = (): GetProductsParams => ({
  limit: randNumber(),
  skip: randNumber()
})
