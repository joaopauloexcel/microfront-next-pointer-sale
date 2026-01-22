import { isServer, QueryClient } from '@tanstack/react-query'

export const makeQueryClient = (staleTime = 60 * 1000) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export const queryClient = makeQueryClient()
