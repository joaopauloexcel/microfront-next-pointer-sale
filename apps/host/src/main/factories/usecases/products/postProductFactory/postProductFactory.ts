import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClient } from '@/main/factories/decorators'
import { PostProductUseCase } from '@/domain/usecases'
import { PostProduct } from '@/data/usecases'
import { uriPaths } from '@/main/factories/usecases/uriPaths.definitions'

export const makePostProductFactory = (): PostProductUseCase => new PostProduct(makeApiUrl(uriPaths.productAdd), makeAuthorizeHttpClient())
