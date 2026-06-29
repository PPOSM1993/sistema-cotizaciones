"use client"

import { useState } from "react"

import CreateClienteModal from "./CreateClienteModal"
import ToolbarClientes from "./ClientesClient/ToolbarClientes"
import ClienteTable from "./ClientesClient/ClienteTable"

export default function ClientesClient() {


  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-6">

      <ToolbarClientes
        onCreate={() => setOpen(true)}
      />

      <ClienteTable />

      <CreateClienteModal
        open={open}
        onOpenChange={setOpen}
      />

    </div>
  )
}