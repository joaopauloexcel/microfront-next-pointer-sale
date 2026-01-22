import { UseMutationOptions } from '@tanstack/react-query'

import { ProductRequest } from '@/domain/models'

export type UsePutProductOptions = UseMutationOptions<void, Error, { id: number; body: ProductRequest }, unknown>
