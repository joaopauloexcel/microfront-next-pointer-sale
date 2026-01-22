import { renderHook as renderHookReact } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { makeQueryClient } from '@/app/app.definitions'

type HookFunction<T> = () => T

export const renderHook = <T,>(hook: HookFunction<T>) => {
  const queryClient = makeQueryClient()
  const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

  return renderHookReact(() => hook(), { wrapper })
}
