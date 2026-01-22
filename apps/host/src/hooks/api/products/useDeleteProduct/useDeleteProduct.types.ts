import { UseMutationOptions } from '@tanstack/react-query'

export type UseDeleteProductOptions = UseMutationOptions<void, Error, { id: number }, unknown>
