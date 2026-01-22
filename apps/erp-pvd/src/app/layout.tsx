import { AppProviders } from '@repo/app-shell/providers'

export default function PvdLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
