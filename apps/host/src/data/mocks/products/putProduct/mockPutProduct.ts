import { randNumber, randText } from '@ngneat/falso'

import { ProductRequest } from '@/domain/models'

export const mockPutProductRequest = (): ProductRequest => ({
  id: randNumber({ min: 1, max: 10 }),
  description: randText(),
  images: [randText()],
  price: randNumber(),
  stock: randNumber(),
  title: randText()
})
