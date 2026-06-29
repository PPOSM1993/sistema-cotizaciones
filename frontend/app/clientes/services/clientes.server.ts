
import { ClienteFormData } from "../types/cliente"

export async function createCliente(data: ClienteFormData) {
  const response = await fetch("/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw result
  }

  return result
}