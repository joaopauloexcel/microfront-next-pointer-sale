import { HttpClient } from '@/data/protocols'
import { GetProductUseCase, GetProductModel, GetProductParams } from '@/domain/usecases'
import { treatmentStatusResponse } from '@/data/utils'

export class GetProduct implements GetProductUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get(params?: GetProductParams): Promise<GetProductModel> {
    const httpResponse = await this.httpClient.request<GetProductModel>({
      url: this.url,
      method: 'get',
      params
    })

    return treatmentStatusResponse<GetProductModel>(httpResponse) as GetProductModel
  }
}
