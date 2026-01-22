import { HttpClient } from '@/data/protocols'
import { treatmentStatusResponse } from '@/data/utils'
import { DeleteProductParams, DeleteProductUseCase } from '@/domain/usecases'

export class DeleteProduct implements DeleteProductUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete(params: DeleteProductParams): Promise<void> {
    const httpResponse = await this.httpClient.request<void>({
      url: this.url,
      method: 'delete',
      params
    })

    return treatmentStatusResponse<void>(httpResponse) as void
  }
}
