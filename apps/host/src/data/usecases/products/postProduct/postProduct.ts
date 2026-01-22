import { HttpClient } from '@/data/protocols'
import { PostProductUseCase } from '@/domain/usecases'
import { ProductRequest } from '@/domain/models'
import { treatmentStatusResponse } from '@/data/utils'

export class PostProduct implements PostProductUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async post(body?: ProductRequest): Promise<void> {
    const httpResponse = await this.httpClient.request<void>({
      url: this.url,
      method: 'post',
      body
    })

    return treatmentStatusResponse<void>(httpResponse) as void
  }
}
