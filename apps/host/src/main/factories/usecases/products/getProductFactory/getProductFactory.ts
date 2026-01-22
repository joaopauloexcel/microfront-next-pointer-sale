import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClient } from '@/main/factories/decorators'
import { GetProductUseCase } from '@/domain/usecases'
import { GetProduct } from '@/data/usecases'
import { GetProductParams } from '@/domain/usecases'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'

export const makeProductFactory = (params: GetProductParams): GetProductUseCase =>
  new GetProduct(`${makeApiUrl(uriPaths.product(params.id))}`, makeAuthorizeHttpClient())
