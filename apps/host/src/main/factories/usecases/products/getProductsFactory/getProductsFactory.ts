import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClient } from '@/main/factories/decorators'
import { GetProductsUseCase } from '@/domain/usecases'
import { GetProducts } from '@/data/usecases'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'

export const makeProductsFactory = (): GetProductsUseCase => new GetProducts(makeApiUrl(uriPaths.products), makeAuthorizeHttpClient())
