import { ProductResponse } from '@/domain/models'

export interface GetProductUseCase {
  get: (params: GetProductParams) => Promise<GetProductModel>
}

export type GetProductModel = ProductResponse

export type GetProductParams = {
  id: number
}
