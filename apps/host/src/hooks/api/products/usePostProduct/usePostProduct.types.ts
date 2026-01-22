import { UseMutationOptions } from '@tanstack/react-query'

import { ProductRequest } from '@/domain/models'

export type UsePostProductOptions = UseMutationOptions<void, Error, { body: ProductRequest }>
