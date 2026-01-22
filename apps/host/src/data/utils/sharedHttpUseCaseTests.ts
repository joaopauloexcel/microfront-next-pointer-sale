import { randUrl } from '@ngneat/falso'

import { HttpStatusCode } from '@/data/protocols'
import { HttpClientSpy, mockClientSpy } from '@/data/mocks'
import { UnprocessableEntityError } from '@/domain/errors'
import { DEFAULT_ERROR, MANY_ERRORS } from '@/data/utils'

interface sharedTypes<Type1, Type2, Type3, Type4> {
  makeSut: (url?: string) => { sut: Type1; httpClientSpy: HttpClientSpy<Type2> }
  methodName: string
  httpRequestOrParams?: Type3 | null
  httpResult?: Type4 | null
}

export const sharedHttpUseCaseTests = <Type1, Type2, Type3, Type4>({
  makeSut,
  methodName,
  httpRequestOrParams,
  httpResult
}: sharedTypes<Type1, Type2, Type3, Type4>) => {
  it('should call HttpClient with correct values', async () => {
    const url = randUrl()
    const { sut, httpClientSpy } = makeSut(url)
    mockClientSpy(HttpStatusCode.ok, httpClientSpy)
    console.log('methodName', methodName)
    console.log('sut', sut)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await sut[methodName]()

    expect(httpClientSpy.url).toContain(`${url}`)
    expect(httpClientSpy.method).toBe(methodName)
  })

  it('should return an content body if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.ok, httpClientSpy, httpResult as unknown)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = httpRequestOrParams ? await sut[methodName](httpRequestOrParams) : await sut[methodName]()

    if (httpResult) {
      expect(response).toEqual(httpResult)
    } else {
      expect(response).toBeNull()
    }
  })

  it('should return an content body if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.ok, httpClientSpy, httpResult as unknown)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = httpRequestOrParams ? await sut[methodName](httpRequestOrParams) : await sut[methodName]()

    if (httpResult) {
      expect(response).toEqual(httpResult)
    } else {
      expect(response).toBeNull()
    }
  })

  it('should return an content body if HttpClient returns 201', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.created, httpClientSpy, httpResult as unknown)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = await sut[methodName](httpRequestOrParams)
    expect(response).toEqual(httpResult)
  })

  it('should return an content body if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.noContent, httpClientSpy)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = await sut[methodName](httpRequestOrParams)
    expect(response).toEqual({})
  })

  it('should throw UnprocessableEntityError if HttpClient returns 400', async () => {
    const messageError = 'bad request'
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.badRequest, httpClientSpy, null, null, [{ message: messageError }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(messageError, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 401', async () => {
    const messageError = 'invalid credentials'
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.unauthorized, httpClientSpy, null, null, [{ message: messageError }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(messageError, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 404', async () => {
    const messageError = 'not found'
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.notFound, httpClientSpy, null, null, [{ message: messageError }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(messageError, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 422', async () => {
    const messageError = 'unprocessable entity'
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.unprocessableEntity, httpClientSpy, null, null, [{ message: messageError }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(messageError, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 500', async () => {
    const messageError = 'server error'
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.serverError, httpClientSpy, null, null, [{ message: messageError }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(messageError, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 400 and multiple error messages', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.badRequest, httpClientSpy, null, null, [{ message: 'erro 1' }, { message: 'erro 2' }])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(MANY_ERRORS, httpClientSpy.response.errors))
  })

  it('should throw UnprocessableEntityError if HttpClient returns 400 no error messages', async () => {
    const { sut, httpClientSpy } = makeSut()
    mockClientSpy(HttpStatusCode.badRequest, httpClientSpy, null, null, null)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(sut[methodName](httpRequestOrParams)).rejects.toThrow(new UnprocessableEntityError(DEFAULT_ERROR, httpClientSpy.response.errors))
  })
}
export default sharedHttpUseCaseTests
