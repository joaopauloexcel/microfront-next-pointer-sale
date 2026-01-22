import { ErrorResponse } from '@/data/protocols'

export class UnprocessableEntityError extends Error {
  constructor(
    message?: string,
    readonly errors?: ErrorResponse[] | unknown
  ) {
    super(message ?? 'Algo de errado aconteceu. Tente novamente em breve.')
    this.name = 'UnprocessableEntityError'
  }
}
