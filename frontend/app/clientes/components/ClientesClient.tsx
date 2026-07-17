"use client"

import { useState } from "react"

import CreateClienteModal from "./CreateClienteModal"
import ClienteTable from "./ClientesClient/ClienteTable"

export default function ClientesClient() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">

      <ClienteTable
        onCreate={() => setOpen(true)}
      />

      <CreateClienteModal
        open={open}
        onOpenChange={setOpen}
      />

    </div>
  )
}