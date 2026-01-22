import { ProductResponse } from './productResponse'

export interface ProductResponsePage {
  products?: Array<ProductResponse> | null
  total: number
  skip: number
  limit: number
}
