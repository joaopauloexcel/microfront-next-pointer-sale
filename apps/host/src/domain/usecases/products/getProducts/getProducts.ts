import { ProductResponsePage } from '@/domain/models'

export interface GetProductsUseCase {
  get: (params?: GetProductsParams) => Promise<GetProductsModel>
}

export type GetProductsModel = ProductResponsePage

export type GetProductsParams = {
  skip?: number
  limit?: number
}
