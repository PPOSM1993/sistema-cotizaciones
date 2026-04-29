import { getCurrentUser } from "@/lib/auth"
import ClientesShell from "./ClientesShell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <ClientesShell user={user}>
      {children}
    </ClientesShell>
  )
}