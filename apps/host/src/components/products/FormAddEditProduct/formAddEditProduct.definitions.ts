import * as yup from 'yup'

export const productsSchema = yup.object({
  title: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatório'),
  price: yup.string().required('Preço obrigatório'),
  stock: yup.number().required('Estoque obrigatório'),
  images: yup.array().of(yup.string())
})
