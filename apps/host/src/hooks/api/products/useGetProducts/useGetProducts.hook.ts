import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { makeProductsFactory } from '@/main/factories/usecases'
import { GetProductsModel, GetProductsParams } from '@/domain/usecases'
import { UseGetProductsOptions } from './useGetProducts.types'
import { queryClient } from '@/app/app.definitions'
import { useDialog } from '@/hooks/core'

const getProductsKey: string = 'get-products'

export const useGetProducts = (params?: GetProductsParams, options?: UseGetProductsOptions): UseQueryResult<GetProductsModel, unknown> => {
  const getProducts = makeProductsFactory()
  const { addDialog } = useDialog()

  return useQuery({
    queryKey: [getProductsKey, params],
    queryFn: async () => {
      try {
        return await getProducts.get(params)
      } catch (error) {
        addDialog({
          message: (error as Error).message,
          title: 'Erro ao listar os produtos',
          type: 'error'
        })
        throw error
      }
    },
    ...options
  })
}

export const clearCacheProducts = async () => {
  await queryClient.invalidateQueries({ queryKey: [getProductsKey] })
}
