import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { GetProductModel, GetProductParams } from '@/domain/usecases'
import { UseGetProductOptions } from './useGetProduct.types'
import { makeProductFactory } from '@/main/factories/usecases'
import { queryClient } from '@/app/app.definitions'
import { useDialog } from '@/hooks/core'

const getProductKey: string = 'get-product'

export const useGetProduct = (codigoProduct: GetProductParams, options?: UseGetProductOptions): UseQueryResult<GetProductModel, unknown> => {
  const getProduct = makeProductFactory(codigoProduct)
  const { addDialog } = useDialog()

  return useQuery({
    queryKey: [getProductKey, codigoProduct],
    queryFn: async () => {
      try {
        return await getProduct.get(codigoProduct)
      } catch (error) {
        addDialog({
          message: (error as Error).message,
          title: 'Erro ao listar o produto',
          type: 'error'
        })
        throw error
      }
    },
    staleTime: 60000 * 60 * 2,
    ...options
  })
}

export const clearCacheProduct = async () => {
  await queryClient.invalidateQueries({ queryKey: [getProductKey] })
}
