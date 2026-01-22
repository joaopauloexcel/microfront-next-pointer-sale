import { ProductRequest } from '@/domain/models'

export interface PostProductUseCase {
  post: (body: ProductRequest) => Promise<void>
}
