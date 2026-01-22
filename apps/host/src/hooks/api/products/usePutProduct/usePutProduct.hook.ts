import { useMutation } from '@tanstack/react-query'

import { makePutProductFactory } from '@/main/factories/usecases'
import { UsePutProductOptions } from './usePutProduct.types'
import { useDialog } from '@/hooks/core'

export const usePutProduct = (options?: UsePutProductOptions) => {
  const { addDialog } = useDialog()
  return useMutation({
    mutationKey: ['put', 'put-product'],
    mutationFn: async ({ id, body }) => {
      try {
        const responderParecer = makePutProductFactory(id)

        return await responderParecer.put(body)
      } catch (error) {
        addDialog({
          message: (error as Error).message,
          title: 'Erro ao editar o produto',
          type: 'error'
        })
        throw error
      }
    },
    ...options
  })
}
