import { randNumber } from '@ngneat/falso'

import { DeleteProduct } from '@/data/usecases'
import { makeDeleteProductFactory } from './deleteProductFactory'

describe(makeDeleteProductFactory.name, () => {
  it('should return an instance correctly', () => {
    const result = makeDeleteProductFactory(randNumber())
    expect(result).toBeInstanceOf(DeleteProduct)
  })
})
