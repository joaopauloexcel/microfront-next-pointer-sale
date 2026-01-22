import { describe, it, expect } from 'vitest'

import { AxiosHttpClient } from '@/infra/http'
import { makeAxiosHttpClient } from './axiosHttpClientFactory'

describe('makeAxiosHttpClient', () => {
  it('should return an instance of AxiosHttpClient', () => {
    const result = makeAxiosHttpClient()
    expect(result).toBeInstanceOf(AxiosHttpClient)
  })
})
