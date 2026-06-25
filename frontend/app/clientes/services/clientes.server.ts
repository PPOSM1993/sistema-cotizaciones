import { ClienteFormData } from "../types/cliente"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createCliente(
  token: string,
  data: ClienteFormData
) {
  const response = await fetch(
    `${API_URL}/api/clientes/clientes/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}