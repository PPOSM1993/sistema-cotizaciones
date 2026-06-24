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

export async function createCliente(data: any, token: string | null) {
  const response = await fetch("http://localhost:8000/api/clientes/clientes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Error al crear cliente")
  }

  return response.json()
}