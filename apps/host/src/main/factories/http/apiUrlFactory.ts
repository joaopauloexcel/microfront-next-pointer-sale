const API_URLS = {
  AUTH: process.env.NEXT_PUBLIC_API_URL,
  DEFAULT: process.env.NEXT_PUBLIC_API_URL
}

export type ApiKey = keyof typeof API_URLS

export const makeApiUrl = (path: string, apiKey: ApiKey = 'DEFAULT', dynamicRoute = false): string => {
  if (dynamicRoute) return path
  const baseUrl = API_URLS[apiKey]
  if (!baseUrl) {
    throw new Error(`API base URL for ${apiKey} is not defined`)
  }
  return `${baseUrl}${path}`
}
