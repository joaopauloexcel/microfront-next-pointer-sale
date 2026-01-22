import { useMutation } from '@tanstack/react-query'

import { makePostProductFactory } from '@/main/factories/usecases'
import { ProductRequest } from '@/domain/models'
import { UsePostProductOptions } from './usePostProduct.types'
import { useDialog } from '@/hooks/core'

export const usePostProduct = (options?: UsePostProductOptions) => {
  const newProduct = makePostProductFactory()
  const { addDialog } = useDialog()
  return useMutation<void, Error, { body: ProductRequest }>({
    mutationKey: ['post', 'add-product'],
    mutationFn: async ({ body }) => {
      try {
        return await newProduct.post(body)
      } catch (error) {
        addDialog({
          message: (error as Error).message,
          title: 'Erro ao cadastrar o produto',
          type: 'error'
        })
        throw error
      }
    },
    ...options
  })
}
