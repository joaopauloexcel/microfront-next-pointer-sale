import { GetProduct } from '@/data/usecases'
import { makeProductFactory } from './getProductFactory'

describe(makeProductFactory.name, () => {
  it('should return an instance correctly', () => {
    const result = makeProductFactory({ id: 1 })
    expect(result).toBeInstanceOf(GetProduct)
  })
})
