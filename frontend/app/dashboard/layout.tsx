import { getCurrentUser } from "@/lib/auth"
import DashboardShell from "./DashboardShell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  )
}