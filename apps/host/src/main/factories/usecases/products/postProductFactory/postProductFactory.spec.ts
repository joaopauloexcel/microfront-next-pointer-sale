import { PostProduct } from '@/data/usecases'
import { makePostProductFactory } from './postProductFactory'

describe(makePostProductFactory.name, () => {
  it('should return an instance correctly', () => {
    const result = makePostProductFactory()
    expect(result).toBeInstanceOf(PostProduct)
  })
})
