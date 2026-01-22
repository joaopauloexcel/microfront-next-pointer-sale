import { ProductRequest } from '@/domain/models'

export interface PutProductUseCase {
  put: (body: ProductRequest) => Promise<void>
}
