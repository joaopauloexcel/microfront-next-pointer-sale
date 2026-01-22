import '@testing-library/jest-dom'
import * as path from 'path'
import { config } from 'dotenv'

import { server } from './apps/host/src/mocks'

process.env.VITE_API_URL = 'https://dummyjson.com'

config({
  path: path.resolve(__dirname, 'apps/host/.env')
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
