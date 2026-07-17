"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import CreateClienteForm from "./CreateClienteForm"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateClienteModal({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="!max-w-7xl h-[90vh] overflow-y-auto rounded-none p-8 md:max-w-5xl"
      >

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Nuevo Cliente
          </DialogTitle>
        </DialogHeader>
        <CreateClienteForm
          onSuccess={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  )
}