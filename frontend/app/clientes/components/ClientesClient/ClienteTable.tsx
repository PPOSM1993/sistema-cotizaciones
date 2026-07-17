"use client"

import { useEffect, useState } from "react"

import { getClientes } from "../../services/clientes.server"
import { DataTable } from "./DataTable"
import { columns } from "./ClienteColumns"


type Props = {
  onCreate: () => void
}

export default function ClienteTable({
  onCreate,
}: Props) {

  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    async function cargarClientes() {
      try {
        const data = await getClientes()

        console.log("CLIENTES:", data)

        setClientes(
          Array.isArray(data)
            ? data
            : data.results ?? []
        )
      } catch (error) {
        console.error("Error cargando clientes:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarClientes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        Cargando clientes...
      </div>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={clientes}
      onCreate={onCreate}
    />
  )
}