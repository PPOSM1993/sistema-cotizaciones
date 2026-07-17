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


//const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getClientes() {
  const response = await fetch("/api/clientes", {
    cache: "no-store",
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}