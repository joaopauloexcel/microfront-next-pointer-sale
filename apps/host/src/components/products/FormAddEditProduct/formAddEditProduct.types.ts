import * as yup from 'yup'

import { productsSchema } from './formAddEditProduct.definitions'

export type ProductsFormData = yup.InferType<typeof productsSchema>

export type ProductFormProps = {
  defaultValues?: ProductsFormData
  onSubmit: (values: ProductsFormData) => Promise<void>
}
