import { randNumber, randText } from '@ngneat/falso'

import { GetProductModel, GetProductParams } from '@/domain/usecases'

export const mockGetProductResponse = (): GetProductModel => ({
  id: randNumber({ min: 1, max: 10 }),
  description: randText(),
  images: [randText()],
  price: randNumber(),
  stock: randNumber(),
  title: randText()
})

export const mockGetProductParams = (): GetProductParams => ({
  id: randNumber()
})
