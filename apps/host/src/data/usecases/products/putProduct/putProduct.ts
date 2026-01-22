import { HttpClient } from '@/data/protocols'
import { ProductRequest } from '@/domain/models'
import { treatmentStatusResponse } from '@/data/utils'
import { PutProductUseCase } from '@/domain/usecases'

export class PutProduct implements PutProductUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async put(body: ProductRequest): Promise<void> {
    const httpResponse = await this.httpClient.request<void>({
      url: this.url,
      method: 'put',
      body
    })

    return treatmentStatusResponse<void>(httpResponse) as void
  }
}
