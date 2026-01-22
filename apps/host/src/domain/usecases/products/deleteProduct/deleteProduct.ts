export interface DeleteProductUseCase {
  delete: (params: DeleteProductParams) => Promise<void>
}

export type DeleteProductParams = {
  id: number
}
