import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClient } from '@/main/factories/decorators'
import { PutProductUseCase } from '@/domain/usecases'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'
import { PutProduct } from '@/data/usecases'

export const makePutProductFactory = (id: number): PutProductUseCase =>
  new PutProduct(`${makeApiUrl(uriPaths.product(id))}`, makeAuthorizeHttpClient())
