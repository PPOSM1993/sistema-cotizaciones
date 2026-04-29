"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

import { Sidebar } from "./Sidebar"

type Props = {
  open: boolean
  collapsed: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({
  open,
  onOpenChange,
  collapsed,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-64">

        <SheetHeader className="sr-only">
          <SheetTitle>Menú principal</SheetTitle>
          <SheetDescription>
            Navegación principal
          </SheetDescription>
        </SheetHeader>

        <Sidebar collapsed={collapsed} />

      </SheetContent>
    </Sheet>
  )
}