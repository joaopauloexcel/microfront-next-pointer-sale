'use client'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'

import { Header } from '@repo/ui/Header'
import { Menu } from '@repo/ui/Menu'

export function LayoutHost({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showHeader = pathname !== '/login' && pathname !== '/signup'

  return (
    <Box display="flex" height="100vh" bgcolor="background.default" overflow="hidden">
      {showHeader && (
        <Box>
          <Menu />
        </Box>
      )}

      <Box flex={1} display="flex" flexDirection="column" overflow="hidden" flexShrink={0}>
        {showHeader && <Header />}

        <Box component="main" flex={1} p={2} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
