'use client'

import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { FormAddEditProduct, ProductsFormData } from '@/components/products'
import { usePostProduct } from '@/hooks'
import { ProductRequest } from '@/domain/models'
import { Loading } from '@repo/ui/Loading'
import { useDialog } from '@/hooks/core'

export default function NewProductPage() {
  const router = useRouter()
  const { addDialog } = useDialog()
  const postProductMutation = usePostProduct()
  async function handleCreate(values: ProductsFormData) {
    if (values) {
      const productRequest: ProductRequest = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        stock: values.stock,
        images: (values.images ?? []).filter(Boolean) as string[]
      }
      postProductMutation.mutate(
        { body: productRequest },
        {
          onSuccess: () => {
            router.push('/produtos')
            addDialog({ type: 'success', message: 'Produto cadastrado com sucesso!' })
          }
        }
      )
    }
  }

  return (
    <>
      <Loading isLoading={postProductMutation.isPending} />
      <Typography variant="subtitle1">Novo Produto</Typography>
      <FormAddEditProduct onSubmit={handleCreate} />
    </>
  )
}
