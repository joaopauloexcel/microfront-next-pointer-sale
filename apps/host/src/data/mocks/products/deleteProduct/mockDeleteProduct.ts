import { randNumber } from '@ngneat/falso'

import { DeleteProductParams } from '@/domain/usecases'

export const mockDeleteProductParams = (): DeleteProductParams => ({
  id: randNumber({ min: 1, max: 10 })
})
