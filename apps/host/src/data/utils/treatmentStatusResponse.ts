import { HttpStatusCode, HttpResponse, ErrorResponse } from '@/data/protocols'
import { UnexpectedError, UnprocessableEntityError } from '@/domain/errors'

export const MANY_ERRORS = 'Várias validações falharam. Verifique a lista de erros para mais detalhes.'
export const DEFAULT_ERROR = 'Algo de errado aconteceu. Tente novamente em breve.'

const errorMessage = (httpResponse: HttpResponse<unknown>) => {
  const errors = httpResponse.errors as ErrorResponse[] | undefined
  if (Array.isArray(errors) && errors.length === 1 && errors[0].message) {
    return errors[0].message
  }

  if (Array.isArray(errors) && errors.length > 1) {
    return MANY_ERRORS
  }

  const body = httpResponse.body as { message?: string } | undefined
  if (body && typeof body === 'object' && typeof body?.message === 'string') {
    return body.message
  }

  if (typeof httpResponse.message === 'string') return httpResponse.message

  return DEFAULT_ERROR
}

export const treatmentStatusResponse = <T>(httpResponse: HttpResponse<T>): T => {
  const { statusCode } = httpResponse

  if (statusCode === HttpStatusCode.ok || statusCode === HttpStatusCode.created) {
    return httpResponse.body as T
  }

  if (statusCode === HttpStatusCode.noContent) {
    return {} as T
  }

  if (
    statusCode === HttpStatusCode.badRequest ||
    statusCode === HttpStatusCode.unauthorized ||
    statusCode === HttpStatusCode.forbidden ||
    statusCode === HttpStatusCode.notFound ||
    statusCode === HttpStatusCode.unprocessableEntity ||
    statusCode === HttpStatusCode.serverError
  ) {
    throw new UnprocessableEntityError(errorMessage(httpResponse), httpResponse.errors)
  }

  throw new UnexpectedError()
}
