"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/Shared/Navbar"
import { Sidebar } from "@/components/Shared/Sidebar"
import { MobileSidebar } from "@/components/Shared/MobileSidebar"

export default function ClientesShell({
  children,
  user,
}: {
  children: React.ReactNode
  user: any
}) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved) setCollapsed(saved === "true")
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed))
  }, [collapsed])

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setOpen(true)
    } else {
      setCollapsed(prev => !prev)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* Desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile */}
      <MobileSidebar
        open={open}
        onOpenChange={setOpen}
        collapsed={collapsed}
      />

      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={handleMenuClick} />

        <main className="flex-1 p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  )
}