import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClient } from '@/main/factories/decorators'
import { DeleteProductUseCase } from '@/domain/usecases'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { DeleteProduct } from '@/data/usecases'

export const makeDeleteProductFactory = (id: number): DeleteProductUseCase =>
  new DeleteProduct(`${makeApiUrl(uriPaths.product(id))}`, makeAuthorizeHttpClient())
