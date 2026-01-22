import { HttpClient } from '@/data/protocols'
import { treatmentStatusResponse } from '@/data/utils'
import { GetProductsModel, GetProductsParams, GetProductsUseCase } from '@/domain/usecases'

export class GetProducts implements GetProductsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get(params?: GetProductsParams): Promise<GetProductsModel> {
    const httpResponse = await this.httpClient.request<GetProductsModel>({
      url: this.url,
      method: 'get',
      params
    })

    return treatmentStatusResponse<GetProductsModel>(httpResponse) as GetProductsModel
  }
}
