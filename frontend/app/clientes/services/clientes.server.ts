import { Cliente } from "../types/cliente"

export async function getClientes(): Promise<Cliente[]> {
  return [
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
  ]
}