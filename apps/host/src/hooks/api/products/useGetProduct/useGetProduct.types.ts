import { UseQueryOptions } from '@tanstack/react-query'
import { GetProductModel } from '@/domain/usecases'

export type UseGetProductOptions = Omit<UseQueryOptions<GetProductModel, unknown, GetProductModel>, 'queryKey' | 'queryFn'>
