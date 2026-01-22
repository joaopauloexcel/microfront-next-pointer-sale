type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export type HttpRequest = {
  url: string
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  responseType?: ResponseType
}
export interface HttpClient {
  request: <R = unknown>(data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export interface ErrorResponse {
  message: string
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500
}

export type HttpResponse<T = unknown> = {
  statusCode: HttpStatusCode
  body: T
  message?: string
  errors?: ErrorResponse[]
}

export type Page = {
  limit: number
  skip: number
  total: number
}
