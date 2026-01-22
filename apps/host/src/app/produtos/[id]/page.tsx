'use client'

import { useParams, useRouter } from 'next/navigation'
import { Typography } from '@mui/material'

import { FormAddEditProduct, ProductsFormData } from '@/components/products'
import { useGetProduct } from '@/hooks/api/products'
import { ProductRequest, ProductResponse } from '@/domain/models'
import { usePutProduct } from '@/hooks/api/products'
import { Loading } from '@repo/ui/Loading'
import { useDialog } from '@/hooks/core'

export default function EditClientPage() {
  const { id } = useParams()
  const { addDialog } = useDialog()
  const router = useRouter()
  const putProductMutation = usePutProduct()
  const { data, isFetching } = useGetProduct({ id: Number(id) }, { enabled: !!id })

  async function handleUpdate(values: ProductsFormData) {
    if (id && values) {
      const productRequest: ProductRequest = {
        id: Number(id),
        title: values.title,
        description: values.description,
        price: Number(values.price),
        stock: values.stock,
        images: (values.images ?? []).filter(Boolean) as string[]
      }
      putProductMutation.mutate(
        { body: productRequest, id: Number(id) },
        {
          onSuccess: () => {
            router.push('/produtos')
            addDialog({ type: 'success', message: 'Produto alterado com sucesso!' })
          }
        }
      )
    }
  }

  if (!data) return null

  const defaultValues: ProductsFormData & { id: number } = {
    images: (data as ProductResponse).images,
    title: (data as ProductResponse).title,
    description: (data as ProductResponse).description,
    price: String((data as ProductResponse).price),
    stock: (data as ProductResponse).stock,
    id: Number(id)
  }

  return (
    <>
      <Loading isLoading={isFetching || putProductMutation.isPending} />
      <Typography variant="subtitle1">Editar Produto</Typography>
      <FormAddEditProduct defaultValues={defaultValues} onSubmit={handleUpdate} />
    </>
  )
}
