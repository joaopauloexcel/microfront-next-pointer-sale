import { LayoutHost } from '@/components/ui'
import { AppProviders } from '@repo/app-shell/providers'

export default function RootLayoutHost({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>
          <LayoutHost>{children}</LayoutHost>
        </AppProviders>
      </body>
    </html>
  )
}
