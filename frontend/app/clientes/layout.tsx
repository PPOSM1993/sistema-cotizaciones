import { getCurrentUser } from "@/lib/auth"
import ClientesShell from "./ClientesShell"
import { Toaster } from "@/components/ui/sonner"
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <ClientesShell user={user}>
      {children}
      <Toaster />

    </ClientesShell>
  )
}