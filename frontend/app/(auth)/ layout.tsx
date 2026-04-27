import { Toaster } from "@/components/ui/sonner"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      {children}
       <Toaster />
    </section>
  )
}