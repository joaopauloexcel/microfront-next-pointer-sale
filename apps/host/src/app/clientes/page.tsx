import { requireAuth } from '@/lib/requireAuth'

export default async function DashboardPage() {
  await requireAuth()

  return (
    <div>
      <p>Clientes</p>
    </div>
  )
}
