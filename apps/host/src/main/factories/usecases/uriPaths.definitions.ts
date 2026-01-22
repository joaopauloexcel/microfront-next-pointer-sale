const products = '/products'

export const uriPaths = {
  products: `${products}`,
  product: (id: number) => `${products}/${id}`,
  productAdd: `${products}/add`
}
