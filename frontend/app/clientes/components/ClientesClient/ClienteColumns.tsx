"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import ClienteEstadoBadge from "../ClienteEstadoBadge"

export type Cliente = {
  id: number
  rut: string
  nombre: string
  estado: "cliente" | "prospecto" | "inactivo"
  vendedor?: {
    id: number
    first_name: string
    last_name: string
  } | null
}

export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "rut",
    header: "RUT",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <ClienteEstadoBadge
        estado={row.original.estado}
      />
    ),
  },

  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex gap-2">

        <Button
          variant="secondary"
          className="rounded-none bg-blue-500 hover:bg-blue-600 text-white w-10 h-10"
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          className="rounded-none bg-yellow-400 hover:bg-yellow-500 text-white w-10 h-10"
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          className="rounded-none bg-red-600 hover:bg-red-700 text-white w-10 h-10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>
    ),
  },
]