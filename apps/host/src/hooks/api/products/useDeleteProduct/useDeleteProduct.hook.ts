import { useMutation } from '@tanstack/react-query'

import { makeDeleteProductFactory } from '@/main/factories/usecases'
import { UseDeleteProductOptions } from './useDeleteProduct.types'
import { useDialog } from '@/hooks/core'

export const useDeleteProduct = (options?: UseDeleteProductOptions) => {
  const { addDialog } = useDialog()
  return useMutation({
    mutationKey: ['delete', 'delete-product'],
    mutationFn: async ({ id }) => {
      try {
        const responderParecer = makeDeleteProductFactory(id)

        return await responderParecer.delete({ id })
      } catch (error) {
        addDialog({
          message: (error as Error).message,
          title: 'Erro ao excluir produto',
          type: 'error'
        })
        throw error
      }
    },
    ...options
  })
}
