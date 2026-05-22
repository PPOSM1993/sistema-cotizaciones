"use client";

import ClienteEstadoBadge from "../ClienteEstadoBadge";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const clientes = [
  {
    id: 1,
    rut: "11111111-1",
    nombre: "Forestal Sur",
    estado: "cliente",
    vendedor: "Pedro",
  },
  {
    id: 2,
    rut: "22222222-2",
    nombre: "Agrícola Temuco",
    estado: "prospecto",
    vendedor: "Juan",
  },
  {
    id: 3,
    rut: "33333333-3",
    nombre: "Constructora Andes",
    estado: "inactivo",
    vendedor: "María",
  },
];

export default function ClienteTable() {
  return (
    <div className="overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        {/* HEADER */}
        <thead>
          <tr className="bg-slate-900 text-white uppercase text-md">
            <th className="p-4 text-left font-semibold">
              RUT
            </th>

            <th className="p-4 text-left font-semibold">
              Nombre
            </th>

            <th className="p-4 text-left font-semibold">
              Estado
            </th>

            <th className="p-4 text-left font-semibold">
              Vendedor
            </th>

            <th className="p-4 text-center font-semibold">
              Acciones
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {clientes.map((cliente, index) => (
            <tr
              key={cliente.id}
              className={`
                border-b
                transition-colors
                hover:bg-blue-50
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              `}
            >
              <td className="p-4 font-medium">
                {cliente.rut}
              </td>

              <td className="p-4">
                {cliente.nombre}
              </td>

              <td className="p-4">
                <ClienteEstadoBadge
                  estado={cliente.estado}
                />
              </td>

              <td className="p-4">
                {cliente.vendedor}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">

                  <Button
                    variant="secondary"
                    className="rounded-none bg-blue-500 text-white hover:bg-blue-600 w-10 h-10 cursor-pointer"
                  >
                    <Eye className="h-4 w-4 text-white" />

                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-none bg-yellow-400 text-white hover:bg-yellow-600 w-10 h-10 cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />

                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-none bg-red-600 text-white hover:bg-red-700 w-10 h-10 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />

                  </Button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}