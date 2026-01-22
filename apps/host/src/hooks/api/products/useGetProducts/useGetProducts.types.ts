import { UseQueryOptions } from '@tanstack/react-query'

import { GetProductsModel } from '@/domain/usecases'

export type UseGetProductsOptions = Omit<UseQueryOptions<GetProductsModel, unknown, GetProductsModel>, 'queryKey' | 'queryFn'>
